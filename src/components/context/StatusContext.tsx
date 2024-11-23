import React, { createContext, useContext, useEffect, useState } from 'react';

interface StatusContextType {
  isOnline: string;
  setIsOnline: React.Dispatch<React.SetStateAction<string>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const StatusContext = createContext<StatusContextType | undefined>(undefined);

export const StatusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<string>('Open');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    // Retrieve the login state from local storage
    const storedLoginStatus = localStorage.getItem('isLoggedInDelivery');
    return storedLoginStatus === 'true'; // Convert string to boolean
  });

  useEffect(() => {
    // Save the login state to local storage whenever it changes
    localStorage.setItem('isLoggedInDelivery', isLoggedIn.toString());
  }, [isLoggedIn]);

  return (
    <StatusContext.Provider value={{ isOnline, setIsOnline, isLoggedIn, setIsLoggedIn }}>
      {children}
    </StatusContext.Provider>
  );
};

export const useStatus = (): StatusContextType => {
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error('useStatus must be used within a StatusProvider');
  }
  return context;
};
