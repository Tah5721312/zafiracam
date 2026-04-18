"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const icons = [
  { id: 1, x: "10%", y: "20%", delay: 0 },
  { id: 2, x: "85%", y: "15%", delay: 0.5 },
  { id: 3, x: "15%", y: "80%", delay: 1 },
  { id: 4, x: "80%", y: "85%", delay: 1.5 },
  { id: 5, x: "25%", y: "50%", delay: 2 },
  { id: 6, x: "70%", y: "45%", delay: 2.5 },
  { id: 7, x: "5%", y: "35%", delay: 3 },
  { id: 8, x: "90%", y: "60%", delay: 3.5 },
];

export default function FloatingIcons() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {icons.map((icon) => (
        <motion.div
          key={icon.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0.8, 1, 0.8],
            scale: [0, 1, 1.1, 1, 1.1],
            y: [0, -20, 0, -10, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: icon.delay,
            ease: "easeInOut"
          }}
          style={{
            position: "fixed",
            left: icon.x,
            top: icon.y,
            zIndex: 100
          }}
          >
            <Image
              src="/images/backgroundicons.png"
              alt="Floating Icon"
              width={70}
              height={70}
              className="object-contain opacity-60"
            />
          </motion.div>
      ))}
    </div>
  );
}
