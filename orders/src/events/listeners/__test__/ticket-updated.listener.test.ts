import {TicketUpdatedListener} from '../ticket-updated.listener';
import {natsWrapper} from '../../../nats-wrapper';
import {TicketUpdatedEvent} from '@nabz.tickets/common';
import mongoose from 'mongoose';
import {Message} from 'node-nats-streaming';
import {Ticket} from '../../../models/ticket';

const setup = async () => {
    //  Create instance of listener
    const listener = new TicketUpdatedListener(natsWrapper.client);

    //  Create and save a ticket
    const ticket = await Ticket.create({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'Concert',
        price: 20
    });

    //  Create fake data event
    const data: TicketUpdatedEvent['data'] = {
        id: ticket.id,
        title: 'New Concert',
        price: 70,
        user_id: new mongoose.Types.ObjectId().toHexString(),
        version: ticket.version + 1
    };

    //  Create fake message object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return {listener, ticket, data, msg};
};

it('should find, update and save a ticket.', async function () {
    const {listener, ticket, data, msg} = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.title).toEqual(data.title);
    expect(updatedTicket!.price).toEqual(data.price);
    expect(updatedTicket!.version).toEqual(data.version);
});

it('should ack() the message.', async function () {
    const {listener, data, msg} = await setup();

    //  Call the on message func with the data obj + message obj
    await listener.onMessage(data, msg);

    //  Write assertions to make sure ack() is called
    expect(msg.ack).toHaveBeenCalled();
});

it('should not call ack() if version number is skipped.', async function () {
    const {msg, data, listener} = await setup();

    data.version = 10;

    try {
        await listener.onMessage(data, msg);
    } catch (err) {}

    expect(msg.ack).not.toHaveBeenCalled()
}); 