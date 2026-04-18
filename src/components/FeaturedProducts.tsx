"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { products, categories as productCategories, getProductsByCategory } from "@/app/data/products";
import { useCart } from "@/contexts/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { FavoritesDrawer } from "@/components/favorites/FavoritesDrawer";
import { ProductModal } from "@/components/ProductModal";
import { VideoModal, VideoButton } from "@/components/VideoModal";
import type { Product } from "@/app/data/products";

// Use categories from products data file
const categories = productCategories.map(cat => ({
  id: cat.id,
  name: cat.nameEn
}));

export default function FeaturedProducts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  
  const videoUrl = 'https://res.cloudinary.com/dr8ivazek/video/upload/v1775922542/WhatsApp_Video_2026-04-11_at_9.56.59_AM_s7rag9.mp4';
  
  const { 
    state: { isCartOpen, isFavoritesOpen, items, favorites },
    addToCart, 
    removeFromCart, 
    updateQuantity,
    addToFavorites, 
    removeFromFavorites,
    toggleCart,
    toggleFavorites,
    isInCart,
    isInFavorites
  } = useCart();

  const filteredProducts = getProductsByCategory(activeCategory);

  return (
    <>
      <section ref={ref} id="collection" className="relative  bg-obsidian-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="mb-12">
              <span className="inline-block text-gold-400 text-sm tracking-[0.3em] uppercase mb-4">
                The Collection
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
                Featured <span className="text-gold-400">Pieces</span>
              </h2>
              
              <VideoButton 
                onClick={() => setIsVideoModalOpen(true)}
                className="mb-8"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    console.log('Clicked category:', cat.id);
                    setActiveCategory(cat.id);
                  }}
                  className={`px-4 py-2 text-sm tracking-wide transition-all duration-300 rounded-sm
                            ${activeCategory === cat.id 
                              ? "bg-gold-500 text-obsidian-950" 
                              : "bg-transparent text-gray-400 hover:text-gold-400 border border-gold-500/20"
                            }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            
            {/* Results Count */}
            <div className="text-center text-gray-400 text-sm mt-4">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} 
              {activeCategory !== 'all' && ` in ${categories.find(c => c.id === activeCategory)?.name}`}
            </div>
          </motion.div>

          {/* Products Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative bg-obsidian-900/30 border border-gold-500/10 
                              hover:border-gold-500/30 transition-all duration-500 overflow-hidden cursor-pointer"
                   onClick={() => {
                     setSelectedProduct(product);
                     setIsProductModalOpen(true);
                   }}>
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 bg-gold-500 text-obsidian-950 text-xs 
                                     tracking-wider uppercase font-medium">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Image Container */}
                  <div className="relative aspect-[3/4] overflow-hidden image-zoom bg-obsidian-800">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center hidden">
                      <span className="text-gold-500/20 text-6xl font-serif">Z</span>
                    </div>

                    {/* Quick Actions */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: hoveredProduct === product.id ? 1 : 1, 
                                y: hoveredProduct === product.id ? 0 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-4 left-4 right-4 flex gap-2 z-10 md:opacity-0 md:translate-y-5"
                      style={{ opacity: 1, transform: 'translateY(0)' }}
                    >
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        disabled={!product.inStock}
                        className={`flex-1 py-3 text-xs tracking-wider uppercase font-medium transition-colors flex items-center justify-center gap-2
                          ${product.inStock 
                            ? 'bg-gold-500 text-obsidian-950 hover:bg-gold-400' 
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
                      >
                        <ShoppingBag className="w-4 h-4" />
                        {product.inStock ? 'Add to Bag' : 'Out of Stock'}
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          isInFavorites(product.id) ? removeFromFavorites(product.id) : addToFavorites(product);
                        }}
                        className={`p-3 transition-all duration-300 border-2
                          ${isInFavorites(product.id) 
                            ? 'bg-red-500/30 text-red-400 hover:bg-red-500/40 border-red-500/50' 
                            : 'bg-gray-800/80 text-white hover:bg-gray-700 border-gray-600/50'}`}
                      >
                        <Heart className={`w-4 h-4 ${isInFavorites(product.id) ? 'fill-current' : ''}`} />
                      </button>
                    </motion.div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-serif text-lg text-white mb-1 group-hover:text-gold-400 
                                 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-gold-400 font-medium mb-3">
                      ${product.price.toLocaleString('en-US')}
                    </p>
                    
                    {/* Colors */}
                    {product.colors && product.colors.length > 0 && (
                      <div className="mb-2">
                        <div className="flex gap-1 flex-wrap">
                          {product.colors.slice(0, 3).map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full border border-gold-500/30"
                              title={color}
                              style={{
                                backgroundColor: color.toLowerCase() === 'black' ? '#000' :
                                               color.toLowerCase() === 'white' ? '#fff' :
                                               color.toLowerCase() === 'silver' ? '#C0C0C0' :
                                               color.toLowerCase() === 'gold' ? '#FFD700' :
                                               color.toLowerCase() === 'rose gold' ? '#E0BFB8' :
                                               color.toLowerCase() === 'navy' ? '#000080' :
                                               color.toLowerCase() === 'blue' ? '#0066CC' :
                                               color.toLowerCase() === 'light blue' ? '#87CEEB' :
                                               color.toLowerCase() === 'dark blue' ? '#00008B' :
                                               color.toLowerCase() === 'denim blue' ? '#1560BD' :
                                               color.toLowerCase() === 'light wash' ? '#B0C4DE' :
                                               color.toLowerCase() === 'dark wash' ? '#191970' :
                                               color.toLowerCase() === 'laser blue' ? '#00BFFF' :
                                               color.toLowerCase() === 'burgundy' ? '#800020' :
                                               color.toLowerCase() === 'brown' ? '#8B4513' :
                                               '#666'
                              }}
                            />
                          ))}
                          {product.colors.length > 3 && (
                            <span className="text-xs text-gray-400 ml-1">+{product.colors.length - 3}</span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Sizes */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div className="text-xs text-gray-400">
                        {product.sizes.includes('One Size') ? (
                          <span>One Size</span>
                        ) : (
                          <span>Sizes: {product.sizes.join(', ')}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        
        </div>
      </section>
      
      {/* Cart and Favorites Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => toggleCart(false)}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />
      
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => toggleFavorites(false)}
        items={favorites}
        onRemoveItem={removeFromFavorites}
        onAddToCart={addToCart}
      />
      
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        product={selectedProduct}
        onAddToCart={addToCart}
        onAddToFavorites={addToFavorites}
        onRemoveFromFavorites={removeFromFavorites}
        isInFavorites={isInFavorites}
      />
      
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={videoUrl}
      />
    </>
  );
}
