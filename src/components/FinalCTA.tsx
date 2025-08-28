// app/components/FinalCTA.tsx

// 1. Añadimos la directiva "use client".
"use client";

import React, { useRef } from 'react';
// 2. Importamos las herramientas de Framer Motion.
import { motion, useInView } from 'framer-motion';

const FinalCTA = () => {
    // 3. Configuramos la detección de visibilidad.
    const ref = useRef(null);
    // Usamos amount: 0.5 para que la animación se dispare cuando la sección esté bien centrada.
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    return (
        // 4. Adjuntamos la ref y corregimos el fondo para que coincida con la intención del diseño.
        <section 
            ref={ref}
            className="bg-[var(--brand-light-beige)] py-20 px-6" 
            id="cta"
        >
            <div className="container mx-auto max-w-4xl text-center">
                {/* 5. Animamos el título para que aparezca desde abajo. */}
                <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    // Corregimos el color del texto para que sea visible en un fondo oscuro.
                    className="font-serif text-4xl md:text-5xl font-bold text-[#4B3F36]"
                >
                    ¿Listo para Consentir a tu Golden Doodle?
                </motion.h2>

                {/* 6. Animamos el párrafo con un ligero retraso. */}
                <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                    className="font-sans text-lg text-[#4B3F36] mt-4 max-w-2xl mx-auto"
                >
                    Su felicidad (y un pelaje sin enredos) está a solo un clic de distancia.
                </motion.p>
                
                {/* 7. Animamos el botón con un retraso mayor y un efecto de "pop". */}
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.4 }}
                    // 8. Añadimos efectos de hover y tap con Framer Motion.
                    whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 20px rgba(255, 215, 0, 0.2)' }}
                    whileTap={{ scale: 0.98 }}
                    className="
                        hero-button
                        mt-8 px-8 py-3 
                        font-sans font-bold text-lg rounded-full
                        shadow-lg
                        transition-colors duration-300
                        focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent-gold)] focus:ring-opacity-50
                        bg-[var(--brand-accent-gold)] text-[var(--brand-cta-brown)]
                        hover:bg-yellow-300 hover:text-[var(--brand-cta-brown)]
                    "
                >
                    Reservar una Sesión de Lujo
                </motion.button>
            </div>
        </section>
    );
};

export default FinalCTA;