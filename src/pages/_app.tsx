import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import * as home from "@/modules/Home";
import { useReducer } from "react";
import * as cal from "../context/Calendar";
import * as appSettings from "../context/AppSettings";
import * as userSettings from "../context/UserSettings";
import * as forms from "../context/Forms";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </SessionProvider>
  );
}

interface WrapperProps {
  children: React.ReactNode;
}
const Wrapper = (props: WrapperProps) => {
  const [state_calendar, dispatch_calendar] = useReducer(cal.reducer, cal.initialState);
  const [state_appSettings, dispatch_appSettings] = useReducer(appSettings.reducer, appSettings.initialState);
  const [state_userSettings, dispatch_userSettings] = useReducer(userSettings.reducer, userSettings.initialState);
  const [state_forms, dispatch_forms] = useReducer(forms.reducer, forms.initialState);

  return (
    <>
      {/*USER-SETTINGS CONTEXT */}
      <userSettings.StateContext.Provider value={state_userSettings}>
        <userSettings.DispatchContext.Provider value={dispatch_userSettings}>
          {/*APP-SETTINGS CONTEXT */}
          <appSettings.StateContext.Provider value={state_appSettings}>
            <appSettings.DispatchContext.Provider value={dispatch_appSettings}>
              {/* CALENDAR CONTEXT */}
              <cal.StateContext.Provider value={state_calendar}>
                <cal.DispatchContext.Provider value={dispatch_calendar}>{props.children}</cal.DispatchContext.Provider>
              </cal.StateContext.Provider>
              {/* CALENDAR CONTEXT END */}
            </appSettings.DispatchContext.Provider>
          </appSettings.StateContext.Provider>
          {/* APP-SETTINGS CONTEXT END */}
        </userSettings.DispatchContext.Provider>
      </userSettings.StateContext.Provider>
      {/*USER-SETTINGS CONTEXT END */}
    </>
  );
};
