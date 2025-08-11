'use client';

import { createContext, useContext, useState } from 'react';

type LoaderContextType = {
  showLoader: (customLoader?: React.ReactNode) => void;
  hideLoader: () => void;
  isVisible: boolean;
  loaderComponent: React.ReactNode | null;
};

const LoaderContext = createContext<LoaderContextType>({
  showLoader: () => {
    throw new Error("showLoader must be used within a LoaderProvider");
  },
  hideLoader: () => {
    throw new Error("hideLoader must be used within a LoaderProvider");
  },
  isVisible: false,
  loaderComponent: null
});

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [loaderComponent, setLoaderComponent] = useState<React.ReactNode | null>(null);

  const showLoader = (customLoader?: React.ReactNode) => {
    if (customLoader) {
      setLoaderComponent(customLoader);
    } else {
      setLoaderComponent(null);
    }
    setIsVisible(true);
  };

  const hideLoader = () => {
    setIsVisible(false);
    setLoaderComponent(null);
  };

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader, isVisible, loaderComponent }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
