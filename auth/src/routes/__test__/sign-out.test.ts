import request from "supertest";
import App from "../../app";

it('Clears the cookie after signing out.', async () => {
    await request(App)
        .post('/api/users/sign-up')
        .send({
            email:'test@test.com',
            password:'password'
        }).expect(201)

    const response = await request(App)
        .post('/api/users/sign-out')
        .send({}).expect(200)

    expect(response.get('Set-Cookie')[0]).toBeDefined()
})
