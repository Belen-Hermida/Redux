'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../store/favoritesSlice';
import { RootState } from '../../store/store';
import { Heart } from 'lucide-react';
import Link from 'next/link';

interface Character {
  id: number;
  name: string;
  image: string;
}

export default function ProductsPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const favorites = useSelector((state: RootState) =>
    Array.isArray(state.favorites.items) ? state.favorites.items : []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(res => res.json())
      .then(data => setCharacters(data.results));
  }, []);

  const isFavorite = (id: number) => favorites.some(item => item.id === id);

  const toggleFavorite = (character: Character) => {
    if (isFavorite(character.id)) {
      dispatch(removeFavorite(character.id));
    } else {
      dispatch(addFavorite(character));
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-green-700 drop-shadow-md">
        Rick and Morty Characters
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {characters.map(character => (
          <div
            key={character.id}
            className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 group overflow-hidden"
          >
            <Link href={`/products/${character.id}`}>
              <div className="text-center cursor-pointer">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <h2 className="text-lg font-semibold text-gray-800 px-2 py-3 truncate group-hover:text-green-700">
                  {character.name}
                </h2>
              </div>
            </Link>

            <Heart
              size={28}
              className={`absolute top-3 right-3 cursor-pointer drop-shadow-md ${
                isFavorite(character.id) ? 'text-red-500' : 'text-gray-400'
              }`}
              onClick={() => toggleFavorite(character)}
              fill={isFavorite(character.id) ? 'currentColor' : 'none'}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
