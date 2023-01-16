import { useCallback, useContext, memo } from 'react';
import * as calendar_context from '@/context/Calendar';
import * as appSettings_context from '@/context/AppSettings';
import * as userSettings_context from '@/context/UserSettings';
import * as forms_context from '@/context/Forms';

export const AllContext = () => {
    const state_calendar = useContext(calendar_context.StateContext);
    const dispatch_calendar = useContext(calendar_context.DispatchContext)!;

    const state_appSettings = useContext(appSettings_context.StateContext);
    const dispatch_appSettings = useContext(appSettings_context.DispatchContext)!;

    const state_userSettings = useContext(userSettings_context.StateContext);
    const dispatch_userSettings = useContext(userSettings_context.DispatchContext)!;

    const state_forms = useContext(forms_context.StateContext);
    const dispatch_forms = useContext(forms_context.DispatchContext)!;

    const set_forms = useCallback((payload: Partial<forms_context.State>) => {
        dispatch_forms({
            type: 'set-state',
            payload,
        });
    }, []);

    const set_calendar = useCallback((payload: Partial<calendar_context.State>) => {
        dispatch_calendar({
            type: 'set-state',
            payload,
        });
    }, []);
    const set_appSettings = useCallback((payload: Partial<appSettings_context.State>) => {
        dispatch_appSettings({
            type: 'set-state',
            payload,
        });
    }, []);
    const set_userSettings = useCallback((payload: Partial<userSettings_context.State>) => {
        dispatch_userSettings({
            type: 'set-state',
            payload,
        });
    }, []);

    const printAllContext = useCallback(() => {
        console.log({
            state_calendar,
            state_userSettings,
            state_appSettings,
        });
    }, [state_calendar, state_userSettings, state_appSettings]);

    return {
        state_calendar,
        set_calendar,
        state_appSettings,
        set_appSettings,
        state_userSettings,
        set_userSettings,
        state_forms,
        set_forms,

        printAllContext,
    };
};