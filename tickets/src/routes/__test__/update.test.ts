import request from "supertest";
import {app} from "../../app";
import mongoose from "mongoose";
import {Help} from "../../test/helpers";

it('should return a 404 if provided ticket does not exist', async function () {
    const id = new mongoose.Types.ObjectId().toHexString()

    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', Help.signIn())
        .send({title: 'sadas', price: 20})
        .expect(404)
});

it('should return a 401 if user is not authenticated', async function () {
    const id = new mongoose.Types.ObjectId().toHexString()

    await request(app)
        .put(`/api/tickets/${id}`)
        .send({title: 'sadas', price: 20})
        .expect(401)
});

it('should return a 401 if user does not own the ticket', async function () {

});

it('should return 400 if user provides invalid title or price', async function () {

});

it('should update the ticket if provided with valid inputs', async function () {

}); 