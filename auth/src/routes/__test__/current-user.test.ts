import request from "supertest";
import App from "../../app";
import {Help} from "../../test/helpers";

it('should respond with details about current user',async function () {
    const cookie = await Help.signUp()

    const response = await request(App)
        .get('/api/users/current-user')
        .set('Cookie', cookie)
        .send().expect(200)

    expect(response.body.currentUser.email).toEqual('test@test.com')
});

it('should respond with null if not authenticated', async function () {
    const response = await request(App)
        .get('/api/users/current-user')
        .send().expect(200)

    expect(response.body.currentUser).toEqual(null)
});
