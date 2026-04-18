'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Star, Tag } from 'lucide-react';
import Image from 'next/image';
import type { Product } from '@/app/data/products';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (product: Product) => void;
  onAddToFavorites: (product: Product) => void;
  onRemoveFromFavorites: (id: number) => void;
  isInFavorites: (id: number) => boolean;
}

export function ProductModal({ 
  isOpen, 
  onClose, 
  product, 
  onAddToCart, 
  onAddToFavorites, 
  onRemoveFromFavorites,
  isInFavorites 
}: ProductModalProps) {
  if (!product) return null;

  const handleAddToFavorites = () => {
    if (isInFavorites(product.id)) {
      onRemoveFromFavorites(product.id);
    } else {
      onAddToFavorites(product);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-gray-900 to-black border border-gold-500/20 rounded-2xl shadow-2xl shadow-gold-500/10 z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-800/80 backdrop-blur-sm flex items-center justify-center hover:bg-gold-500/20 transition-colors z-20"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="relative w-full h-[500px] lg:h-full min-h-[400px] overflow-hidden rounded-l-2xl bg-gray-800">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain object-center"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center hidden">
                  <span className="text-gold-500/20 text-8xl font-serif">Z</span>
                </div>

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-gold-500 text-obsidian-950 text-sm 
                                   tracking-wider uppercase font-bold rounded-full">
                      {product.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-8 lg:p-12">
                <div className="mb-6">
                  <h1 className="text-3xl lg:text-4xl font-serif text-white mb-2">
                    {product.name}
                  </h1>
                  <h2 className="text-xl text-gold-400 mb-4">
                    {product.arabicName}
                  </h2>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating)
                              ? 'text-gold-400 fill-current'
                              : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-400 text-sm">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="text-3xl font-bold text-gold-400 mb-6">
                    ${product.price.toLocaleString('en-US')}
                  </div>

                  {/* Stock Status */}
                  <div className="mb-6">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium
                      ${product.inStock 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}
                    >
                      <span className={`w-2 h-2 rounded-full ${
                        product.inStock ? 'bg-green-400' : 'bg-red-400'
                      }`} />
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Category */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-3">Category</h3>
                  <span className="inline-block px-4 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gray-700">
                    {product.category}
                  </span>
                </div>

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-gray-800 text-gray-400 rounded-full text-sm border border-gray-700"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => onAddToCart(product)}
                    disabled={!product.inStock}
                    className={`flex-1 py-4 px-6 rounded-xl font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-3
                      ${product.inStock 
                        ? 'bg-gold-500 text-obsidian-950 hover:bg-gold-400 shadow-lg shadow-gold-500/30' 
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
                  >
                    <ShoppingBag className="w-5 h-5" />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                  
                  <button
                    onClick={handleAddToFavorites}
                    className={`p-4 rounded-xl transition-all
                      ${isInFavorites(product.id)
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700'}`}
                  >
                    <Heart className={`w-5 h-5 ${isInFavorites(product.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
