import {app} from "../../app";
import supertest from 'supertest';
import {Ticket} from '../../models/ticket';
import {Help} from '../../test/helpers';

const request = supertest(app);

it('should fetch the order.', async function () {
    const ticket = Ticket.build({
        title: 'Concert',
        price: 20
    });
    await ticket.save();

    const user = Help.signIn();

    const {body: order} = await request
        .post('/api/orders')
        .set('Cookie', user)
        .send({ticket_id: ticket.id})
        .expect(201);

    const {body: fetchedOrder} = await request
        .get(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(200);

    expect(fetchedOrder.id).toEqual(order.id);
});

it('should return an error if order does not belong to user.', async function () {
    const ticket = Ticket.build({
        title: 'Concert',
        price: 20
    });
    await ticket.save();

    const user = Help.signIn();

    const {body: order} = await request
        .post('/api/orders')
        .set('Cookie', user)
        .send({ticket_id: ticket.id})
        .expect(201);

    await request
        .get(`/api/orders/${order.id}`)
        .set('Cookie', Help.signIn())
        .send()
        .expect(401);
});