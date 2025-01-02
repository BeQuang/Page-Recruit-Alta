// LoadingContext.tsx
import React, { createContext, useContext } from "react";

interface LoadingContextProps {
  setLoading: (value: boolean) => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(
  undefined
);

export const LoadingProvider: React.FC<{
  setLoading: (value: boolean) => void;
  children: React.ReactNode;
}> = ({ setLoading, children }) => {
  return (
    <LoadingContext.Provider value={{ setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
