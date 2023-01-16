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
    id: t.forms.InputData['id'] | null
    field_type: t.forms.InputData['field_type'] | null
    description: t.forms.InputData['description'] | null

    // below - setup_attributes
    placeholder: t.forms.InputData['setup_attributes']['placeholder'] | null
    option: t.forms.InputData['setup_attributes']['option'] | null
    title: t.forms.InputData['setup_attributes']['title'] | null
    // above  - setup_attributes ends
    label: t.forms.InputData['label'] | null
}

export const initialState: State = {
    id: null,
    field_type: null,
    description: null,

    // below - setup_attributes
    placeholder: null,
    option: null,
    title: null,
    // above  - setup_attributes ends
    label: null,
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
