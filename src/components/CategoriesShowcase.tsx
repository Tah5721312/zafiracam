"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    id: "gold-plated",
    name: "Gold Plated",
    description: "Exquisite gold-plated jewelry featuring our signature peacock design. Each piece radiates luxury and timeless elegance.",
    image: "/images/HIGHLITS/Accessories/GOLD%20PLATED%20PEACOCK%20STUDS.jpg",
    count: 12,
  },
  {
    id: "crystals",
    name: "Crystals",
    description: "Brilliant crystal pieces that capture light beautifully. Stunning blue crystals set in gold-plated settings.",
    image: "/images/HIGHLITS/Accessories/BLUE%20CRYSTALS.jpg",
    count: 8,
  },
  {
    id: "enamel",
    name: "Enamel Collection",
    description: "Vibrant enamel artistry meets gold plating. Bold colors and intricate designs for the modern sophisticate.",
    image: "/images/HIGHLITS/Accessories/ENAMEL%20GOLD%20PLATED%20BUTTON%20SIGNET%20RING.jpg",
    count: 10,
  },
];

export default function CategoriesShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 bg-obsidian-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold-500/5 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-gold-400 text-sm tracking-[0.3em] uppercase mb-4">
            Categories
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Shop by <span className="text-gold-400">Material</span>
          </h2>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative"
            >
              <div className="relative h-[500px] overflow-hidden">
                {/* Image */}
                <div className="absolute inset-0 bg-obsidian-800">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-obsidian-900/40" />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/50 to-transparent 
                              opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Border */}
                <div className="absolute inset-0 border border-gold-500/0 group-hover:border-gold-500/30 
                              transition-colors duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-gold-400 text-xs tracking-[0.2em] uppercase">
                        {category.count} Items
                      </span>
                    </div>

                    <h3 className="font-serif text-3xl text-white mb-3 group-hover:text-gold-400 
                                 transition-colors duration-300">
                      {category.name}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 
                                transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      {category.description}
                    </p>

                    <a 
                      href="#collection"
                      className="inline-flex items-center gap-2 text-gold-400 text-sm tracking-wider uppercase 
                               group-hover:gap-4 transition-all duration-300"
                    >
                      Explore
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </motion.div>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                  <div className="absolute top-0 right-0 w-[1px] h-12 bg-gradient-to-b from-gold-500/50 to-transparent 
                                transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 delay-100" />
                  <div className="absolute top-0 right-0 h-[1px] w-12 bg-gradient-to-l from-gold-500/50 to-transparent 
                                transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
