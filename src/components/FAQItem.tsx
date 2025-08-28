// app/components/FAQItem.tsx
'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
    question: string;
    answer: string;
    className?: string; // Hacemos que className sea una prop opcional
}

const FAQItem = ({ question, answer, className = '' }: FAQItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        // Aplicamos la className que recibimos a nuestro div principal
        <div className={`border-b border-brand-brown/20 overflow-hidden ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left py-4 flex justify-between items-center"
            >
                <h3 className="font-sans font-bold text-lg text-brand-text-dark">{question}</h3>
                <ChevronDown
                    className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    color="var(--brand-accent-gold)"
                    size={24}
                />
            </button>
            {/* Contenedor para la animación de despliegue con CSS */}
            <div
                className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <p className="font-sans text-base pb-6 pr-6 text-brand-text-dark/80">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FAQItem;