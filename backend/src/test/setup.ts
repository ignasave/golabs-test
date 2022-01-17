import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../core/App';

let mongo: any;

beforeAll(async () => {
    process.env.JWT_SECRET = "asdasda";

    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();
    await mongoose.connect(mongoUri)
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
})

declare global {
    var signin: (email: string) => Promise<string[]>;
}

global.signin = async (email) => {
    const body = {
        email,
        password: 'password'
    };

    const response = await request(app)
        .post('/api/users/signup')
        .send(body)
        .expect(201);

    const cookie = response.get('Set-Cookie');
    
    return cookie;
}

