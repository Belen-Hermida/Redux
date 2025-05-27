'use client';
import { ReactNode, useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';

export default function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <Provider store={store}>{children}</Provider>;
}
