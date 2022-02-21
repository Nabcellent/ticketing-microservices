import supertest from "supertest";
import {app} from "../../app";
import {Help} from "../../test/helpers";
import {Ticket} from '../../models/ticket';

const request = supertest(app);

const createTicket = async () => {
    const ticket = Ticket.build({title: 'Concert', price: 20});

    return await ticket.save();
};

it('should fetch a list of orders for a particular user.', async function () {
    const ticketOne = await createTicket();
    const ticketTwo = await createTicket();
    const ticketThree = await createTicket();

    const userOne = Help.signIn();
    const userTwo = Help.signIn();

    await request
        .post('/api/orders')
        .set('Cookie', userOne)
        .send({ticket_id: ticketOne.id})
        .expect(201);

    const {body: orderOne} = await request
        .post('/api/orders')
        .set('Cookie', userTwo)
        .send({ticket_id: ticketTwo.id})
        .expect(201);
    const {body: orderTwo} = await request
        .post('/api/orders')
        .set('Cookie', userTwo)
        .send({ticket_id: ticketThree.id})
        .expect(201);

    const response = await request
        .get('/api/orders')
        .set('Cookie', userTwo)
        .expect(200);

    expect(response.body.length).toEqual(2);
    expect(response.body[0].id).toEqual(orderOne.id)
    expect(response.body[1].id).toEqual(orderTwo.id)
    expect(response.body[0].ticket.id).toEqual(ticketTwo.id)
    expect(response.body[1].ticket.id).toEqual(ticketThree.id)
});