import express, {Application, json, urlencoded} from 'express';
import 'express-async-errors';
import {currentUser, errorHandler, NotFoundError} from "@nabz.tickets/common";
import cookieSession from "cookie-session";
import {orderRouter} from "./routes/orders";

const app: Application = express()

app.set('trust proxy', true)

app.use(json())
app.use(urlencoded({extended: false}))
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}))
app.use(currentUser)
app.use('/api', orderRouter)

app.all('*', async () => {
    throw new NotFoundError()
})

app.use(errorHandler)

export {app}
