import express, {Application, json, urlencoded} from 'express'
import {authRouter} from "./routes/auth";
import errorHandler from "./middlewares/error.middleware";

const app:Application = express()
app.use(json())
app.use(urlencoded({extended: false}))

app.use('/api', authRouter)

app.use(errorHandler)

app.listen(3000, () => console.log(`Auth: listening on port 3000!`))