import express, {Application, json, urlencoded} from 'express'
import 'express-async-errors'
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

export {app}