'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';
import { useState } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

export function VideoModal({ isOpen, onClose, videoUrl }: VideoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-black rounded-2xl shadow-2xl z-10 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-gold-500/20 transition-colors z-20 border border-gold-500/20"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Video Container */}
            <div className="relative w-full aspect-video">
              <video
                className="w-full h-full object-contain"
                controls
                autoPlay
                playsInline
                muted={false}
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Video Info */}
            <div className="p-6 bg-gradient-to-b from-gray-900 to-black border-t border-gold-500/20">
              <h3 className="text-xl font-bold text-white mb-2">ZAFIRA Collection</h3>
              <p className="text-gray-400">
                Experience the elegance and beauty of our latest collection
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Video Button Component
interface VideoButtonProps {
  onClick: () => void;
  className?: string;
}

export function VideoButton({ onClick, className = "" }: VideoButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 
                 text-obsidian-950 font-bold tracking-wider uppercase rounded-xl
                 hover:from-gold-400 hover:to-gold-500 transition-all duration-300
                 shadow-lg shadow-gold-500/30 hover:shadow-xl hover:shadow-gold-500/40
                 transform hover:scale-105 ${className}`}
    >
      <div className="flex items-center justify-center gap-3">
        <motion.div
          animate={{
            scale: isHovered ? 1.2 : 1,
            rotate: isHovered ? 360 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <Play className="w-5 h-5 fill-current" />
        </motion.div>
        <span>Watch Collection</span>
      </div>
      
      {/* Hover Effect */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />
    </button>
  );
}
