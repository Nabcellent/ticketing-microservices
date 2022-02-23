import {natsWrapper} from '../../../nats-wrapper';
import {ExpirationCompleteEvent, Status} from '@nabz.tickets/common';
import mongoose from 'mongoose';
import {Message} from 'node-nats-streaming';
import {ExpirationCompleteListener} from '../expiration-complete.listener';
import {Ticket} from '../../../models/ticket';
import {Order} from '../../../models/order';

const setup = async () => {
    const listener = new ExpirationCompleteListener(natsWrapper.client);

    const ticket = await Ticket.create({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'Concert',
        price: 20
    });
    const order = await Order.create({
        user_id: 'sadaw',
        status: Status.ORDER_CREATED,
        expires_at: new Date(),
        ticket
    });

    const data: ExpirationCompleteEvent['data'] = {
        order_id: order.id
    };

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return {listener, ticket, order, data, msg};
};

