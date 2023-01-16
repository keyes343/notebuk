import { createContext, Dispatch } from 'react';
import * as t from '@/types';

type Payload = {
    [K in keyof State]: State[K]
};

type Action = {
    type: 'set-state';
    payload?: Partial<Payload>;
};
export enum act {
    'set-state',
}

export type State = {
    userId: null | false | string,
    email: string;
};

export const initialState: State = {
    userId: null,
    email: ''
};

export const reducer = (state: State, action: Action) => {
    let newState = { ...state };
    const { payload, type } = action;
    switch (type) {
        case 'set-state':
            newState = {
                ...newState,
                ...payload,
            };
        default:
            break;
    }

    return newState;
};

export const StateContext = createContext(initialState);
export const DispatchContext = createContext<Dispatch<Action> | null>(null);
