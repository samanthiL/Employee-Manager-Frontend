'use client';
import { Provider } from 'react-redux';
import { store } from '../store'; // adjust path if your store is in a different folder
import { UIProvider } from '@/context/UIContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <UIProvider>{children}</UIProvider>
    </Provider>
  );}
