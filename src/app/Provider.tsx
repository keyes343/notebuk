"use client";

import { SessionProvider } from "next-auth/react";
import { NextPage } from "next";

interface Props {
  children: React.ReactNode;
}

export default function Provider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}
