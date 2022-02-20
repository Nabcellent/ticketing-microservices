import request from "supertest";
import App from "../../app";

it('should return a 201 on successful sign up', async () => {
    return request(App)
        .post('/api/users/sign-up')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)
})

it('should return a 400 with an invalid email', function () {
    return request(App)
        .post('/api/users/sign-up')
        .send({
            email: 'test@testcom',
            password: 'password'
        })
        .expect(400)
});

it('should return a 400 with an invalid password', function () {
    return request(App)
        .post('/api/users/sign-up')
        .send({})
        .expect(400)
});

it('should return a 400 with missing email & or password', async () => {
    await request(App)
        .post('/api/users/sign-up')
        .send({
            email: 'test@testcom',
        })
        .expect(400)
    await request(App)
        .post('/api/users/sign-up')
        .send({
            password: 'pas'
        })
        .expect(400)
});

it('Disallows duplicate emails', async () => {
    await request(App)
        .post('/api/users/sign-up')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)
    await request(App)
        .post('/api/users/sign-up')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400)
})

it('Sets a cookie after successful sign up', async () => {
    const response = await request(App)
        .post('/api/users/sign-up')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)

    expect(response.get('Set-Cookie')).toBeDefined()
})
