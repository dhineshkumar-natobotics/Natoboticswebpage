import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useHeader } from './HeaderContext';

export function RootLayout({ children }: { children: ReactNode }) {
  const { isHeaderVisible } = useHeader();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {isHeaderVisible && <Header />}
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}
