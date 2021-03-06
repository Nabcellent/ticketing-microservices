import {Ticket} from '../../models/ticket';
import supertest from 'supertest';
import {app} from '../../app';
import {Help} from '../../test/helpers';
import {Order} from '../../models/order';
import {Status} from '@nabz.tickets/common';
import {natsWrapper} from '../../nats-wrapper';
import mongoose from 'mongoose';

const request = supertest(app);

it('should mark an order as cancelled.', async function () {
    const ticket = await Ticket.create({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'Concert',
        price: 20
    });

    const user = Help.signIn();

    const {body: order} = await request
        .post('/api/orders')
        .set('Cookie', user)
        .send({ticket_id: ticket.id})
        .expect(201);

    await request
        .delete(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(204);

    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder!.status).toEqual(Status.ORDER_CANCELLED);
});

it('should emit an order cancelled event.', async function () {
    const ticket = await Ticket.create({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'Concert',
        price: 20
    });

    const user = Help.signIn();

    const {body: order} = await request
        .post('/api/orders')
        .set('Cookie', user)
        .send({ticket_id: ticket.id})
        .expect(201);

    await request
        .delete(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(204);

    expect(natsWrapper.client.publish).toHaveBeenCalled()
});