import { createContext, useContext, useState, useEffect } from "react";
import getAuthUser from "../utils/getAuthUser";
export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setauthUser] = useState(() => getAuthUser());

  return (
    <AuthContext.Provider value={{ authUser, setauthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
