import request from "supertest";
import {app} from "../../app";
import {Help} from "../../test/helpers";

it('should return a 404 if a ticket is not found', async function () {
    await request(app)
        .get('/api/tickets/sads')
        .send().expect(404)
});

it('should return the ticket if it exists', async function () {
    const title = 'concert',
        price = 20;

    let response = await request(app)
        .post('/api/tickets')
        .set('Cookie', Help.signIn())
        .send({title, price})
        .expect(201)

    response = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .expect(200)

    expect(response.body.title).toEqual(title)
    expect(response.body.price).toEqual(price)
});