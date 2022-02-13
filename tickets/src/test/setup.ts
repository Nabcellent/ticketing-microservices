import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";

declare global {
    namespace NodeJS {
        interface Global {
            signIn(): string[]
        }
    }
}

let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = 'sasada'

    mongo = await MongoMemoryServer.create();

    const mongoUri = mongo.getUri()

    await mongoose.connect(mongoUri)
})

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections()

    for (const collection of collections) {
        await collection.deleteMany({})
    }
})

afterAll(async () => {
    await mongo.stop()
    await mongoose.connection.close()
})

jest.setTimeout(30000)