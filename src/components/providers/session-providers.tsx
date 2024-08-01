"use client";

import useSession from "@/stores/useSession";
import { useEffect } from "react";

const SessionProvider = ({ session }: { session: any }) => {
  const { currentSession, setSession } = useSession();

  useEffect(() => {
    if (session != currentSession) setSession(session);
  });

  return null;
};

export default SessionProvider;
