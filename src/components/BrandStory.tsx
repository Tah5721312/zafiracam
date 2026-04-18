"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function BrandStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 bg-obsidian-950 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      w-[800px] h-[800px] rounded-full bg-gold-500/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              {/* Main Image */}
              <Image
                src="/images/packiging/1.jpeg"
                alt="ZAFIRA Brand"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-gold-900/20 to-obsidian-900/30" />

              {/* Frame */}
              <div className="absolute inset-4 border border-gold-500/20" />
              <div className="absolute inset-8 border border-gold-500/10" />

              {/* Corner Accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold-500" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold-500" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-gold-500" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold-500" />
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-8 -right-8 w-40 h-40 bg-gold-500 rounded-full 
                        flex items-center justify-center shadow-2xl shadow-gold-500/20"
            >
              <div className="text-center text-obsidian-950">
                <span className="block text-3xl font-serif font-bold">Est.</span>
                <span className="block text-lg tracking-wider">2026</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block text-gold-400 text-sm tracking-[0.3em] uppercase mb-4">
              Our Story
            </span>

            <h2 className="font-serif text-4xl md:text-5xl text-white mb-8 leading-tight">
              The Triumph of <span className="text-gold-400">Spirit</span>
            </h2>

            <div className="space-y-6 text-gray-400 leading-relaxed">
              <p>
                In the heart of a city teeming with clamor and rapid consumption, where trends 
                are forgotten before the inks of their magazines dry, "Zafira" was born. It was 
                not mere branding; it was a promise of victory: the triumph of spirit over and 
                of eternal beauty over fleeting transience.
              </p>
              <p>
                Our name draws from the Arabic "Zafir," meaning victorious. The peacock, our 
                eternal muse, represents not just beauty, but the confidence to display one's 
                true colors without apology. Each piece we create is a testament to this philosophy 
                — garments that empower, that transform, that make every woman feel unstoppable.
              </p>
              <p>
                From the initial sketch to the final stitch, every Zafira piece is crafted with 
                meticulous attention to detail. We source only the finest materials — Italian 
                leather, Japanese denim, French lace — and work with master artisans who share 
                our vision of timeless luxury.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-gold-500/20">
              {[
                { value: "50+", label: "Artisan Partners" },
                { value: "12", label: "Countries" },
                { value: "100%", label: "Handcrafted" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <span className="block text-3xl font-serif text-gold-400 mb-1">
                    {stat.value}
                  </span>
                  <span className="text-sm text-gray-500 tracking-wider uppercase">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
