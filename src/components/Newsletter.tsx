"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Check } from "lucide-react";

export default function Newsletter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <section ref={ref} className="relative py-32 bg-obsidian-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #c99a2e 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-gold-400 text-sm tracking-[0.3em] uppercase mb-4">
            Stay Connected
          </span>

          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
            Join the <span className="text-gold-400">Inner Circle</span>
          </h2>

          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Be the first to discover new collections, exclusive offers, and the stories 
            behind our most iconic pieces. Elegance delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
            <div className="relative flex items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-6 py-4 bg-obsidian-950 border border-gold-500/30 
                         text-white placeholder-gray-500 focus:outline-none focus:border-gold-500
                         transition-colors pr-14"
                required
              />
              <button
                type="submit"
                disabled={isSubmitted}
                className="absolute right-2 p-2 bg-gold-500 text-obsidian-950 
                         hover:bg-gold-400 transition-colors disabled:opacity-70"
              >
                {isSubmitted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>

            {isSubmitted && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-gold-400 text-sm"
              >
                Welcome to the Zafira family. Check your inbox for confirmation.
              </motion.p>
            )}
          </form>

          <p className="mt-6 text-gray-500 text-xs">
            By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
