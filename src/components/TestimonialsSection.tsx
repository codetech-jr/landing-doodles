// app/components/TestimonialsSection.tsx

// 1. Añadimos la directiva "use client".
"use client";

import React, { useRef } from 'react';
// 2. Importamos las herramientas de Framer Motion.
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Star } from 'lucide-react';

const testimonialsData = [
    {
        quote: "Absolutely amazing service! My Golden Doodle, Max, looks and smells incredible. The convenience of a mobile service is unmatched, and the team's expertise is obvious. Highly recommend!",
        name: "Sarah M.",
        role: "Max's Mom",
        avatar: "/images/avatar-1.jpg" // Asegúrate que la ruta sea correcta
    },
    {
        quote: "I was worried because my doodle, Luna, has anxiety. The groomer was so patient and calm. She came back happy and relaxed, not stressed at all. This is the only way we'll do grooming from now on.",
        name: "Mike R.",
        role: "Luna's Dad",
        avatar: "/images/avatar-2.jpg"
    },
    {
        quote: "Worth every penny. The 'Luxury' package is incredible, and the cut is perfect every time. They really are Doodle specialists. My dog, Cooper, looks like a show dog after every visit.",
        name: "Jennifer L.",
        role: "Cooper's Mom",
        avatar: "/images/avatar-3.jpg"
    }
];

// 3. Definimos las variantes de animación para el grid y las tarjetas.
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.25, delayChildren: 0.2 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const Rating = ({ rating = 5 }) => (
    <div className="flex items-center gap-1">
        {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="text-yellow-400 fill-yellow-400 w-5 h-5" />
        ))}
    </div>
);

const TestimonialsSection = () => {
    // 4. Configuramos la detección de visibilidad.
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section ref={ref} className="bg-white py-20 px-6">
            <div className="container mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-brown">
                        What Doodle Parents Say
                    </h2>
                    <p className="font-sans text-lg mt-4 max-w-3xl mx-auto text-brand-brown/80">
                        Our greatest pride is the trust and loyalty of our clients.
                    </p>
                </motion.div>

                        {/* 5. Aplicamos las variantes al contenedor del grid. */}
                                <motion.div
                                    className="grid grid-cols-1 lg:grid-cols-3"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate={isInView ? "visible" : "hidden"}
                                >
                                    {testimonialsData.map((testimonial, idx) => (
                                        <motion.div
                                            key={idx}
                                            className="bg-brand-cream rounded-xl shadow-lg p-8 m-4 flex flex-col items-center"
                                            variants={cardVariants}
                                        >
                                            <Rating rating={5} />
                                            <p className="font-sans text-lg italic text-brand-brown mt-4 mb-6">
                                                &quot;{testimonial.quote}&quot;
                                            </p>
                                            <div className="flex items-center gap-4 mt-auto">
                                                <Image
                                                    src={testimonial.avatar}
                                                    alt={testimonial.name}
                                                    width={48}
                                                    height={48}
                                                    className="rounded-full border-2 border-brand-brown"
                                                />
                                                <div>
                                                    <div className="font-serif font-bold text-brand-brown">{testimonial.name}</div>
                                                    <div className="font-sans text-sm text-brand-brown/70">{testimonial.role}</div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </section>
                    );
                };
        
                export default TestimonialsSection;