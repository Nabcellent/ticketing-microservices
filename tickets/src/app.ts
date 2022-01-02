import express, {Application, json, urlencoded} from 'express'
import 'express-async-errors'
import {errorHandler, NotFoundError} from "@nabztickets/common";
import cookieSession from "cookie-session";

const app: Application = express()

app.set('trust proxy', true)

app.use(json())
app.use(urlencoded({extended: false}))
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}))

app.all('*', async () => {
    throw new NotFoundError();
})

app.use(errorHandler)

export {app}
