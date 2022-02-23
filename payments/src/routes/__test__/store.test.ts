import supertest from 'supertest';
import {app} from '../../app';
import {Help} from '../../test/helpers';
import mongoose from 'mongoose';
import {Order} from '../../models/order';
import {Status} from '@nabz.tickets/common';

const request = supertest(app);

it('should return a 404 if order does not exist.', async function () {
    await request
        .post('/api/payments')
        .set('Cookie', Help.signIn())
        .send({
            token: '12123saa',
            order_id: new mongoose.Types.ObjectId().toHexString()
        })
        .expect(404);
});

it('should return a 401 if order does not belong to current user.', async function () {
    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        user_id: new mongoose.Types.ObjectId().toHexString(),
        price: 20,
        status: Status.ORDER_CREATED,
        version: 0,
    });
    await order.save();

    await request
        .post('/api/payments')
        .set('Cookie', Help.signIn())
        .send({
            token: '12123saa',
            order_id: order.id
        })
        .expect(401);
});

it('should return a 400 when purchasing a cancelled order.', async function () {
    const user_id = new mongoose.Types.ObjectId().toHexString();

    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        user_id,
        price: 20,
        status: Status.ORDER_CANCELLED,
        version: 0,
    });
    await order.save();

    await request
        .post('/api/payments')
        .set('Cookie', Help.signIn(user_id))
        .send({
            token: 'd12123saa',
            order_id: order.id
        })
        .expect(400);
});
