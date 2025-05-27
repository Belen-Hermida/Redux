'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { removeFavorite } from '../../store/favoritesSlice';
import { HeartIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FavoritesPage() {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null; // Evita renderizar antes de que el cliente monte

  if (favorites.length === 0) {
    return <p className="text-center mt-8 text-gray-600">No favorites yet.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Your Favorite Characters</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {favorites.map(character => (
          <div
            key={character.id}
            className="bg-white rounded shadow p-4 text-center hover:shadow-md transition-shadow relative"
          >
            <button
              onClick={() => dispatch(removeFavorite(character.id))}
              className="absolute top-2 right-2"
              aria-label="Remove from favorites"
            >
              <HeartIcon className="text-red-500 fill-red-500 w-6 h-6 hover:scale-110 transition-transform" />
            </button>

            <img
              src={character.image}
              alt={character.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h2 className="text-lg font-semibold">{character.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
