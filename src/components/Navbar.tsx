// app/components/Navbar.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { Menu, X } from 'lucide-react';

// Importaciones de GSAP
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const navLinks = [
    { to: "services", label: "Services" },
    { to: "pricing", label: "Pricing" },
    { to: "gallery", label: "Gallery" },
    { to: "faq", label: "FAQ" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    // --- GSAP Refs ---
    // Ref para el contenedor principal de la Navbar
    const container = useRef(null);
    // Ref para el menú desplegable móvil
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // --- GSAP Animaciones ---
    useGSAP(() => {
        // Animación de entrada para toda la barra de navegación al cargar la página
        gsap.from(container.current, {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
        });

        // Animación de entrada para los elementos del menú de escritorio (logo y links)
        gsap.from('.nav-item', {
            y: 20,
            opacity: 0,
            stagger: 0.1, // Anima cada elemento con un pequeño retraso
            duration: 0.8,
            delay: 0.5, // Empieza después de que la barra principal aparezca
            ease: 'power2.out',
        });
    }, { scope: container }); // El scope limita los selectores (ej. '.nav-item') a este componente

    // Animación para el menú móvil que se activa cuando 'isOpen' cambia
    useGSAP(() => {
        if (isOpen) {
            // Animación de APERTURA
            if (mobileMenuRef.current) {
                mobileMenuRef.current.style.display = 'block'; // Hacemos visible el contenedor
            }
            gsap.fromTo(mobileMenuRef.current,
                { yPercent: -100, opacity: 0 },
                { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
            );
            // Animamos los links del menú móvil
             gsap.from('.mobile-nav-item', {
                y: 20,
                opacity: 0,
                stagger: 0.05,
                delay: 0.2,
                duration: 0.4
             });

        } else {
            // Animación de CIERRE
            gsap.to(mobileMenuRef.current, {
                yPercent: -100,
                opacity: 0,
                duration: 0.4,
                ease: 'power3.in',
                onComplete: () => {
                    // Ocultamos el contenedor al finalizar para que no interfiera
                    if (mobileMenuRef.current) {
                        mobileMenuRef.current.style.display = 'none';
                    }
                }
            });
        }
    }, [isOpen]);


    return (
        <nav
            ref={container} // Asignamos el ref al contenedor principal
            style={{ background: hasScrolled ? 'var(--brand-light-beige)' : 'var(--brand-light-beige)', boxShadow: hasScrolled ? '0 2px 8px rgba(76, 63, 54, 0.08)' : 'none' }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300`}
        >
            <div className="container mx-auto max-w-7xl px-6 flex justify-between items-center h-20">
                {/* Logo */}
                <Link to="hero" smooth={true} duration={500} className="cursor-pointer group nav-item"> {/* Añadimos clase 'nav-item' */}
                    <h1
                        className="font-serif text-2xl font-bold transition-colors duration-300 group-hover:text-[var(--brand-accent-gold)]"
                        style={{ color: 'var(--brand-text-dark)' }}
                    >
                        Doodle Spa
                    </h1>
                </Link>

                {/* Links de Navegación para Desktop */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map(link => (
                        <Link
                            key={link.to}
                            to={link.to}
                            spy={true}
                            smooth={true}
                            offset={-80}
                            duration={500}
                            className="font-sans font-bold cursor-pointer transition-colors duration-300 hover:text-[var(--brand-accent-gold)] relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-[var(--brand-accent-gold)] after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1 nav-item" // Añadimos clase 'nav-item'
                            style={{ color: 'var(--brand-text-dark)' }}
                            activeClass="text-brand-accent-gold"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        to="cta"
                        smooth={true}
                        offset={-80}
                        duration={500}
                        className="font-bold px-5 py-2 rounded-lg transition-colors duration-300 hover:bg-[var(--brand-cta-brown)] hover:text-[var(--brand-accent-gold)] nav-item" // Añadimos clase 'nav-item'
                        style={{ background: 'var(--brand-accent-gold)', color: 'var(--brand-cta-brown)' }}
                    >
                        Book Now
                    </Link>
                </div>

                {/* Botón de Menú para Móvil */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} style={{ color: 'var(--brand-text-dark)' }}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Menú Desplegable para Móvil */}
            {/* 
              IMPORTANTE: Eliminamos la condición `isOpen &&` para que el div siempre esté en el DOM.
              Lo controlamos con `display: none` y GSAP. Empezará con la clase `hidden`.
            */}
            <div
                ref={mobileMenuRef} // Asignamos el ref al menú móvil
                className="md:hidden hidden" // Lo iniciamos oculto con 'hidden'
                style={{ background: 'var(--brand-light-beige)' }}
            >
                <div className="flex flex-col items-center py-4 space-y-4">
                    {navLinks.map(link => (
                        <Link
                            key={link.to}
                            to={link.to}
                            spy={true}
                            smooth={true}
                            offset={-80}
                            duration={500}
                            onClick={() => setIsOpen(false)}
                            className="font-sans font-bold text-lg cursor-pointer transition-colors duration-300 hover:text-[var(--brand-accent-gold)] mobile-nav-item" // Clase para seleccionar con GSAP
                            style={{ color: 'var(--brand-text-dark)' }}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        to="cta"
                        smooth={true}
                        offset={-80}
                        duration={500}
                        onClick={() => setIsOpen(false)}
                        className="font-bold px-6 py-3 rounded-lg w-11/12 text-center transition-colors duration-300 hover:bg-[var(--brand-cta-brown)] hover:text-[var(--brand-accent-gold)] mobile-nav-item" // Clase para seleccionar con GSAP
                        style={{ background: 'var(--brand-accent-gold)', color: 'var(--brand-cta-brown)' }}
                    >
                        Book Now
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;