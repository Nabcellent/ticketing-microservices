import express, {Application, json, urlencoded} from 'express';
import 'express-async-errors';
import 'dotenv/config';
import {authRouter} from "./routes/auth";
import {errorHandler, NotFoundError} from "@nabz.tickets/common";
import cookieSession from "cookie-session";

const App: Application = express()

App.set('trust proxy', true)

App.use(json())
App.use(urlencoded({extended: false}))
App.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}))

App.use('/api', authRouter)

App.all('*', async () => {
    throw new NotFoundError();
})

App.use(errorHandler)

export default App
