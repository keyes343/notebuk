import dbConnect from '@/lib/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next';
import ModelUser from '@/models/user';
import { send } from 'process';
import jwt from 'jsonwebtoken';

type HasEmail = {
    email: string;
};
type HasToken = {
    token: string;
};

function hasEmail(body: any): body is HasEmail {
    if (('email') in body) {
        return true;
    } else return false;
}
function hasToken(body: any): body is HasToken {
    if (('token') in body) {
        return true;
    } else return false;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, body, query } = req;
    await dbConnect();
    const { action } = query as { action: 'generate' | 'verify'; };
    const { email, token } = body as { email: string, token: string; };

    switch (method) {
        case 'POST':
            try {
                switch (action) {
                    case 'generate': {
                        if (!hasEmail(body)) {
                            console.log('body doesnt have email');
                            return;
                        }
                        const emailToken = jwt.sign({ email }, 'test');

                        // confirm or create user in directory with same user
                        const user = await acknowledgeInDatabase(body);


                        res.status(200).send({ emailToken });
                    } break;
                    case 'verify': {
                        const decoded = jwt.verify(token, 'test') as { email: string; };
                        res.status(200).send({ emailToken: decoded });
                    } break;
                    default: break;
                }
            } catch (error) {
                console.log({ error });
            } break;
        default: {
            console.log('nothing happened');
            console.log({ method });
        } break;
    }
}

async function acknowledgeInDatabase({ email }: HasEmail) {
    const user = await ModelUser.findOne({ email });
    if (user) {
        return user;
    } else {
        // create user and return the id
        const created = await ModelUser.create({ email });
        return created;
    };
}