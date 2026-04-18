"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Gift, Scroll, Package, Mail } from "lucide-react";

const unboxingStages = [
  {
    icon: Gift,
    title: "Premium Exterior",
    description: "A soft-touch matte black rigid box finished with metallic gold foil logo and tied with a wide, architectural gold satin bow.",
    image: "/images/unboxing-1.jpg",
  },
  {
    icon: Scroll,
    title: "The Manifesto",
    description: "Opening the lid reveals a translucent vellum sheet featuring the brand's origin story, building anticipation through a physical veil.",
    image: "/images/unboxing-2.jpg",
  },
  {
    icon: Package,
    title: "Garment Protection",
    description: "The clothing is wrapped in black silk tissue paper, secured by a gold peacock wax-style seal, and cushioned by black textured shred.",
    image: "/images/unboxing-3.jpg",
  },
  {
    icon: Mail,
    title: "Elegant Documentation",
    description: "High-end touchpoints like a metallic gold envelope and silk-corded hang tags ensure that even functional elements feel like luxury stationery.",
    image: "/images/unboxing-4.jpg",
  },
];

export default function UnboxingExperience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 bg-obsidian-950 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50c0-27.614-22.386-50-50-50s-50 22.386-50 50 22.386 50 50 50 50-22.386 50-50zm0 0c0 27.614 22.386 50 50 50s50-22.386 50-50-22.386-50-50-50-50 22.386-50 50z' fill='%23c99a2e' fill-opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }} />
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
            The Experience
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            The <span className="text-gold-400">Unboxing</span> Ritual
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            A refined, four-stage process that prioritizes tactile luxury and emotional storytelling. 
            Transforming a simple purchase into a "triumph of spirit" through high-contrast colors and sophisticated materials.
          </p>
        </motion.div>

        {/* Unboxing Stages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {unboxingStages.map((stage, index) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="relative bg-obsidian-900/50 border border-gold-500/10 rounded-sm overflow-hidden
                            hover:border-gold-500/30 transition-all duration-500 luxury-card">
                {/* Stage Number */}
                <div className="absolute top-4 right-4 w-8 h-8 border border-gold-500/30 rounded-full 
                              flex items-center justify-center">
                  <span className="text-gold-400 text-sm font-serif">{index + 1}</span>
                </div>

                {/* Image */}
                <div className="relative h-48 overflow-hidden image-zoom">
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 to-transparent z-10" />
                  <div className="w-full h-full bg-gradient-to-br from-gold-900/20 to-obsidian-800 
                                flex items-center justify-center">
                    <stage.icon className="w-16 h-16 text-gold-500/30" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-serif text-xl text-white mb-3 group-hover:text-gold-400 
                               transition-colors duration-300">
                    {stage.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                {/* Hover Line */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-gold-500 to-gold-300
                              group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

   
      </div>
    </section>
  );
}
