import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('favorites');
    if (serializedState === null) {
      return undefined;
    }

    const parsed = JSON.parse(serializedState);
    return {
      favorites: {
        items: Array.isArray(parsed) ? parsed : [],
      },
    };
  } catch (e) {
    console.warn('Failed to load from localStorage:', e);
    return undefined;
  }
};

const saveToLocalStorage = (state: any) => {
  try {
    const serializedState = JSON.stringify(state.favorites.items);
    localStorage.setItem('favorites', serializedState);
  } catch (e) {
    console.warn('Failed to save to localStorage:', e);
  }
};

const preloadedState = typeof window !== 'undefined' ? loadFromLocalStorage() : undefined;

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
  preloadedState,
  devTools: process.env.NODE_ENV !== 'production', // ✅ Habilita Redux DevTools en desarrollo
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
