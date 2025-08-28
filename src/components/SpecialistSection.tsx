// app/components/SpecialistSection.tsx
'use client'; // Necesario para los hooks de React

import React, { useRef } from 'react';
import Image from 'next/image';

// Importaciones de GSAP y ScrollTrigger
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Registrar el plugin
gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Masters of the Doodle Coat",
    description: "We understand the unique challenges of Doodle fur... using only the best products for their sensitive skin.",
    image: "/images/doodle-coat-closeup.png",
    imageAlt: "Close-up of a perfectly groomed Golden Doodle's curly coat"
  },
  {
    title: "The Perfect 'Doodle' Cut, Every Time",
    description: "Whether you love the playful 'Teddy Bear' look... fits your lifestyle and your doodle's comfort.",
    image: "/images/doodle-teddy-bear-cut.png",
    imageAlt: "A happy Golden Doodle with a perfect Teddy Bear haircut"
  },
  {
    title: "A Stress-Free, Positive Environment",
    description: "We know Doodles are intelligent and sensitive... feels safe and pampered throughout the entire session.",
    image: "/images/doodle-calm-experience.png",
    imageAlt: "A calm Golden Doodle relaxing after a grooming session"
  }
];

const SpecialistSection = () => {
    // --- GSAP Ref ---
    const sectionRef = useRef(null);

    // --- GSAP Animaciones ---
    useGSAP(() => {
        // Animación para el bloque del título
        gsap.from('.specialist-title', {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power3.out',
        });

        // Animación para cada fila de características
        // Usamos gsap.utils.toArray para seleccionar todas las filas y animarlas individualmente
        gsap.utils.toArray('.feature-row').forEach((row, index) => {
            const image = (row as Element).querySelector('.feature-image');
            const text = (row as Element).querySelector('.feature-text');

            // Determinar la dirección de la animación basado en si la fila es par o impar
            const isEven = index % 2 === 0;

            // La imagen se desliza desde la derecha en filas pares, y desde la izquierda en impares
            gsap.from(image, {
                scrollTrigger: {
                    trigger: row as Element,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
                opacity: 0,
                x: isEven ? 100 : -100, // x: 100 (desde la derecha), x: -100 (desde la izquierda)
                duration: 1,
                ease: 'power3.out',
            });
            
            // El texto se desliza desde la dirección opuesta a la imagen
            gsap.from(text, {
                scrollTrigger: {
                    trigger: row as Element,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
                opacity: 0,
                x: isEven ? -100 : 100,
                duration: 1,
                delay: 0.2, // Un pequeño retraso para que no entren exactamente al mismo tiempo
                ease: 'power3.out',
            });
        });

    }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-20 px-6" style={{ background: 'var(--brand-light-beige)' }}>
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="specialist-title font-sans font-bold uppercase tracking-wider" style={{ color: 'var(--brand-accent-gold)' }}>Why Choose Us?</p>
          <h2 className="specialist-title font-serif text-4xl md:text-5xl font-bold mt-2" style={{ color: 'var(--brand-text-dark)' }}>
            We Are Golden Doodle Specialists
          </h2>
        </div>

        <div className="space-y-20">
          {features.map((feature, index) => (
            // Añadimos clase 'feature-row' para que GSAP pueda iterar sobre cada una
            <div 
              key={index} 
              className="feature-row grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              {/* Añadimos clase 'feature-image' */}
              <div className={`feature-image relative h-80 rounded-lg overflow-hidden shadow-xl group ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                <Image
                  src={feature.image}
                  alt={feature.imageAlt}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[var(--brand-accent-gold)] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
              </div>

              {/* Añadimos clase 'feature-text' */}
              <div className={`feature-text ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}
                style={{ color: 'var(--brand-text-dark)' }}>
                <h3 className="font-serif text-3xl font-bold mb-4">{feature.title}</h3>
                <p className="font-sans text-lg leading-relaxed" style={{ color: 'var(--brand-text-dark)', opacity: 0.9 }}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialistSection;