import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import logoUrl from '../assets/logo.png';



export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-bone/95 backdrop-blur-md border-b border-charcoal/10 py-4 shadow-sm' : 'bg-transparent py-8'
                }`}
        >
            <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
                <a href="#" className="font-serif text-2xl font-bold tracking-widest text-charcoal uppercase flex items-center gap-3">
                    <img src={logoUrl} alt="Xaenithra Logo" className="w-12 h-12 object-contain filter drop-shadow hover:scale-105 transition-transform" />
                    <span>XAENITHRA</span>
                </a>

                <div className="hidden md:flex gap-8 items-center" />
            </div>
        </motion.header>
    );
}
