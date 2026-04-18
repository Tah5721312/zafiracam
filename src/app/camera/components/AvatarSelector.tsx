'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Avatar } from '../types';
import { Check } from 'lucide-react';

interface AvatarSelectorProps {
  avatars: Avatar[];
  selectedAvatar: Avatar;
  onSelect: (avatar: Avatar) => void;
}

export function AvatarSelector({ avatars, selectedAvatar, onSelect }: AvatarSelectorProps) {
  return (
    <div className="w-full">
      <h3 className="text-sm font-medium text-gold-300 mb-3 uppercase tracking-wider">
        Choose Avatar
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gold-500/30 scrollbar-track-transparent">
        {avatars.map((avatar, index) => (
          <motion.button
            key={avatar.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(avatar)}
            className={`
              relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden
              border-2 transition-all duration-300
              ${selectedAvatar.id === avatar.id 
                ? 'border-gold-400 shadow-lg shadow-gold-500/20' 
                : 'border-gold-500/20 hover:border-gold-500/50'
              }
            `}
          >
            <img
              src={avatar.image}
              alt={avatar.name}
              className="w-full h-full object-cover"
            />
            
            {/* Selected indicator */}
            {selectedAvatar.id === avatar.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1 right-1 w-5 h-5 bg-gold-500 rounded-full flex items-center justify-center"
              >
                <Check size={12} className="text-black" />
              </motion.div>
            )}
            
            {/* Name overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-1">
              <p className="text-[10px] text-gold-100 text-center truncate">
                {avatar.name}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
