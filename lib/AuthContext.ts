'use client'
import { SafeUser } from "@/types/types";
import { createContext } from "react";
interface AuthContextProps {
  user?: SafeUser | null; // You can adjust the type as needed
  // Add any other properties you want to include in the context
}

const initialAuthContext: AuthContextProps = {
  user: null,
  // Initialize other context properties here
};

export const AuthContext = createContext<AuthContextProps>(initialAuthContext);
