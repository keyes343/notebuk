import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_URI = 'mongodb+srv://jeet343:jeet419@notebuk-india.sraukgq.mongodb.net/test?retryWrites=true&w=majority';

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {
        conn: null, promise: null
    };
}

export default async function dbConnect() {
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: false,
    };

    if (mongoose.connection.readyState >= 1) {
        return;
    }

    mongoose.connection.on('connected', () => {
        console.log('contection establiseted from jeet pc');
    });
    mongoose.connection.on('error', () => {
        console.log('some error happened while connecting from jeet pc');
    });
    const connected = mongoose.connect(MONGODB_URI!);
    return connected;
}

