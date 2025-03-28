"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export default function SessionProviderWrapper({ 
  children,
  session,
 }: { 
  children: React.ReactNode;
  session?: Session;
}) {
  return (
    <SessionProvider session={session} refetchInterval={60 * 5} refetchOnWindowFocus={false}>
      {children}
    </SessionProvider>
  )
}