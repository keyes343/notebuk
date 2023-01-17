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
    const { method, body, query } = req;
    await dbConnect();
    // console.log('--aa -- bb');
    const { action } = query as { action: 'generate' | 'verify'; };
    const { email, token } = body as { email: string, token: string; };

    switch (method) {
        case 'POST':
            // console.log('test 1');
            try {
                switch (action) {
                    case 'generate': {
                        const emailToken = jwt.sign({ email }, 'test');
                        // console.log({ emailToken });
                        res.status(200).send({ emailToken });
                    } break;
                    case 'verify': {
                        const decoded = jwt.verify(token, 'test') as { email: string; };
                        // console.log('---------eeeeeeee---------');
                        // console.log({ decoded });
                        // const decoded = jwt.verify(emailToken, 'test');
                        res.status(200).send({ emailToken: decoded });
                    } break;
                    default: break;
                }
            } catch (error) {
                console.log({ error });
            }
        default: {
            console.log('nothing happened');
        } break;
    }
}