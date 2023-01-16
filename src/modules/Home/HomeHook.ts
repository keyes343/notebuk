import { AllContext } from '@/context/AllContext';
import { Session } from 'next-auth';
import { useCallback, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import * as t from '@/types';


export function HomeHook(session: Session | null) {
    const { state_userSettings: { userId, email },
        set_userSettings } = AllContext();

    const fetcher = async (url: string) => {
        const { status, data } = await axios.post(url, {
            email
        });
        return 'data';
    };
    const { data: user_from_db, isLoading, error } = useSWR('/api/user',
        async (url: string) => {
            const { status, data } = await axios.post(url, {
                email
            });
            return 'data';
        }, {
        isPaused: () => {
            return !!email;
        }
    });

    const user_logs_in = useCallback(() => {
        if (session === null) return;
        // get userId from mongoose
        const api = '/api/users';

    }, [session]);

    useEffect(() => {
        console.log({ session, user_from_db });
    }, [session, user_from_db]);


    return {
        user_from_db
    };
}