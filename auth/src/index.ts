import express, {Application, json, urlencoded} from 'express'
import 'express-async-errors'
import {authRouter} from "./routes/auth";
import errorHandler from "./middlewares/error.middleware";
import {NotFoundError} from "./utils/exceptions/not-found.error";

const app:Application = express()
app.use(json())
app.use(urlencoded({extended: false}))

app.use('/api', authRouter)

app.all('*', async () => {
    throw new NotFoundError();
})

app.use(errorHandler)

app.listen(3000, () => console.log(`Auth: listening on port 3000!`))