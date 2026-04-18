"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Filter, ChevronDown } from "lucide-react";
import Image from "next/image";
import { searchProducts, advancedSearch, products, categories, getAllTags, getPriceRange, Product, SearchFilters } from "@/app/data/products";
import { useCart } from "@/contexts/CartContext";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const allTags = getAllTags();
  const priceRange = getPriceRange();
  
  const { addToCart, addToFavorites, removeFromFavorites, isInFavorites } = useCart();

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Search when query or filters change
  useEffect(() => {
    if (query.trim() || Object.keys(filters).length > 0) {
      const searchResults = advancedSearch(query, filters);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query, filters]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleClear = () => {
    setQuery("");
    setFilters({});
    setResults([]);
    inputRef.current?.focus();
  };

  const handleTagClick = (tag: string) => {
    setQuery(tag);
  };

  const toggleFilter = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key] === value ? undefined : value
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-obsidian-950/95 backdrop-blur-xl"
        >
          <div className="h-full flex flex-col max-w-6xl mx-auto px-4 py-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif text-gold-400">Search Products</h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gold-400 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, categories, or tags..."
                className="w-full bg-obsidian-900/50 border border-gold-500/20 rounded-lg py-4 pl-12 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50 transition-colors"
              />
              {query && (
                <button
                  onClick={handleClear}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gold-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-sm text-gray-400">Popular:</span>
              {['peacock', 'leather', 'dress', 'bag', 'gold', 'denim', 'mesh', 'heels'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className="px-3 py-1 text-xs bg-gold-500/10 text-gold-400 rounded-full hover:bg-gold-500/20 transition-colors capitalize"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-gold-400 transition-colors mb-4"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>

            {/* Filters Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-obsidian-900/30 rounded-lg p-4 mb-4 space-y-4">
                    {/* Category Filter */}
                    <div>
                      <span className="text-sm text-gray-400 mb-2 block">Category</span>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => toggleFilter("category", "all")}
                          className={`px-3 py-1 text-sm rounded-full transition-colors ${
                            filters.category === "all" || !filters.category
                              ? "bg-gold-500 text-obsidian-950"
                              : "bg-obsidian-800 text-gray-300 hover:bg-obsidian-700"
                          }`}
                        >
                          All
                        </button>
                        {categories.filter(c => c.id !== 'all').map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => toggleFilter("category", cat.id)}
                            className={`px-3 py-1 text-sm rounded-full transition-colors ${
                              filters.category === cat.id
                                ? "bg-gold-500 text-obsidian-950"
                                : "bg-obsidian-800 text-gray-300 hover:bg-obsidian-700"
                            }`}
                          >
                            {cat.nameEn}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Badge Filter */}
                    <div>
                      <span className="text-sm text-gray-400 mb-2 block">Badge</span>
                      <div className="flex flex-wrap gap-2">
                        {["Best Seller", "New", "Featured", "Premium"].map((badge) => (
                          <button
                            key={badge}
                            onClick={() => toggleFilter("badge", badge)}
                            className={`px-3 py-1 text-sm rounded-full transition-colors ${
                              filters.badge === badge
                                ? "bg-gold-500 text-obsidian-950"
                                : "bg-obsidian-800 text-gray-300 hover:bg-obsidian-700"
                            }`}
                          >
                            {badge}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <span className="text-sm text-gray-400 mb-2 block">
                        Max Price: {filters.maxPrice?.toLocaleString() || priceRange.max.toLocaleString()} EGP
                      </span>
                      <input
                        type="range"
                        min={priceRange.min}
                        max={priceRange.max}
                        step={100}
                        value={filters.maxPrice || priceRange.max}
                        onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }))}
                        className="w-full accent-gold-500"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{priceRange.min.toLocaleString()} EGP</span>
                        <span>{priceRange.max.toLocaleString()} EGP</span>
                      </div>
                    </div>

                    {/* In Stock Filter */}
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="inStock"
                        checked={filters.inStock || false}
                        onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                        className="accent-gold-500"
                      />
                      <label htmlFor="inStock" className="text-sm text-gray-300">In Stock Only</label>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results Count */}
            {(query || Object.keys(filters).length > 0) && (
              <div className="text-sm text-gray-400 mb-4">
                Found {results.length} product{results.length !== 1 ? "s" : ""}
              </div>
            )}

            {/* Results Grid */}
            <div className="flex-1 overflow-y-auto">
              {results.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-20">
                  {results.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-obsidian-900/50 rounded-lg overflow-hidden hover:bg-obsidian-800/50 transition-colors cursor-pointer group border border-gold-500/10 hover:border-gold-500/30"
                      onClick={() => {
                        // Add to cart functionality
                        addToCart(product);
                        onClose(); // Close modal after adding to cart
                      }}
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {product.badge && (
                          <span className="absolute top-2 left-2 px-2 py-1 bg-gold-500 text-obsidian-950 text-xs font-bold rounded">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <div className="p-3">
                        <h3 className="text-sm font-medium text-white truncate mb-1">{product.name}</h3>
                        <p className="text-xs text-gray-400 mb-2">{product.category}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gold-400 font-bold">EGP {product.price.toLocaleString('en-US')}</p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isInFavorites(product.id)) {
                                removeFromFavorites(product.id);
                              } else {
                                addToFavorites(product);
                              }
                            }}
                            className={`p-1.5 rounded transition-colors ${
                              isInFavorites(product.id)
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-gray-700/50 text-gray-400 hover:text-red-400'
                            }`}
                          >
                            <svg className="w-3 h-3" fill={isInFavorites(product.id) ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                        </div>
                        {!product.inStock && (
                          <span className="inline-block mt-1 text-xs text-red-400">Out of Stock</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (query || Object.keys(filters).length > 0) ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <Search className="w-12 h-12 mb-4 opacity-50" />
                  <p>No products found</p>
                  <button
                    onClick={handleClear}
                    className="mt-4 text-gold-400 hover:underline"
                  >
                    Clear search
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <Search className="w-16 h-16 mb-4 opacity-30" />
                  <p className="text-lg">Start typing to search products</p>
                  <p className="text-sm mt-2">Search by name, category, description, or tags</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
