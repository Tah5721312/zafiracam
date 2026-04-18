'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';
import type { Product } from '@/app/data/products';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  favorites: Product[];
  isCartOpen: boolean;
  isFavoritesOpen: boolean;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'ADD_TO_FAVORITES'; payload: Product }
  | { type: 'REMOVE_FROM_FAVORITES'; payload: number }
  | { type: 'TOGGLE_CART'; payload?: boolean }
  | { type: 'TOGGLE_FAVORITES'; payload?: boolean }
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'LOAD_FAVORITES'; payload: Product[] };

const initialState: CartState = {
  items: [],
  favorites: [],
  isCartOpen: false,
  isFavoritesOpen: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== id),
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }

    case 'ADD_TO_FAVORITES': {
      const exists = state.favorites.some(item => item.id === action.payload.id);
      if (exists) return state;
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    }

    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        favorites: state.favorites.filter(item => item.id !== action.payload),
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen: action.payload !== undefined ? action.payload : !state.isCartOpen,
      };

    case 'TOGGLE_FAVORITES':
      return {
        ...state,
        isFavoritesOpen: action.payload !== undefined ? action.payload : !state.isFavoritesOpen,
      };

    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload,
      };

    case 'LOAD_FAVORITES':
      return {
        ...state,
        favorites: action.payload,
      };

    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (id: number) => void;
  toggleCart: (open?: boolean) => void;
  toggleFavorites: (open?: boolean) => void;
  isInCart: (id: number) => boolean;
  isInFavorites: (id: number) => boolean;
  cartItemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart and favorites from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedFavorites = localStorage.getItem('favorites');
    
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartItems });
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
    
    if (savedFavorites) {
      try {
        const favorites = JSON.parse(savedFavorites);
        dispatch({ type: 'LOAD_FAVORITES', payload: favorites });
      } catch (error) {
        console.error('Failed to load favorites from localStorage:', error);
      }
    }
  }, []);

  // Save cart and favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const addToFavorites = (product: Product) => {
    dispatch({ type: 'ADD_TO_FAVORITES', payload: product });
  };

  const removeFromFavorites = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: id });
  };

  const toggleCart = (open?: boolean) => {
    dispatch({ type: 'TOGGLE_CART', payload: open });
  };

  const toggleFavorites = (open?: boolean) => {
    dispatch({ type: 'TOGGLE_FAVORITES', payload: open });
  };

  const isInCart = (id: number) => {
    return state.items.some(item => item.id === id);
  };

  const isInFavorites = (id: number) => {
    return state.favorites.some(item => item.id === id);
  };

  const cartItemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        addToFavorites,
        removeFromFavorites,
        toggleCart,
        toggleFavorites,
        isInCart,
        isInFavorites,
        cartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
