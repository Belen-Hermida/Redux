'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../store/favoritesSlice';
import { RootState } from '../../store/store';
import { Heart } from 'lucide-react';
import Link from 'next/link'; // ✅ IMPORTANTE

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
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Rick and Morty Characters</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {characters.map(character => (
          <div
            key={character.id}
            className="relative bg-white rounded shadow p-4 hover:shadow-md transition-shadow"
          >
            {/* ✅ Agrega Link envolviendo la tarjeta */}
            <Link href={`/products/${character.id}`}>
              <div className="text-center cursor-pointer">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h2 className="text-lg font-semibold">{character.name}</h2>
              </div>
            </Link>

            {/* Corazón por fuera del Link */}
            <Heart
              size={24}
              className={`absolute top-2 right-2 cursor-pointer ${
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
