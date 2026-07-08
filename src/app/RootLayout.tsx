import type { ReactNode } from 'react';
import { Header } from '../widgets/layout/Header';
import { Footer } from '../widgets/layout/Footer';

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}
