import React from 'react';
import { motion } from 'framer-motion';

export default function Section({ children, className = '', id }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative px-6 lg:px-10 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </motion.section>
  );
}
