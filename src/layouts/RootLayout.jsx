import { Outlet, ScrollRestoration } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <ScrollRestoration />
      <Header />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

