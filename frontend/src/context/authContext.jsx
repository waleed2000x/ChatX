/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    const storedUser = localStorage.getItem("chat-user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  // console.log(localStorage.getItem("chat-user"));
  // console.log(authUser);
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
