import request from "supertest";
import {app} from "../app";

export const Help = {
    signUp: async () => {
        const email = 'test@test.com',
            password = 'password';

        const response = await request(app)
            .post('/api/users/sign-up')
            .send({email, password})
            .expect(201)

        return response.get('Set-Cookie');
    }
}