// app/components/ProblemSolution.tsx

"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Scissors, Shield, Sparkles } from 'lucide-react';

const featuresData = [
  {
    icon: <Scissors size={40} className="text-[var(--brand-text-dark)]" />,
    title: "Matted Fur?",
    description: "Golden Doodle coats require specialized techniques to prevent painful matting and maintain their beautiful, fluffy texture."
  },
  {
    icon: <Shield size={40} className="text-[var(--brand-text-dark)]" />,
    title: "Grooming Anxiety?",
    description: "Our mobile service eliminates stress by bringing professional care to your pet's familiar, safe environment."
  },
  {
    icon: <Sparkles size={40} className="text-[var(--brand-text-dark)]" />,
    title: "Need Expert Care?",
    description: "Our specialists understand the unique needs of Doodle coats and provide premium, breed-specific grooming services."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
};

const ProblemSolution = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-20" style={{ background: 'var(--brand-light-beige)' }}>
      <div className="container mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="font-serif text-4xl md:text-5xl font-bold mb-16" 
          style={{ color: 'var(--brand-text-dark)' }}
        >
          Your Doodle&#39;s Coat Needs Special Care
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {featuresData.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              className="flex flex-col items-center bg-white rounded-xl shadow-lg p-8"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="font-serif text-2xl font-bold mb-2" style={{ color: 'var(--brand-text-dark)' }}>
                {feature.title}
              </h3>
              <p className="font-sans mt-2 max-w-xs" style={{ color: 'var(--brand-text-dark)', opacity: 0.8 }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolution;