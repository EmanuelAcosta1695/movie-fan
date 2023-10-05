'use client'
import { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

//@ts-ignore
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //@ts-ignore
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    //@ts-ignore
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};