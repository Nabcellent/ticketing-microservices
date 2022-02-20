import App from "../../app";
import request from "supertest";

it('Fails when an incorrect email is supplied', async () => {
    await request(App)
        .post('/api/users/sign-in')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400)
})

it('Fails when an incorrect password is provided', async () => {
    await request(App)
        .post('/api/users/sign-up')
        .send({
            email:'test@test.com',
            password:'password'
        }).expect(201)

    await request(App)
        .post('/api/users/sign-in')
        .send({
            email:'test@test.com',
            password:'asadakl'
        }).expect(400)
})

it('Responds with a cookie when given valid credentials', async () => {
    await request(App)
        .post('/api/users/sign-up')
        .send({
            email:'test@test.com',
            password:'password'
        }).expect(201)

    const response = await request(App)
        .post('/api/users/sign-in')
        .send({
            email:'test@test.com',
            password:'password'
        }).expect(200)

    expect(response.get('Set-Cookie')).toBeDefined()
})
