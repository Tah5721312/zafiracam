'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Trash2 } from 'lucide-react';
import type { Product } from '@/app/data/products';
import { useEffect } from 'react';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemoveItem: (id: number) => void;
  onAddToCart: (product: Product) => void;
}

export function FavoritesDrawer({ isOpen, onClose, items, onRemoveItem, onAddToCart }: FavoritesDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-gradient-to-b from-gray-900 to-black border-l border-red-900/30"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-red-600" />
                <h2 className="text-xl font-bold text-white horror-font">Favorites</h2>
                <span className="px-2 py-1 bg-red-900/50 rounded-full text-xs text-white">
                  {items.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-900/50 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6" style={{ maxHeight: 'calc(100vh - 200px)' }}>
              {items.length === 0 ? (
                <div className="text-center py-20">
                  <Heart className="w-20 h-20 mx-auto text-gray-700 mb-4" />
                  <h3 className="text-xl text-gray-400 horror-font mb-2">
                    Favorites is empty
                  </h3>
                  <p className="text-gray-600">
                    Add some scary products!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex gap-4 p-4 rounded-xl bg-gray-900/50 border border-gray-800"
                    >
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.arabicName}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-bold text-sm mb-1 truncate">
                          {item.name}
                        </h4>
                        <p className="text-red-500 font-bold mb-2">
                          EGP {item.price}
                        </p>

                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => onAddToCart(item)}
                            disabled={!item.inStock}
                            className={`
                              px-3 py-1 rounded-full text-xs font-bold transition-colors
                              ${item.inStock 
                                ? 'bg-red-900 hover:bg-red-800 text-white' 
                                : 'bg-gray-700 text-gray-400 cursor-not-allowed'}
                            `}
                          >
                            {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </button>

                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-gray-500 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
