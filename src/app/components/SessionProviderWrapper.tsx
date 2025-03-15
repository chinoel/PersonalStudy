"use client";

import { SessionProvider } from "next-auth/react";

export default function SessionProviderWrapper({ 
  children,
  session,
 }: { 
  children: React.ReactNode;
  session?: any;
}) {
  return (
    <SessionProvider session={session} refetchInterval={60 * 5} refetchOnWindowFocus={false}>
      {children}
    </SessionProvider>
  )
}