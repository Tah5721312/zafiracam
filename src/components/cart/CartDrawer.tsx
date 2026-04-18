'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import type { Product } from '@/app/data/products';
import { useEffect, useState } from 'react';
import { PaymentOptions } from '@/components/payment/PaymentOptions';

interface CartItem extends Product {
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

export function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartDrawerProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

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
    <>
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
                <ShoppingBag className="w-6 h-6 text-red-600" />
                <h2 className="text-xl font-bold text-white horror-font">Shopping Cart</h2>
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
                  <ShoppingBag className="w-20 h-20 mx-auto text-gray-700 mb-4" />
                  <h3 className="text-xl text-gray-400 horror-font mb-2">
                    Cart is empty
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
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-900/50 transition-colors"
                            >
                              <Minus className="w-3 h-3 text-white" />
                            </button>
                            <span className="text-white w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-900/50 transition-colors"
                            >
                              <Plus className="w-3 h-3 text-white" />
                            </button>
                          </div>

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

            {items.length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800 bg-gray-900/95 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400">Total:</span>
                  <span className="text-2xl font-bold text-white horror-font">
                    EGP {total}
                  </span>
                </div>
                <button
                  onClick={() => setIsPaymentOpen(true)}
                  className="w-full py-4 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl text-obsidian-950 font-bold tracking-wider hover:from-gold-400 hover:to-gold-500 transition-all"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>

    <PaymentOptions
      isOpen={isPaymentOpen}
      onClose={() => setIsPaymentOpen(false)}
      total={total}
    />
    </>
  );
}
