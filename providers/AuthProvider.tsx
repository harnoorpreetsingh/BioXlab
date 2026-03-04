"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IExtendedUser } from "@/types";
import Loader from "@/app/loading";
import { useSession } from "next-auth/react";

interface AuthContextType {
  user: any | null;
  session: any | null;
  appUser: IExtendedUser | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<any | null>>;
  setSession: React.Dispatch<React.SetStateAction<any | null>>;
  refreshAppUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any | null>(null);
  const [sessionState, setSession] = useState<any | null>(null);
  const [appUser, setAppUser] = useState<IExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const fetchAppUser = async (userEmail: string) => {
    try {
      const response = await fetch(`/api/user?email=${userEmail}`);
      if (!response.ok) {
        // Only log errors that aren't 401 (unauthorized), as those are expected when not authenticated
        if (response.status !== 401) {
          console.error("Error fetching app user:", response.status, response.statusText);
        }
        setAppUser(null);
        return;
      }
      const data = await response.json();
      setAppUser(data as IExtendedUser);
    } catch (err) {
      console.error("Unexpected error fetching app user:", err);
      setAppUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
      return;
    }

    if (status === "authenticated" && session?.user) {
      setUser(session.user);
      setSession(session);

      const userEmail = session.user.email;
      if (userEmail) {
        fetchAppUser(userEmail);
      } else {
        setLoading(false);
      }
    } else {
      setUser(null);
      setSession(null);
      setAppUser(null);
      setLoading(false);
    }
  }, [session, status]);

  const refreshAppUser = async () => {
    if (user?.email) {
      await fetchAppUser(user.email);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{ user, session: sessionState, appUser, loading, setUser, setSession, refreshAppUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useCurrentUser() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useCurrentUser must be used within an AuthProvider");
  }
  return context;
}
