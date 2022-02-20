import supertest from "supertest";
import {app} from "../../app";
import {Help} from "../../test/helpers";

const request = supertest(app);

const createTicket = () => {
    return request
        .post('/api/tickets')
        .set('Cookie', Help.signIn())
        .send({
            title: 'sasda',
            price: 20
        })
}

it('should fetch a list of tickets', async function () {
    await createTicket();
    await createTicket();
    await createTicket();

    const response = await request
        .get('/api/tickets')
        .send()
        .expect(200)

    expect(response.body.length).toEqual(3)
});