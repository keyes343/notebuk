import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { AllContext } from "@/context/AllContext";
import * as home from "@/modules/Home";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session, status } = useSession();
  const { printAllContext } = AllContext();
  const homeHook = home.HomeHook(session);

  // useEffect(() => {
  //   console.log({ user_from_db });
  // }, [user_from_db]);

  if (session) {
    return (
      <div>
        user email = ${session.user?.email}
        <button onClick={() => signOut()}>Signout</button>
        <div className="border-2 border-red-500 ">
          <div onClick={printAllContext}>print context</div>
        </div>
      </div>
    );
  }
  return (
    <div className="border-2 border-red-500 text-3xl">
      Not signed in
      <button onClick={() => signIn()}>sign in</button>
    </div>
  );
}
