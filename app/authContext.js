import { createContext, useContext } from "react";

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext); //shorter way of writing useContext(AuthContext) in any component that needs access to auth state
