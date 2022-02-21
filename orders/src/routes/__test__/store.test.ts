import {app} from "../../app";
import {Help} from "../../test/helpers";
import {Ticket} from "../../models/ticket";
import supertest from 'supertest';
import mongoose from 'mongoose';
import {Order} from '../../models/order';
import {Status} from '@nabz.tickets/common';

const request = supertest(app);

it('should return an error if the ticket does not exist.', async function () {
    const ticket_id = new mongoose.Types.ObjectId();

    await request
        .post('/api/orders')
        .set('Cookie', Help.signIn())
        .send({ticket_id})
        .expect(404);
});

it('should return an error if the ticket is already reserved.', async function () {
    const ticket = Ticket.build({
        title: 'Concert',
        price: 20
    });
    await ticket.save();

    const order = Order.build({
        ticket,
        user_id: 'sad211',
        status: Status.ORDER_CREATED,
        expires_at: new Date()
    });
    await order.save();

    await request
        .post('/api/orders')
        .set('Cookie', Help.signIn())
        .send({ticket_id: ticket.id})
        .expect(400);
});

it('should reserve a ticket.', async function () {
    const ticket = Ticket.build({
        title: 'Concert',
        price: 20
    });
    await ticket.save();

    await request
        .post('/api/orders')
        .set('Cookie', Help.signIn())
        .send({ticket_id: ticket.id})
        .expect(201);
});

it.todo('emits an order created event')