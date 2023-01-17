import dbConnect from '@/lib/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next';
import User from '@/models/user';
import { send } from 'process';
import jwt from 'jsonwebtoken';

type CheckUserAgainstDatabase = {
    emailToken: string;
};

function hasEmail(body: any): body is CheckUserAgainstDatabase {
    if (('emailToken') in body) {
        return true;
    } else return false;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, body } = req;
    await dbConnect();

    switch (method) {
        case 'POST':
            console.log('test 1');
            try {
                console.log('test 2');
                if (!hasEmail(body)) {
                    console.log('verify body elem missing');
                    res.status(400).send({ msg: 'verify body elem missing', body });
                    break;
                }
                console.log('test 3');
                const decoded = jwt.verify(body.emailToken, 'test');
                console.log({
                    msg: 'decoded',
                    decoded
                });
                res.status(200).send({ success: true, msg: 'decoded', decoded });
                break;
            } catch (error) {
                console.log({ error });
            }
        default: {
            console.log('nothing happened');
        } break;
    }
}