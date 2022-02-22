import {natsWrapper} from '../../../nats-wrapper';
import {Ticket} from '../../../models/ticket';
import {OrderCancelledEvent} from '@nabz.tickets/common';
import mongoose from 'mongoose';
import {Message} from 'node-nats-streaming';
import {OrderCancelledListener} from '../order-cancelled.listener';

const setup = async () => {
    const listener = new OrderCancelledListener(natsWrapper.client);

    const order_id = new mongoose.Types.ObjectId().toHexString();
    const ticket = await Ticket.create({
        user_id: 'sasad',
        title: 'Concert',
        price: 20,
    });
    ticket.set({order_id});
    await ticket.save();

    const data: OrderCancelledEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        ticket: {
            id: ticket.id,
        }
    };

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return {listener, ticket, data, msg, order_id};
};

it('should update the ticket, publish a ticket:updated event & ack() the message.', async function () {
    const {listener, ticket, data, msg} = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.order_id).not.toBeDefined();
    expect(msg.ack).toHaveBeenCalled();
    expect(natsWrapper.client.publish).toHaveBeenCalled();
});