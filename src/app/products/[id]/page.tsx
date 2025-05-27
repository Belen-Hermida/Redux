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
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="relative bg-white shadow-xl rounded-2xl p-8 max-w-sm text-center">
        
        {/* Corazón en la esquina superior derecha */}
        <div className="absolute top-4 right-4 cursor-pointer">
          <Heart
            size={28}
            fill={isFavorite ? 'red' : 'white'}
            stroke={isFavorite ? 'red' : 'gray'}
            onClick={toggleFavorite}
          />
        </div>
  
        <img
          src={character.image}
          alt={character.name}
          className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{character.name}</h1>
        <p className="text-gray-600 mb-1">
          <strong>Status:</strong> {character.status}
        </p>
        <p className="text-gray-600 mb-1">
          <strong>Species:</strong> {character.species}
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Gender:</strong> {character.gender}
        </p>
        <button
          onClick={toggleFavorite}
          className={`${
            isFavorite
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white px-6 py-2 rounded-full font-semibold transition duration-300`}
        >
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
  
}
