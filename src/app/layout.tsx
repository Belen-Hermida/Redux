import './globals.css';
import Navbar from './Navbar';
import Providers from './providers';

export const metadata = {
  title: 'Rick and Morty Store',
  description: 'Una tienda de personajes',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-50">
        <Providers>
          <Navbar />
          <main className="p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

