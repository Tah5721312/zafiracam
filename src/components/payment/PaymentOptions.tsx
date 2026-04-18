'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Smartphone, Truck, Shield, Wallet, Phone } from 'lucide-react';
import { useState } from 'react';

interface PaymentOptionsProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
}

export function PaymentOptions({ isOpen, onClose, total }: PaymentOptionsProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, American Express',
      color: 'from-blue-500 to-blue-600',
      link: 'https://payment-gateway.com/card' // Replace with actual payment gateway URL
    },
    {
      id: 'instapay',
      name: 'Instapay',
      icon: Wallet,
      description: 'Instant bank transfer',
      color: 'from-purple-500 to-purple-600',
      link: 'https://instapay.ng' // Replace with actual Instapay link
    },
    {
      id: 'vodafone',
      name: 'Vodafone Cash',
      icon: Phone,
      description: 'Mobile wallet payment',
      color: 'from-red-500 to-red-600',
      link: 'https://vodafonecash.com' // Replace with actual Vodafone Cash link
    },
    {
      id: 'mobile',
      name: 'Mobile Payment',
      icon: Smartphone,
      description: 'Apple Pay, Google Pay, Samsung Pay',
      color: 'from-green-500 to-green-600',
      link: 'https://mobile-payment.com' // Replace with actual mobile payment URL
    }
  ];

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    // Get the selected payment method
    const selectedPaymentMethod = paymentMethods.find(method => method.id === selectedMethod);
    
    if (selectedPaymentMethod?.link) {
      // Simulate brief processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to the payment method's link
      window.open(selectedPaymentMethod.link, '_blank');
    }
    
    setIsProcessing(false);
    onClose();
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
            initial={{ opacity: 0, scale: 0.95, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-gradient-to-b from-gray-900 to-black border border-gold-500/20 rounded-2xl shadow-2xl shadow-gold-500/10 z-10"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">Payment Options</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gold-500/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-6">
              {/* Order Summary */}
              <div className="mb-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Order Total:</span>
                  <span className="text-2xl font-bold text-gold-400">
                    EGP {total.toLocaleString('en-US')}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Truck className="w-4 h-4" />
                  <span>Free shipping on orders over EGP 1,000</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Select Payment Method</h3>
                <div className="space-y-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left relative overflow-hidden
                          ${selectedMethod === method.id
                            ? 'border-gold-500 bg-gradient-to-r from-gold-500/10 to-gold-600/10 shadow-lg shadow-gold-500/20'
                            : 'border-gray-700 bg-gray-800/30 hover:border-gray-600 hover:bg-gray-800/50'}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300
                            ${selectedMethod === method.id 
                              ? `bg-gradient-to-r ${method.color} text-white shadow-lg scale-110` 
                              : 'bg-gray-700 text-gray-300'}`}
                          >
                            <Icon className="w-7 h-7" />
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-bold text-lg transition-colors
                              ${selectedMethod === method.id ? 'text-white' : 'text-gray-200'}`}>
                              {method.name}
                            </h4>
                            <p className="text-sm text-gray-400">{method.description}</p>
                          </div>
                          <div className={`w-6 h-6 rounded-full border-2 transition-all duration-300
                            ${selectedMethod === method.id
                              ? 'border-gold-500 bg-gold-500'
                              : 'border-gray-600'}`}
                          >
                            {selectedMethod === method.id && (
                              <div className="w-full h-full rounded-full bg-obsidian-950 scale-50" />
                            )}
                          </div>
                        </div>
                        {selectedMethod === method.id && (
                          <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 to-gold-600/5 pointer-events-none" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Security Notice */}
              <div className="mb-6 p-3 bg-gray-800/30 rounded-lg border border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Shield className="w-4 h-4 text-gold-400" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 bg-gray-800 text-white rounded-xl font-medium
                           hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-gold-500 to-gold-600 
                           text-obsidian-950 rounded-xl font-bold tracking-wider
                           hover:from-gold-400 hover:to-gold-500 transition-all
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : 'Complete Order'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
