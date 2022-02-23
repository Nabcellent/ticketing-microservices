import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";

jest.mock('../nats-wrapper');

process.env.STRIPE_KEY = 'sk_test_51KWLjbAH2VkaPSj0ecc6hn7AyLba0VNODTRhpMUnEH09fBkLtferaWupEiDah4AQlDk6FEtcke0IZBYJ9bUrrfUv004b7YAloE';

let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = 'sasada';

    mongo = await MongoMemoryServer.create();

    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    jest.clearAllMocks();

    const collections = await mongoose.connection.db.collections();

    for (const collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

jest.setTimeout(50000);
