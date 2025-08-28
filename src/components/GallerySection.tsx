// app/components/GallerySection.tsx
'use client'; // Necesario para los hooks de React

import React, { useState, useRef } from 'react';
import Image from 'next/image'; // Usaremos el componente Image de Next.js para un rendimiento superior

import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

// Importaciones de GSAP y ScrollTrigger
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Registrar el plugin
gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
    { src: "/images/gallery-doodle-1.png", alt: "Happy Golden Doodle after grooming" },
    { src: "/images/gallery-doodle-2.png", alt: "Perfectly styled Golden Doodle" },
    { src: "/images/gallery-doodle-3.png", alt: "Fluffy Golden Doodle smiling" },
    { src: "/images/gallery-doodle-4.png", alt: "Adorable cream-colored Golden Doodle" },
    { src: "/images/gallery-doodle-5.png", alt: "Golden Doodle with a Teddy Bear cut" },
    { src: "/images/gallery-doodle-6.png", alt: "Sleek and clean Golden Doodle" },
];

const GallerySection = () => {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    // --- GSAP Ref ---
    const sectionRef = useRef(null);
    
    // --- GSAP Animaciones ---
    useGSAP(() => {
        // Animación para el título y el párrafo
        gsap.from('.gallery-title', {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power3.out'
        });

        // Animación para las imágenes de la galería
        gsap.from('.gallery-image', {
            scrollTrigger: {
                trigger: '.gallery-image',
                start: 'top 90%', // Empezamos un poco más tarde para asegurar que se vean
                toggleActions: 'play none none none'
            },
            opacity: 0,
            scale: 0.8,
            y: 40,
            duration: 0.7,
            stagger: 0.1, // Un stagger rápido para que aparezcan en rápida sucesión
            ease: 'back.out(1.5)' // Efecto de rebote para un "pop" agradable
        });
    }, { scope: sectionRef });

    const slides = galleryImages.map(img => ({ src: img.src, alt: img.alt }));

    return (
        <section ref={sectionRef} className="py-20 px-4" id="gallery" style={{ background: 'var(--brand-cream)' }}>
            <div className="container mx-auto max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="gallery-title font-serif text-4xl md:text-5xl font-bold" style={{ color: 'var(--brand-text-dark)' }}>
                        Our Happy Doodle Clients
                    </h2>
                    <p className="gallery-title font-sans text-lg mt-4 max-w-3xl mx-auto" style={{ color: 'var(--brand-text-dark)', opacity: 0.8 }}>
                        A picture is worth a thousand barks.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryImages.map((image, idx) => (
                        // Añadimos la clase 'gallery-image' para GSAP
                        <div
                            key={idx}
                            className="gallery-image relative aspect-square rounded-lg overflow-hidden shadow-md group cursor-pointer"
                            onClick={() => { setOpen(true); setIndex(idx); }}
                        >
                            {/* Usamos Next/Image para optimización automática */}
                            <Image
                                src={image.src}
                                alt={image.alt}
                                layout="fill"
                                objectFit="cover"
                                className="transition-transform duration-500 ease-in-out group-hover:scale-110"
                            />
                            {/* Overlay sutil al hacer hover */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
            
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={slides}
                index={index}
                on={{ view: ({ index: i }: { index: number }) => setIndex(i) }}
            />
        </section>
    );
};

export default GallerySection;