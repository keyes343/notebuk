import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session, status } = useSession();
  if (session) {
    return (
      <div>
        user email = ${session.user?.email}
        <button onClick={() => signOut()}>Signout</button>
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
