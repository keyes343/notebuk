import { AllContext } from '@/context/AllContext';
import { Session } from 'next-auth';
import { useCallback, useEffect } from 'react';
import axios from 'axios';
import useSWR, { mutate } from 'swr';
import * as t from '@/types';

export function HomeHook(session: Session | null) {
    const {
        state_userSettings: {
            userId, email, jwt_token, token_verified
        },
        set_userSettings } = AllContext();

    const getEmail = useCallback(() => {
        if (!session || !session.user || typeof session.user.email !== 'string') return;

        set_userSettings({
            email: session.user.email,
        });
    }, [session, set_userSettings]);

    const getToken = useCallback(async () => {
        if (!email || (email && jwt_token)) {
            return;
        }
        let token = localStorage.getItem('token') as any;
        if (token && !jwt_token) {
            set_userSettings({
                jwt_token: token
            });
            console.log('part 1');
        } else if (!token && email) {
            const { data, status } = await axios.post('/api/users/token/generate', {
                email
            });
            console.log('part 2');
            console.log({ data });
            localStorage.setItem('token', data.emailToken);
            set_userSettings({
                jwt_token: data.emailToken
            });
        }
    }, [email, jwt_token, set_userSettings]);

    const verifyToken = useCallback(async () => {
        if (!jwt_token || token_verified) return;

        const { data, status } = await axios.post<{ email: string; }>('/api/users/token/verify', {
            token: jwt_token
        });
        if (status === 200) {
            set_userSettings({
                token_verified: true
            });
        } else {
            set_userSettings({
                userId: null,
                jwt_token: null,
                token_verified: false,
                email: ''
            });
        }
    }, [jwt_token, set_userSettings, token_verified]);

    useEffect(() => {
        getEmail();
        getToken();
        verifyToken();
    }, [getEmail, getToken, verifyToken]);


    return {
    };
}