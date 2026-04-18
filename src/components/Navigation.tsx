"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ShoppingBag,  ChevronDown, Heart } from "lucide-react";
import Image from "next/image";
import SearchModal from "./SearchModal";
import { useCart } from "@/contexts/CartContext";

interface MegaMenuSubItem {
  name: string;
  href: string;
  image?: string;
}

interface MegaMenuSection {
  title: string;
  items: MegaMenuSubItem[];
}

interface NavItem {
  name: string;
  href: string;
  megaMenu?: {
    highlight: MegaMenuSection;
    highIn: MegaMenuSection;
  };
}

const navItems: NavItem[] = [
  {
    name: "Home",
    href: "#"
  },
  { name: "shop", href: "#collection" },
  { name: "About", href: "#" },
  { name: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  
  const { cartItemCount, toggleCart, toggleFavorites, state: { favorites } } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-obsidian-950/95 backdrop-blur-md border-b border-gold-500/10" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a 
              href="/"
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative w-12 h-12">
                <Image
                  src="/images/logo.png"
                  alt="ZAFIRA"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-serif text-2xl text-gold-400 tracking-wider">
                ZAFIRA
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.megaMenu && setActiveMegaMenu(item.name)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  {item.name === "About" ? (
                    <button
                      onClick={() => setIsAboutModalOpen(true)}
                      className="flex items-center gap-1 text-sm tracking-[0.15em] uppercase text-gray-300 
                               hover:text-gold-400 transition-colors duration-300 py-2"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className="flex items-center gap-1 text-sm tracking-[0.15em] uppercase text-gray-300 
                               hover:text-gold-400 transition-colors duration-300 py-2"
                    >
                      {item.name}
                      {item.megaMenu && <ChevronDown className="w-4 h-4" />}
                    </a>
                  )}

                  {/* Mega Menu */}
                  <AnimatePresence>
                    {item.megaMenu && activeMegaMenu === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 pt-4"
                      >
                        <div className="bg-obsidian-950/98 backdrop-blur-xl border border-gold-500/20 
                                      shadow-2xl shadow-gold-500/10 rounded-sm overflow-hidden min-w-[600px]">
                          <div className="grid grid-cols-2 gap-8 p-8">
                            {/* Highlight Section */}
                            <div>
                              <h3 className="text-gold-400 text-xs tracking-[0.3em] uppercase mb-4">
                                {item.megaMenu.highlight.title}
                              </h3>
                              <div className="space-y-3">
                                {item.megaMenu.highlight.items.map((subItem) => (
                                  <a
                                    key={subItem.name}
                                    href={subItem.href}
                                    className="group flex items-center gap-4 p-3 rounded-sm
                                             hover:bg-gold-500/10 transition-all duration-300"
                                  >
                                    <div className="relative w-16 h-16 rounded-sm overflow-hidden">
                                      <Image
                                        src={subItem.image || "/images/placeholder.jpg"}
                                        alt={subItem.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                      />
                                    </div>
                                    <span className="text-gray-300 group-hover:text-gold-400 
                                                   transition-colors text-sm tracking-wide">
                                      {subItem.name}
                                    </span>
                                  </a>
                                ))}
                              </div>
                            </div>

                            {/* High In Section */}
                            <div>
                              <h3 className="text-gold-400 text-xs tracking-[0.3em] uppercase mb-4">
                                {item.megaMenu.highIn.title}
                              </h3>
                              <div className="space-y-2">
                                {item.megaMenu.highIn.items.map((subItem) => (
                                  <a
                                    key={subItem.name}
                                    href={subItem.href}
                                    className="block py-2 text-gray-400 hover:text-gold-400 
                                             transition-colors text-sm tracking-wide
                                             border-b border-gold-500/10 last:border-0"
                                  >
                                    {subItem.name}
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-400 hover:text-gold-400 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
          
              <button 
                onClick={() => toggleCart(true)}
                className="p-2 text-gray-400 hover:text-gold-400 transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold-500 text-obsidian-950 
                                 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <button 
                onClick={() => toggleFavorites(true)}
                className="p-2 text-gray-400 hover:text-gold-400 transition-colors relative"
              >
                <Heart className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white 
                                 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-400 hover:text-gold-400 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-obsidian-950/98 backdrop-blur-xl" />
            <div className="relative h-full flex flex-col pt-24 px-6">
              <nav className="space-y-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.name === "About" ? (
                      <button
                        className="block text-2xl font-serif text-white hover:text-gold-400 
                                 transition-colors tracking-wide"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsAboutModalOpen(true);
                        }}
                      >
                        {item.name}
                      </button>
                    ) : (
                      <a
                        href={item.href}
                        className="block text-2xl font-serif text-white hover:text-gold-400 
                                 transition-colors tracking-wide"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    )}
                    {item.megaMenu && (
                      <div className="mt-4 ml-4 space-y-3">
                        <p className="text-gold-500 text-xs tracking-[0.2em] uppercase">
                          {item.megaMenu.highlight.title}
                        </p>
                        {item.megaMenu.highlight.items.map((sub) => (
                          <a
                            key={sub.name}
                            href={sub.href}
                            className="block text-gray-400 hover:text-gold-400 transition-colors"
                          >
                            {sub.name}
                          </a>
                        ))}
                        <p className="text-gold-500 text-xs tracking-[0.2em] uppercase mt-4">
                          {item.megaMenu.highIn.title}
                        </p>
                        {item.megaMenu.highIn.items.map((sub) => (
                          <a
                            key={sub.name}
                            href={sub.href}
                            className="block text-gray-400 hover:text-gold-400 transition-colors"
                          >
                            {sub.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* About Modal */}
      <AnimatePresence>
        {isAboutModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div 
              className="absolute inset-0 bg-obsidian-950/90 backdrop-blur-md"
              onClick={() => setIsAboutModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative bg-obsidian-900 border border-gold-500/30 rounded-lg overflow-hidden max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-obsidian-900 border-b border-gold-500/20 p-6 flex items-center justify-between">
                <h2 className="font-serif text-2xl text-gold-400 tracking-wider">
                  About ZAFIRA
                </h2>
                <button
                  onClick={() => setIsAboutModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gold-400 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                {/* Brand Logo */}
                <div className="flex justify-center mb-8">
                  <div className="relative w-24 h-24">
                    <Image
                      src="/images/logo.png"
                      alt="ZAFIRA"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Brand Story */}
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    <span className="text-gold-400 font-medium">ZAFIRA</span> is a luxury Egyptian brand 
                    specializing in exquisite gold-plated jewelry that combines traditional craftsmanship 
                    with contemporary elegance. Founded with a passion for timeless beauty, we create 
                    pieces that tell stories of sophistication and heritage.
                  </p>
                  <p>
                    Each piece in our collection is meticulously crafted using premium materials and 
                    18K gold plating techniques, ensuring lasting shine and exceptional quality. Our 
                    designs draw inspiration from Egypt&apos;s rich cultural legacy while embracing modern 
                    aesthetics.
                  </p>
                  <p>
                    At ZAFIRA, we believe jewelry is more than an accessory—it is an expression of 
                    individuality, a celebration of special moments, and a legacy to be cherished. 
                    From everyday elegance to statement pieces for grand occasions, our collections 
                    are designed to complement every facet of your life.
                  </p>
                </div>

                {/* Values */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gold-500/20">
                  <div className="text-center">
                    <div className="text-gold-400 text-2xl mb-2">✦</div>
                    <h4 className="text-white font-medium text-sm mb-1">Quality</h4>
                    <p className="text-gray-400 text-xs">Premium materials</p>
                  </div>
                  <div className="text-center">
                    <div className="text-gold-400 text-2xl mb-2">✦</div>
                    <h4 className="text-white font-medium text-sm mb-1">Craftsmanship</h4>
                    <p className="text-gray-400 text-xs">Handmade excellence</p>
                  </div>
                  <div className="text-center">
                    <div className="text-gold-400 text-2xl mb-2">✦</div>
                    <h4 className="text-white font-medium text-sm mb-1">Heritage</h4>
                    <p className="text-gray-400 text-xs">Egyptian tradition</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
