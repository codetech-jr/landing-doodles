// app/components/PricingSection.tsx

// 1. Añadimos la directiva para convertirlo en un Componente de Cliente.
"use client";

import React, { useRef } from 'react';
// 2. Importamos las herramientas de Framer Motion.
import { motion, useInView, Variants } from 'framer-motion';
import { Check, PawPrint } from 'lucide-react';

const packagesData = [
  {
    title: "Essential Groom",
    price: 89,
    description: "All the essentials to keep your doodle fresh and clean.",
    features: [
      "Luxurious Bath & Blow Dry",
      "Nail Trim & Filing",
      "Ear Cleaning",
      "Basic Brush Out"
    ],
    isPopular: false
  },
  {
    title: "Luxury Groom",
    price: 129,
    description: "Our most popular package for a complete makeover.",
    features: [
      "Everything in Essential",
      "Full Haircut & Signature Style",
      "Paw & Pad Conditioning",
      "Teeth Brushing"
    ],
    isPopular: true
  },
  {
    title: "Premium Spa",
    price: 169,
    description: "The ultimate pampering experience for your VIP.",
    features: [
      "Everything in Luxury",
      "Deep-Coat Conditioning Mask",
      "Aromatherapy Rinse",
      "Premium Bow or Bandana"
    ],
    isPopular: false
  }
];

// 3. Definimos las variantes de animación
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

const cardVariants: Variants = { // <-- Añadimos el tipo aquí
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

const PricingSection = () => {
  // 4. Configuramos la detección de visibilidad
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="py-20 px-6"
      style={{ background: "linear-gradient(135deg, var(--brand-light-beige) 0%, #fff 100%)" }}
      id="pricing"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold" style={{ color: 'var(--brand-text-dark)' }}>
            Choose Your Doodle&#39;s Spa Package
          </h2>
          <p className="font-sans text-lg mt-4 max-w-3xl mx-auto" style={{ color: 'var(--brand-text-dark)', opacity: 0.8 }}>
            Simple, transparent pricing. No hidden fees.
          </p>
        </motion.div>

        {/* 5. Aplicamos las variantes al contenedor del grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {packagesData.map((pkg, index) => (
            // 6. Cada tarjeta es un motion.div que usa las variantes del hijo
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }} // Efecto de elevación para todas las tarjetas
              transition={{ type: 'spring', stiffness: 300 }}
              className={`
                relative rounded-3xl p-8 shadow-lg flex flex-col h-full
                bg-brand-cream
                ${pkg.isPopular ? 'border-2 border-brand-gold scale-105 z-10' : 'border border-brand-brown/10'}
              `}
              style={{ boxShadow: pkg.isPopular ? '0 8px 32px 0 rgba(218, 165, 32, 0.18)' : undefined }}
            >
              {pkg.isPopular && (
                // 7. Animación especial para la insignia "MOST POPULAR"
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -25 }}
                  animate={{ opacity: 1, scale: 1, rotate: -6 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10, delay: 0.6 }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2 px-5 py-1 rounded-full font-sans font-bold text-sm"
                  style={{
                    background: 'linear-gradient(90deg, var(--brand-accent-gold) 0%, #ffd700 100%)',
                    color: 'var(--brand-cta-brown)',
                    boxShadow: '0 2px 8px 0 rgba(218, 165, 32, 0.15)'
                  }}
                >
                  MOST POPULAR
                </motion.div>
              )}

              <h3 className="font-serif text-2xl font-bold mb-1" style={{ color: 'var(--brand-text-dark)' }}>{pkg.title}</h3>
              <p className="font-sans mt-2 mb-2" style={{ color: 'var(--brand-text-dark)', opacity: 0.8 }}>{pkg.description}</p>
              <p className="font-serif text-5xl font-extrabold my-6" style={{ color: 'var(--brand-text-dark)' }}>
                ${pkg.price}
                <span className="text-lg font-normal" style={{ color: 'var(--brand-text-dark)', opacity: 0.7 }}> / session</span>
              </p>
              <div className="border-t my-4" style={{ borderColor: 'rgba(75, 63, 54, 0.2)' }}></div>
              <ul className="space-y-0 font-sans divide-y" style={{ color: 'var(--brand-text-dark)', opacity: 0.9, borderColor: 'rgba(75, 63, 54, 0.1)' }}>
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start py-3 first:pt-0 last:pb-0">
                    <Check className="w-5 h-5 mr-3 flex-shrink-0 mt-1" style={{ color: 'var(--brand-accent-gold)' }} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* 8. Convertimos el botón en un motion.button para animaciones de hover y tap */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className={`
                  mt-auto w-full py-3 rounded-lg font-bold font-sans text-lg flex items-center justify-center gap-2
                  ${pkg.isPopular
                    ? 'bg-brand-gold text-brand-brown hover:bg-yellow-500 shadow-md'
                    : 'bg-brand-cream text-[var(--brand-text-dark)] hover:bg-[var(--brand-accent-gold)] hover:text-[var(--brand-cta-brown)]'}
                  hover:shadow-lg
                `}
              >
                <PawPrint className="w-6 h-6" />
                Choose {pkg.title.split(' ')[0]}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;