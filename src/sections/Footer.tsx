import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Twitter, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
    const socialLinks = [
        { icon: Github, label: 'GITHUB', href: 'https://github.com/Xaenithra' },
        { icon: Linkedin, label: 'LINKEDIN', href: 'https://linkedin.com/company/xaenithra' },
        { icon: Instagram, label: 'INSTAGRAM', href: 'https://www.instagram.com/xaenithra/' },
        { icon: Twitter, label: 'TWITTER', href: 'https://twitter.com/xaenithra' }
    ];

    return (
        <footer className="py-24 bg-bone relative border-t-2 border-charcoal/10 overflow-hidden text-charcoal">
            {/* Minimal Background Schematic */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0" style={{ 
                    backgroundImage: 'radial-gradient(circle at 2px 2px, #2A2522 1px, transparent 0)',
                    backgroundSize: '40px 40px' 
                }} />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center justify-center text-center">
                    {/* Simplified Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-3xl font-serif uppercase tracking-[0.4em] mb-4">Get in Touch</h2>
                        <div className="h-[1px] w-24 bg-gold-dark/40 mx-auto" />
                    </motion.div>

                    {/* Social Grid - Ultra Clean */}
                    <div className="flex flex-wrap justify-center gap-10 md:gap-16 mb-16">
                        {socialLinks.map((link, index) => (
                            <motion.a
                                key={index}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="group flex flex-col items-center gap-4"
                            >
                                <div className="w-14 h-14 rounded-full border border-charcoal/10 flex items-center justify-center group-hover:border-gold-dark group-hover:bg-charcoal transition-all duration-500">
                                    <link.icon className="w-6 h-6 group-hover:text-bone group-hover:scale-110 transition-transform" />
                                </div>
                                <span className="font-mono text-[9px] tracking-[0.3em] text-charcoal/40 group-hover:text-gold-dark transition-colors">{link.label}</span>
                            </motion.a>
                        ))}
                    </div>

                    {/* Simple Email Contact */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <a 
                            href="mailto:xaenithra@gmail.com"
                            className="flex items-center gap-4 text-xl md:text-2xl font-serif tracking-widest text-charcoal hover:text-gold-dark transition-all group"
                        >
                            <Mail className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                            <span>XAENITHRA@GMAIL.COM</span>
                        </a>
                    </motion.div>
                </div>

                {/* Final Refined Credit Footer - Short & Premium */}
                <div className="mt-24 pt-12 border-t border-charcoal/5 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4 opacity-30">
                        <span className="font-serif text-[10px] uppercase tracking-[0.2em]">XAENITHRA SYSTEMS</span>
                    </div>
                    
                    <div className="flex items-center gap-8">
                        <a 
                            href="https://utkarsh.xaenithra.com/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-serif text-[11px] uppercase tracking-[0.3em] text-charcoal/60 hover:text-charcoal transition-all flex items-center gap-2 group italic underline decoration-charcoal/10 underline-offset-8"
                        >
                            <span>Designed by Utkarsh</span>
                            <ExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform opacity-40 group-hover:opacity-100" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
