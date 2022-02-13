import request from "supertest";
import {app} from "../../app";
import {Help} from "../../test/helpers";
import {Ticket} from "../../models/tickets";

it('should have a route handler listening to /api/tickets for post requests', async function () {
    const response = await request(app)
        .post('/api/tickets')
        .send({})

    expect(response.status).not.toEqual(404)
});

it('should only be accessed if a user is signed in', async function () {
    await request(app)
        .post('/api/tickets')
        .send({})
        .expect(401)
});

it('should return a status other than 401 if user is signed in', async function () {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', Help.signIn())
        .send({})

    expect(response.status).not.toEqual(401)
});

it('should return an error if an invalid title is provided', async function () {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', Help.signIn())
        .send({
            title: '',
            price: 10
        }).expect(400)

    await request(app)
        .post('/api/tickets')
        .set('Cookie', Help.signIn())
        .send({
            price: 10
        }).expect(400)
});

it('should return an error if an invalid price is provided', async function () {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', Help.signIn())
        .send({
            title: 'saadaw',
            price: -10
        }).expect(400)

    await request(app)
        .post('/api/tickets')
        .set('Cookie', Help.signIn())
        .send({
            title: '',
        }).expect(400)
});

it('should create a ticket with valid inputs', async function () {
    //  TODO: Add in a check to make sure a ticket was saved.
    let tickets = await Ticket.find({}),
        title = 'test-ticket'

    await request(app)
        .post('/api/tickets')
        .set('Cookie', Help.signIn())
        .send({
            title,
            price: 20
        }).expect(201)

    tickets = await Ticket.find({})

    expect(tickets[0].title).toEqual(title)
});