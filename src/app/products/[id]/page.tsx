'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../../store/favoritesSlice';
import { Heart } from 'lucide-react';
import { RootState } from '../../../store/store';

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [character, setCharacter] = useState<any>(null);

  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = favorites.some((fav: any) => fav.id === Number(id));

  useEffect(() => {
    if (id) {
      fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then(res => res.json())
        .then(data => setCharacter(data));
    }
  }, [id]);

  const toggleFavorite = () => {
    if (!character) return;
    if (isFavorite) {
      dispatch(removeFavorite(character.id));
    } else {
      dispatch(addFavorite(character));
    }
  };

  if (!character) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <p className="text-xl font-semibold text-gray-600">Loading character...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <div className="relative bg-white shadow-2xl rounded-3xl p-8 max-w-md w-full text-center transition-all duration-300 hover:scale-[1.01]">
        
        {/* Corazón */}
        <div className="absolute top-4 right-4 cursor-pointer">
          <Heart
            size={32}
            fill={isFavorite ? 'red' : 'white'}
            stroke={isFavorite ? 'red' : 'gray'}
            onClick={toggleFavorite}
            className="drop-shadow-md transition-all duration-200"
          />
        </div>

        {/* Imagen con animación */}
        <img
          src={character.image}
          alt={character.name}
          className="w-44 h-44 object-cover rounded-full mx-auto mb-4 transition-transform duration-300 hover:scale-105"
        />

        {/* Nombre */}
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">{character.name}</h1>

        {/* Info */}
        <p className="text-gray-700 mb-1"><strong>Status:</strong> {character.status}</p>
        <p className="text-gray-700 mb-1"><strong>Species:</strong> {character.species}</p>
        <p className="text-gray-700 mb-4"><strong>Gender:</strong> {character.gender}</p>

        {/* Botón */}
        <button
          onClick={toggleFavorite}
          className={`px-6 py-2 rounded-full font-semibold shadow-md transition duration-300 ${
            isFavorite
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-green-500 hover:bg-green-600'
          } text-white`}
        >
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
}
