import React, { createContext, useState } from "react";

interface SessionTimeContextType {
  sessionTime: number;
  setSessionTime: React.Dispatch<React.SetStateAction<number>>;
  practiceSessionId: string | null;
  setPracticeSessionId: React.Dispatch<React.SetStateAction<string | null>>;
}

interface SessionProviderProps {
  children: React.ReactNode;
}

const SessionTimeContext = createContext<SessionTimeContextType | undefined>(
  undefined
);

const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [sessionTime, setSessionTime] = useState<number>(0);
  const [practiceSessionId, setPracticeSessionId] = useState<string | null>(
    null
  );

  return (
    <SessionTimeContext.Provider
      value={{
        sessionTime,
        setSessionTime,
        practiceSessionId,
        setPracticeSessionId,
      }}
    >
      {children}
    </SessionTimeContext.Provider>
  );
};

export { SessionTimeContext, SessionProvider };
