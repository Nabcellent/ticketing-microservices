import {OrderCreatedListener} from '../order-created.listener';
import {natsWrapper} from '../../../nats-wrapper';
import {Ticket} from '../../../models/ticket';
import {OrderCreatedEvent, Status} from '@nabz.tickets/common';
import mongoose from 'mongoose';
import {Message} from 'node-nats-streaming';

const setup = async () => {
    //  Create an instance of the listener
    const listener = new OrderCreatedListener(natsWrapper.client);

    //  Create and save a ticket
    const ticket = await Ticket.create({
        user_id: 'sasad',
        title: 'Concert',
        price: 20,
    });

    //  Create fake data and message object
    const data: OrderCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        user_id: 'sadda',
        status: Status.ORDER_CREATED,
        expires_at: 'sasda',
        version: 0,
        ticket: {
            id: ticket.id,
            price: ticket.price
        }
    };

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return {listener, ticket, data, msg};
};