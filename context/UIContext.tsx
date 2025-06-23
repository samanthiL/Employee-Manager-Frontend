'use client';
import React, { createContext, useContext, useState } from 'react';

type ViewMode = 'list' | 'grid';

interface UIContextType {
  view: ViewMode;
  toggleView: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [view, setView] = useState<ViewMode>('list');

  const toggleView = () => {
    setView((prev) => (prev === 'list' ? 'grid' : 'list'));
  };

  return (
    <UIContext.Provider value={{ view, toggleView }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUIContext must be used within a UIProvider');
  }
  return context;
};
