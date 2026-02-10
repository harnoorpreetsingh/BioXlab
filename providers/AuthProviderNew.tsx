"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Loader from "@/app/loading";
import prisma from "@/lib/prisma";

interface IExtendedUser {
  id: string;
  email: string;
  firstName: string;
  lastName?: string | null;
  dateOfBirth: Date;
  gender: string;
  address: string;
  phone: string;
  role: string;
}

interface AuthContextType {
  user: any;
  session: any;
  appUser: IExtendedUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [appUser, setAppUser] = useState<IExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchAppUser = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch(`/api/user?email=${session.user.email}`);
          if (response.ok) {
            const data = await response.json();
            setAppUser(data);
          }
        } catch (error) {
          console.error("Error fetching app user:", error);
        }
      } else {
        setAppUser(null);
      }
      setLoading(false);
    };

    if (status !== "loading") {
      fetchAppUser();
    }
  }, [session, status]);

  if (status === "loading" || loading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{
        user: session?.user || null,
        session: session || null,
        appUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Compatibility export for old code
export const useCurrentUser = useAuth;
