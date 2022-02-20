import {app} from "../../app";
import mongoose from "mongoose";
import {Help} from "../../test/helpers";
import supertest from 'supertest';
import {natsWrapper} from '../../nats-wrapper';

const request = supertest(app);

it('should return a 404 if provided ticket does not exist', async function () {
    const id = new mongoose.Types.ObjectId().toHexString()

    await request
        .put(`/api/tickets/${id}`)
        .set('Cookie', Help.signIn())
        .send({title: 'sadas', price: 20})
        .expect(404)
});

it('should return a 401 if user is not authenticated', async function () {
    const id = new mongoose.Types.ObjectId().toHexString()

    await request
        .put(`/api/tickets/${id}`)
        .send({title: 'sadas', price: 20})
        .expect(401)
});

it('should return a 401 if user does not own the ticket', async function () {
    const response = await request
        .post('/api/tickets')
        .set('Cookie', Help.signIn())
        .send({title: 'sadas', price: 20})

    await request
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', Help.signIn())
        .send({title: 'saApo;das', price: 10})
        .expect(401)
});

it('should return 400 if user provides invalid title or price', async function () {
    const cookie = Help.signIn()

    const response = await request
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({title: 'sadas', price: 20})

    await request
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({title: '', price: 10})
        .expect(400)

    await request
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({title: 'jamoka'})
        .expect(400)
});

it('should update the ticket if provided with valid inputs', async function () {
    const cookie = Help.signIn()

    let response = await request
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({title: 'jamoka', price: 20})

    await request
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({title: 'new title', price: 120})
        .expect(200)

    response = await request
        .get(`/api/tickets/${response.body.id}`)
        .send({title: '', price: 10})

    expect(response.body.title).toEqual('new title')
    expect(response.body.price).toEqual(120)
});

it('should publish an event', async function () {
    const cookie = Help.signIn()

    let response = await request
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({title: 'jamoka', price: 20})

    await request
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({title: 'new title', price: 120})
        .expect(200)

    expect(natsWrapper.client.publish).toHaveBeenCalled()
});