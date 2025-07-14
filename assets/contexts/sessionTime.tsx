import React, { createContext, useState } from "react";

interface SessionTimeContextType {
  sessionTime: number;
  setSessionTime: React.Dispatch<React.SetStateAction<number>>;
}

interface SessionProviderProps {
  children: React.ReactNode;
}

const SessionTimeContext = createContext<SessionTimeContextType | undefined>(
  undefined
);

const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [sessionTime, setSessionTime] = useState<number>(0);

  return (
    <SessionTimeContext.Provider value={{ sessionTime, setSessionTime }}>
      {children}
    </SessionTimeContext.Provider>
  );
};

export { SessionTimeContext, SessionProvider };
