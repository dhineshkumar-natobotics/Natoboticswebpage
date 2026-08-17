import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type HeaderContextType = {
  isHeaderVisible: boolean;
  setHeaderVisible: (visible: boolean) => void;
};

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [isHeaderVisible, setHeaderVisible] = useState(true);

  return (
    <HeaderContext.Provider value={{ isHeaderVisible, setHeaderVisible }}>
      {children}
    </HeaderContext.Provider>
  );
}

/**
 * Custom hook to control the header visibility from any page or component.
 */
export function useHeader() {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
}
