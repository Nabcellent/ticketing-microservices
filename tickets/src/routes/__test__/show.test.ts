import {app} from "../../app";
import {Help} from "../../test/helpers";
import mongoose from "mongoose";
import supertest from 'supertest';

const request = supertest(app);

it('should return a 404 if a ticket is not found', async function () {
    const id = new mongoose.Types.ObjectId().toHexString()

    await request
        .get(`/api/tickets/${id}`)
        .send().expect(404)
});

it('should return the ticket if it exists', async function () {
    const title = 'concert',
        price = 20;

    let response = await request
        .post('/api/tickets')
        .set('Cookie', Help.signIn())
        .send({title, price})
        .expect(201)

    response = await request
        .get(`/api/tickets/${response.body.id}`)
        .set('Cookie', Help.signIn())
        .expect(200)

    expect(response.body.title).toEqual(title)
    expect(response.body.price).toEqual(price)
});