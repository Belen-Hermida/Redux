'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const linkClasses = (path: string) =>
    `px-4 py-2 rounded-full transition ${
      pathname === path
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 hover:bg-gray-200'
    }`;

  return (
    <nav className="w-full flex justify-center gap-6 bg-white shadow-md py-4 sticky top-0 z-50">
      <Link href="/products" className={linkClasses('/products')}>
        Productos
      </Link>
      <Link href="/favorites" className={linkClasses('/favorites')}>
        Favoritos
      </Link>
    </nav>
  );
}
