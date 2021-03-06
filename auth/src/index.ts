console.log('Starting up');
import mongoose from 'mongoose';
import App from "./app";

const start = async () => {
    if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined!')
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI must be defined!')

    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch (e) {
        console.error(e)
    }

    App.listen(3000, () => console.log(`Auth: listening on port 3000!`))
}

start()
