"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Truck,
  ShieldCheck,
  RotateCcw
} from "lucide-react";

const footerLinks = {
  shop: [
    { name: "New Arrivals", href: "#" },
    { name: "Dresses", href: "#" },
    { name: "Shoes", href: "#" },
    { name: "Bags", href: "#" },
    { name: "Accessories", href: "#" },
    { name: "Sale", href: "#" },
  ],
  help: [
    { name: "Contact Us", href: "#" },
    { name: "FAQs", href: "#" },
    { name: "Shipping & Returns", href: "#" },
    { name: "Size Guide", href: "#" },
    { name: "Track Order", href: "#" },
    { name: "Gift Cards", href: "#" },
  ],
  company: [
    { name: "Our Story", href: "#" },
    { name: "Sustainability", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Affiliates", href: "#" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

const features = [
  { icon: Truck, title: "Complimentary Shipping", desc: "On all orders over $500" },
  { icon: ShieldCheck, title: "Secure Payment", desc: "100% secure checkout" },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
  { icon: CreditCard, title: "Gift Packaging", desc: "Complimentary on all orders" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-obsidian-950 border-t border-gold-500/10">
      {/* Features Bar */}
      <div className="border-b border-gold-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4"
              >
                <feature.icon className="w-6 h-6 text-gold-400 flex-shrink-0" />
                <div>
                  <h4 className="text-white text-sm font-medium mb-1">{feature.title}</h4>
                  <p className="text-gray-500 text-xs">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12">
                <Image
                  src="/images/logo.png"
                  alt="ZAFIRA"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-serif text-2xl text-gold-400 tracking-wider">
                ZAFIRA
              </span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Elegance is the ultimate victory. Discover luxury womenswear where 
              eternal beauty meets fleeting transience.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-gold-400 
                                    transition-colors text-sm">
                <MapPin className="w-4 h-4" />
                <span>Banha</span>
              </a>
              <a href="tel:+33123456789" className="flex items-center gap-3 text-gray-400 
                                                     hover:text-gold-400 transition-colors text-sm">
                <Phone className="w-4 h-4" />
                <span>01201614241</span>
              </a>
              <a href="mailto:concierge@zafira.com" className="flex items-center gap-3 text-gray-400 
                                                               hover:text-gold-400 transition-colors text-sm">
                <Mail className="w-4 h-4" />
                <span>contact@zafira.com</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 border border-gold-500/20 rounded-full flex items-center 
                           justify-center text-gray-400 hover:text-gold-400 hover:border-gold-400 
                           transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-white font-medium mb-6 text-sm tracking-wider uppercase">
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-gold-400 transition-colors text-sm 
                             animated-underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 text-sm tracking-wider uppercase">
              Help
            </h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-gold-400 transition-colors text-sm 
                             animated-underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 text-sm tracking-wider uppercase">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-gold-400 transition-colors text-sm 
                             animated-underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gold-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">
              © 2026 ZAFIRA. All rights reserved. Made with excellence in Italy.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-gold-400 transition-colors text-xs">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-gold-400 transition-colors text-xs">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-gold-400 transition-colors text-xs">
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
