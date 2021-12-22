import express from 'express'
import {json} from 'body-parser'
import {authRouter} from "./routes/auth";

const app = express()
app.use(json())

app.use('api', authRouter)

app.listen(3000, () => console.log(`Auth: listening on port 3000!`))