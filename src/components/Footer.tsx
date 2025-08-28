// app/components/Footer.tsx
'use client'; // Necesario para los hooks de React

import React, { useRef } from 'react';
import { Mail, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

// Importaciones de GSAP y ScrollTrigger
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Registrar el plugin
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    // --- GSAP Ref ---
    const footerRef = useRef(null);

    // --- GSAP Animaciones ---
    useGSAP(() => {
        // Seleccionamos todos los 'footer-item' y los animamos en cascada
        gsap.from('.footer-item', {
            scrollTrigger: {
                trigger: footerRef.current,
                start: 'top 95%', // La animación empieza cuando el footer está casi visible
                toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 30, // Se deslizan desde abajo
            duration: 0.6,
            stagger: 0.1, // Anima cada item 0.1s después del anterior
            ease: 'power2.out',
        });
    }, { scope: footerRef });

    return (
        <footer ref={footerRef} className="bg-brand-cta-dark-bg text-brand-light-beige font-sans">
            <div className="container mx-auto max-w-7xl py-12 px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
                    
                    {/* Columna 1: Sobre Nosotros */}
                    <div>
                        <h3 className="footer-item font-serif text-2xl font-bold text-brand-light-beige mb-2">Doodle Spa</h3>
                        <p className="footer-item text-sm">La experiencia de peluquería móvil definitiva, exclusiva para Golden Doodles.</p>
                    </div>

                    {/* Columna 2: Contacto */}
                    <div>
                        <h4 className="footer-item font-bold text-brand-light-beige uppercase tracking-wider mb-3">Contacto</h4>
                        <div className="space-y-2 text-sm">
                            <a href="mailto:contact@doodlespa.com" className="footer-item flex items-center justify-center md:justify-start gap-2 hover:text-brand-accent-gold transition-colors">
                                <Mail size={16} /> contact@doodlespa.com
                            </a>
                            <a href="tel:+1234567890" className="footer-item flex items-center justify-center md:justify-start gap-2 hover:text-brand-accent-gold transition-colors">
                                <Phone size={16} /> (123) 456-7890
                            </a>
                        </div>
                    </div>

                    {/* Columna 3: Redes Sociales */}
                    <div>
                        <h4 className="footer-item font-bold text-brand-light-beige uppercase tracking-wider mb-3">Síguenos</h4>
                        <div className="flex justify-center md:justify-start gap-4">
                            <a href="#" className="footer-item hover:text-brand-accent-gold transition-colors"><Instagram size={24} /></a>
                            <a href="#" className="footer-item hover:text-brand-accent-gold transition-colors"><Facebook size={24} /></a>
                            <a href="#" className="footer-item hover:text-brand-accent-gold transition-colors"><Twitter size={24} /></a>
                        </div>
                    </div>
                </div>

                {/* Línea divisora y copyright */}
                <div className="footer-item border-t border-brand-light-beige/20 mt-10 pt-6 text-center text-xs">
                    <p className="footer-item">© {new Date().getFullYear()} Doodle Spa. Todos los derechos reservados. | <a href="#" className="hover:text-brand-accent-gold transition-colors">Política de Privacidad</a> | <a href="#" className="hover:text-brand-accent-gold transition-colors">Términos de Servicio</a></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;