'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { removeFavorite } from '../../store/favoritesSlice';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function FavoritesPage() {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-green-50 text-center">
        <p className="text-xl text-gray-600 mb-4">No favorites yet.</p>
        <Link
          href="/productos"
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full transition duration-300"
        >
          Go to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        Your Favorite Characters
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map(character => (
          <div
            key={character.id}
            className="relative bg-white rounded-3xl shadow-xl p-4 text-center hover:scale-[1.02] transition-transform duration-300"
          >
            {/* Corazón */}
            <button
              onClick={() => dispatch(removeFavorite(character.id))}
              className="absolute top-3 right-3"
              aria-label="Remove from favorites"
            >
              <Heart
                className="text-red-500 drop-shadow transition-transform hover:scale-110"
                fill="red"
                size={28}
              />
            </button>

            {/* Imagen */}
            <img
              src={character.image}
              alt={character.name}
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4 transition-transform hover:scale-105"
            />

            {/* Nombre */}
            <h2 className="text-xl font-semibold text-gray-800">{character.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
