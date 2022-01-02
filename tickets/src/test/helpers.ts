import jwt from 'jsonwebtoken'

export const Help = {
    signIn: () => {
        //  Build a JWT payload {id, email}
        const payload = {
            email: 'test@test.com',
            password: 'password'
        }

        //  Create the JWT
        const token = jwt.sign(payload, process.env.JWT_KEY!)

        //  Build the session object. {jwt, JWT}
        const session = {jwt: token}

        //  Turn the session into JSON
        const sessionJSON = JSON.stringify(session)

        //  encode the JSON as a base64 string
        const base64 = Buffer.from(sessionJSON).toString('base64')

        //  Return the string (cookie)
        return [`session=${base64}`]
    }
}