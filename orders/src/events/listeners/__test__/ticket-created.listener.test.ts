import {TicketCreatedListener} from '../ticket-created.listener';
import {natsWrapper} from '../../../nats-wrapper';
import {TicketCreatedEvent} from '@nabz.tickets/common';
import mongoose from 'mongoose';
import {Message} from 'node-nats-streaming';
import {Ticket} from '../../../models/ticket';

const setup = async () => {
    //  Create instance of listener
    const listener = new TicketCreatedListener(natsWrapper.client);

    //  Create fake data event
    const data: TicketCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'Concert',
        price: 10,
        user_id: new mongoose.Types.ObjectId().toHexString(),
        version: 0
    };

    //  Create fake message object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return {listener, data, msg};
};

it('should create and save a ticket.', async function () {
    const {listener, data, msg} = await setup();

    //  Call the on message func with the data obj + message obj
    await listener.onMessage(data, msg)

    //  Write assertions to make sure ticket was created
    const ticket = await Ticket.findById(data.id)

    expect(ticket).toBeDefined()
    expect(ticket!.title).toEqual(data.title)
    expect(ticket!.price).toEqual(data.price)
});

it('should ack() the message.', async function () {
    const {listener, data, msg} = await setup();

    //  Call the on message func with the data obj + message obj
    await listener.onMessage(data, msg)

    //  Write assertions to make sure ack() is called
}); 