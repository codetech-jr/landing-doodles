// app/components/FAQSection.tsx
'use client'; // Necesario para los hooks de React

import React, { useRef } from 'react';
import FAQItem from './FAQItem';

// Importaciones de GSAP y ScrollTrigger
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Registrar el plugin
gsap.registerPlugin(ScrollTrigger);

const faqData = [
    {
        question: "How long does a hair salon appointment last?",
        answer: "A typical session for a Golden Doodle lasts between 2 and 3 hours..."
    },
    {
        question: "Do you only treat Golden Doodles?",
        answer: "Yes! By specializing exclusively in Golden Doodles..."
    },
    {
        question: "What if my dog is anxious or fearful?",
        answer: "Our groomers are trained to handle anxious pets..."
    },
    {
        question: "What service areas do you cover?",
        answer: "We currently serve the metropolitan area of [Name of your city]..."
    }
];

const FAQSection = () => {
    // --- GSAP Ref ---
    const sectionRef = useRef(null);

    // --- GSAP Animaciones ---
    useGSAP(() => {
        // Animación para el título
        gsap.from('.faq-title', {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out'
        });

        // Animación para cada item del FAQ en cascada
        gsap.from('.faq-item', {
            scrollTrigger: {
                trigger: '.faq-item',
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 40,
            duration: 0.6,
            stagger: 0.15, // La magia está aquí: anima cada item con un retraso de 0.15s
            ease: 'power2.out'
        });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="bg-brand-light-beige py-20 px-6" id="faq">
            <div className="container mx-auto max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="faq-title font-serif text-4xl md:text-5xl font-bold text-brand-text-dark">
                        Frequently Asked Questions
                    </h2>
                </div>
                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        // Pasamos una clase al componente hijo.
                        // Esto asume que FAQItem aplica esta clase a su elemento raíz.
                        <FAQItem 
                            key={index} 
                            question={faq.question} 
                            answer={faq.answer} 
                            className="faq-item" 
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;