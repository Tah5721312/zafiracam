'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const sizeGuides = [
  { id: 'clothes-lable', name: 'clothes-lable', image: '/clothes-lable.jpeg' },
  { id: 'clothes-zise', name: 'clothes-zise', image: '/clothes-zise.jpeg' },
  { id: 'shoes-size', name: 'shoes-size', image: '/shoes-size.jpeg' },
];

export function SizeGuide() {
  const [selectedGuide, setSelectedGuide] = useState<typeof sizeGuides[0] | null>(null);

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {sizeGuides.map((guide, index) => (
        <motion.button
          key={guide.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.5 }}
          onClick={() => setSelectedGuide(guide)}
          className="group relative px-6 py-3 bg-obsidian-900/50 border border-gold-500/20 
                     text-gold-400 text-xs tracking-[0.2em] uppercase font-medium
                     hover:border-gold-500/50 hover:bg-gold-500/5 transition-all duration-500
                     flex items-center gap-3 rounded-sm overflow-hidden"
        >
          <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center
                          group-hover:bg-gold-500 group-hover:text-obsidian-950 transition-colors duration-500">
            <Ruler className="w-4 h-4" />
          </div>
          
          <span className="relative z-10">{guide.name}</span>
          
          <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          
          {/* Decorative line */}
          <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-500 group-hover:w-full transition-all duration-500" />
        </motion.button>
      ))}

      <AnimatePresence>
        {selectedGuide && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-obsidian-950/95 backdrop-blur-md"
              onClick={() => setSelectedGuide(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-4xl bg-obsidian-900 border border-gold-500/10 
                         shadow-2xl shadow-gold-500/5 rounded-2xl overflow-hidden z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gold-500/10 bg-obsidian-900/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center">
                    <Ruler className="w-5 h-5 text-gold-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-serif text-xl tracking-wider uppercase">
                      {selectedGuide.name}
                    </h3>
                    <p className="text-gold-500/60 text-[10px] tracking-[0.2em] uppercase">Size & Reference Guide</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedGuide(null)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 
                             hover:bg-gold-500/10 hover:text-gold-400 transition-all duration-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Image Content */}
              <div className="relative w-full h-[60vh] md:h-[75vh] bg-obsidian-950 overflow-auto p-4 md:p-8 flex justify-center items-start">
                <div className="relative w-full h-full min-h-[400px]">
                  <Image
                    src={selectedGuide.image}
                    alt={selectedGuide.name}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              
              {/* Footer */}
              <div className="p-4 bg-obsidian-900/80 border-t border-gold-500/10 text-center">
                <p className="text-gray-500 text-xs tracking-widest uppercase">
                  © ZAFIRA EXCLUSIVE COLLECTION
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
