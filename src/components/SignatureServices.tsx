// app/components/SignatureServices.tsx

// 1. Añadimos la directiva "use client" para poder usar hooks de cliente.
"use client";

import React, { useRef } from 'react';
// 2. Importamos las herramientas de Framer Motion.
import { motion, useInView } from 'framer-motion';
import { Bath, Scissors, PawPrint, Leaf } from 'lucide-react';

const services = [
  {
    icon: <Bath size={48} className="text-brand-gold" />,
    title: "Luxurious Cleansing",
    description: "A gentle, hypoallergenic bath followed by a specialized fluff-drying technique to maximize volume and softness."
  },
  {
    icon: <Scissors size={48} className="text-brand-gold" />,
    title: "The Signature 'Doodle' Cut",
    description: "From the 'Teddy Bear' look to a custom style, our experts execute the perfect cut that complements your doodle's features."
  },
  {
    icon: <PawPrint size={48} className="text-brand-gold" />,
    title: "Paws, Ears & Nails Care",
    description: "Meticulous nail trimming, ear cleaning, and paw pad conditioning for their comfort and health."
  },
  {
    icon: <Leaf size={48} className="text-brand-gold" />,
    title: "All-Natural Conditioning",
    description: "A luxurious, all-natural conditioning treatment to detangle, nourish the coat, and leave it incredibly smooth and shiny."
  }
];

// 3. Definimos las variantes para el contenedor de tarjetas y cada tarjeta.
const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25 // Un poco más rápido que antes, se ajusta bien a 4 elementos
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const SignatureServices = () => {
  // 4. Configuramos la detección de visibilidad en scroll.
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    // Asignamos la referencia al contenedor principal de la sección.
    <section ref={ref} className="bg-brand-light-beige text-brand-brown py-20 px-6" id="services">
      <div className="container mx-auto max-w-7xl">
        
        {/* 5. Animamos los elementos del título con un retraso secuencial */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-bold"
          >
            Our Signature Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-sans text-lg mt-4 max-w-3xl mx-auto text-brand-brown/80"
          >
            Every step of our process is designed with your Golden Doodle in mind.
          </motion.p>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: "circOut" }}
            className="w-24 h-1 bg-brand-gold mx-auto mt-6 rounded"
            style={{ transformOrigin: 'center' }} // Asegura que la escala sea desde el centro
          />
        </div>

        {/* 6. Convertimos el grid en un motion.div y aplicamos las variantes */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={gridContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            // 7. Cada tarjeta es un motion.div que hereda la animación del padre
            <motion.div 
              key={index} 
              variants={cardVariants}
              // 8. Reemplazamos las clases de hover de Tailwind por `whileHover`
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="
                bg-brand-cream p-8 rounded-xl shadow-lg 
                text-center flex flex-col items-center
                group // Mantenemos 'group' para la animación del subrayado en el h3
              "
            >
              <div className="mb-6">
                {service.icon}
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3 relative transition-colors duration-300 group-hover:text-brand-gold after:content-[''] after:block after:w-0 after:h-1 after:bg-brand-gold after:transition-all after:duration-300 group-hover:after:w-full after:absolute after:left-0 after:-bottom-1">
                {service.title}
              </h3>
              <p className="font-sans text-base leading-relaxed text-brand-brown">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default SignatureServices;