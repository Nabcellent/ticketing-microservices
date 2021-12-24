import express, {Application, json, urlencoded} from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import {authRouter} from "./routes/auth";
import errorHandler from "./middlewares/error.middleware";
import {NotFoundError} from "./utils/exceptions/not-found.error";
import cookieSession from "cookie-session";

const app: Application = express()

app.set('trust proxy', true)

app.use(json())
app.use(urlencoded({extended: false}))
app.use(cookieSession({
    signed: false,
    secure: true
}))

app.use('/api', authRouter)

app.all('*', async () => {
    throw new NotFoundError();
})

app.use(errorHandler)

const start = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    } catch (e) {
        console.error(e)
    }

    app.listen(3000, () => console.log(`Auth: listening on port 3000!`))
}

start()