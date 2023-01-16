import { createContext, Dispatch } from 'react'
import * as t from '@/types'

type Payload = {
    [K in keyof State]: State[K]
}

type Action = {
    type: 'set-state'
    payload?: Partial<Payload>
}
export enum act {
    'set-state',
}

export type State = {
    events: t.cal.CalendarEvent[] | null
    // focused_month: 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May'
    // focused_year: number
    focused_date: number | null
}

export const initialState: State = {
    events: null,
    focused_date: null,
}

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
