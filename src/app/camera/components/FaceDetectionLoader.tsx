'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface FaceDetectionLoaderProps {
  isLoading: boolean;
  error: string | null;
}

export function FaceDetectionLoader({ isLoading, error }: FaceDetectionLoaderProps) {
  if (!isLoading && !error) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="bg-black/80 backdrop-blur-md border border-gold-500/30 rounded-full px-6 py-3 flex items-center gap-3">
        {isLoading && (
          <>
            <Loader2 size={18} className="text-gold-400 animate-spin" />
            <span className="text-gold-300 text-sm">Loading face detection models...</span>
          </>
        )}
        {error && (
          <span className="text-red-400 text-sm">{error}</span>
        )}
      </div>
    </motion.div>
  );
}
