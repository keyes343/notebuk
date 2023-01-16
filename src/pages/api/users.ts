import dbConnect from '@/lib/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next';
import User from '@/models/user';

type InsertUser = {
    username: string,
    email: string;
};

function isUser(body: any): body is InsertUser {
    if (('username' && 'email') in body) {
        return true;
    } else return false;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, body } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const users = await User.find({});
                res.status(200).send({ success: true, msg: 'users found returned', data: users });
            } catch (error) {
                console.log({ errorHappened: error });
            }
            break;
        case 'POST':
            try {
                if (!isUser(body)) {
                    break;
                }
                const user = await User.create(body);
                res.status(200).send({ success: true, msg: 'user created', data: user });
                break;
            } catch (error) {
                console.log({ error });
            }
    }
}