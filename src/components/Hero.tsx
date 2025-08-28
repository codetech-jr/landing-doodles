// app/components/Hero.tsx
'use client'; 

import React, { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const heroImageUrl = "/images/golden-doodle.png";

const Hero = () => {
    const heroRef = useRef(null);
    const imageRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(imageRef.current,
            { scale: 1.15 },
            { scale: 1, duration: 15, ease: 'none' }
        );

        gsap.from(['.hero-title', '.hero-subtitle', '.hero-button'], {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.2,
            delay: 0.5,
        });

    }, { scope: heroRef });

    return (
        <section ref={heroRef} className="relative flex items-center justify-center h-screen overflow-hidden" id="hero">
            <div ref={imageRef} className="absolute inset-0 z-0">
                <Image
                    src={heroImageUrl}
                    alt="Happy Golden Doodle after a grooming session"
                    layout="fill"
                    objectFit="cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-cta-brown)]/70 to-[var(--brand-accent-gold)]/40" />
            </div>
            <div className="relative z-10 text-center px-4 flex flex-col items-center justify-center w-full h-full">
                <h1 className="hero-title font-serif text-4xl md:text-6xl font-bold drop-shadow-lg leading-tight mb-2"
                    style={{ color: '#fff', textShadow: '0 4px 16px rgba(76,63,54,0.45), 0 1px 2px rgba(0,0,0,0.25)' }}>
                    The Exclusive Mobile Spa<br />For Your Golden Doodle
                </h1>
                <p className="hero-subtitle font-sans text-base md:text-xl mt-2 mb-6 max-w-2xl mx-auto drop-shadow-md font-medium"
                    style={{ color: '#fff', textShadow: '0 2px 8px rgba(76,63,54,0.35), 0 1px 2px rgba(0,0,0,0.18)' }}>
                    Expert care for their unique coat, stress-free at your home
                </p>
                {/* 👇👇👇 LÍNEA MODIFICADA 👇👇👇 */}
                <button
                    className="
                        hero-button
                        mt-2 px-8 py-3 
                        font-sans font-bold text-lg rounded-full
                        shadow-lg
                        transition-colors duration-300 /* <-- CAMBIO AQUÍ */
                        focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent-gold)] focus:ring-opacity-50
                        bg-[var(--brand-accent-gold)] text-[var(--brand-cta-brown)]
                        hover:bg-[var(--brand-cta-brown)] hover:text-[var(--brand-accent-gold)]
                    "
                >
                    Book Now
                </button>
            </div>
        </section>
    );
};

export default Hero;