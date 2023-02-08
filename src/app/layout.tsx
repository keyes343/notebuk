// "use client";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import * as home from "@/modules/Home";
import Provider from "./Provider";

export default function App({ children }: any) {
  return <Provider>{children}</Provider>;
}
