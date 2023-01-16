import { createContext, Dispatch } from 'react'

type Payload = {
    [K in keyof State]: State[K] | null
}

type Action = {
    type: 'set-state'
    payload?: Payload
}
export enum act {
    'set-state',
}

export type State = {}

export const initialState: State = {}

export const reducer = (state: State, action: Action) => {
    let newState = { ...state }
    const { payload, type } = action

    switch (type) {
        case 'set-state':
            newState = {
                ...newState,
                ...payload,
            }
        default:
            break
    }

    return newState
}

export const StateContext = createContext(initialState)
export const DispatchContext = createContext<Dispatch<Action> | null>(null)
