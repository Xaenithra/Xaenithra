import { motion } from 'framer-motion';
import { Skull, ShieldAlert, Cpu, Database, Binary, Zap } from 'lucide-react';

const pillars = [
    {
        icon: ShieldAlert,
        title: 'Offensive Cyber Specialists',
        desc: 'Web exploitation, reverse engineering binaries, privilege escalation, and real-world system compromise. We break systems by thinking like adversaries.'
    },
    {
        icon: Skull,
        title: 'CTF Warfare',
        desc: 'We treat CTF as sports and cyber warfare. Solving complex cryptography, analyzing memory dumps, and dominating in pwn and binary exploitation.'
    },
    {
        icon: Cpu,
        title: 'Digital Intelligence Operatives',
        desc: 'Advanced OSINT capabilities, threat hunting, and pattern recognition. Simulating adversaries rather than just defending against them.'
    },
    {
        icon: Database,
        title: 'Knowledge Vault Builders',
        desc: 'Maintaining a structured archive of writeups, exploit scripts, and private toolkits. A classified repository of offensive hacking knowledge.'
    }
];

export default function About() {
    return (
        <section id="about" className="py-32 relative bg-bone border-b border-charcoal/10 overflow-hidden">
            {/* Background Blueprints (Boosted Visibility & Complexity) */}
            <div className="absolute top-10 right-10 w-[700px] h-[700px] opacity-[0.08] pointer-events-none text-charcoal z-0 hidden lg:block">
                <motion.svg 
                    viewBox="0 0 200 200" 
                    className="w-full h-full"
                    animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                    <path d="M10 10 L50 10 L60 20 L180 20 M50 10 L50 180 M180 20 L180 150 L160 170 L20 170" fill="none" stroke="currentColor" strokeWidth="1" />
                    <rect x="70" y="50" width="40" height="30" fill="none" stroke="currentColor" strokeWidth="2" />
                    <rect x="120" y="50" width="40" height="30" fill="none" stroke="currentColor" strokeWidth="2" />
                    <circle cx="90" cy="120" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
                    <circle cx="140" cy="120" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
                    <path d="M90 135 L90 150 L140 150 L140 135 M115 150 L115 170" fill="none" stroke="currentColor" strokeWidth="1" />
                    {/* Additional technical motifs */}
                    <path d="M20 20 L40 40 M160 160 L180 180" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                </motion.svg>
            </div>

            <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] opacity-[0.06] pointer-events-none text-charcoal">
                <Binary className="w-full h-full animate-pulse" />
            </div>

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1 }}
                    className="text-center mb-16 relative"
                >
                    <div className="flex items-center justify-center gap-6 mb-8">
                        <div className="h-[1px] w-12 md:w-32 bg-gradient-to-r from-transparent to-charcoal/50" />
                        <div className="w-3 h-3 rotate-45 border border-gold-muted flex items-center justify-center">
                            <div className="w-1 h-1 bg-charcoal" />
                        </div>
                        <h2 className="text-3xl md:text-5xl tracking-[0.2em] font-serif uppercase">The Syndicate</h2>
                        <div className="w-3 h-3 rotate-45 border border-gold-muted flex items-center justify-center">
                            <div className="w-1 h-1 bg-charcoal" />
                        </div>
                        <div className="h-[1px] w-12 md:w-32 bg-gradient-to-l from-transparent to-charcoal/50" />
                    </div>

                    <p className="font-serif text-gold-dark tracking-[0.4em] text-xs uppercase mb-12">Chapter I : Identity & Warfare</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative p-10 md:p-16 bg-[#1A1816]/95 shadow-[20px_20px_60px_-15px_rgba(42,37,34,0.3)] border border-charcoal mb-20 overflow-hidden rounded-sm"
                >
                    {/* Glowing ambient light */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold-dark/10 blur-[80px] rounded-full" />
                    
                    {/* Tactical Overlays inside the box */}
                    <div className="absolute top-4 left-4 font-mono text-[8px] text-bone/20 uppercase tracking-widest">
                        XAENITHRA_MANIFESTO_TRANSCRIPT // VER_2.0
                    </div>

                    <h3 className="relative z-10 text-2xl md:text-3xl lg:text-4xl font-serif text-bone leading-relaxed text-center mb-10 font-light italic tracking-tight">
                        "We don’t just solve challenges — we <span className="text-gold-light">decode systems."</span>
                    </h3>
                    
                    <div className="relative z-10 w-24 h-[1px] bg-gold-muted/30 mx-auto mb-10" />

                    <p className="relative z-10 text-lg md:text-xl font-sans text-bone/80 leading-relaxed text-center font-light max-w-4xl mx-auto px-4">
                        <strong className="font-semibold text-gold-light tracking-widest uppercase">Xaenithra</strong> is a clandestine cybersecurity collective that treats CTF as warfare, intelligence as currency, and skill as hierarchy. We are not loud — we are precise and dangerous. We mix old-world intelligence aesthetics with modern offensive security execution.
                    </p>
                    
                    <div className="absolute bottom-4 right-4 flex gap-2">
                        <Zap className="w-4 h-4 text-gold-dark/40" />
                        <div className="w-8 h-[1px] bg-gold-dark/20 mt-2" />
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
                            className="bg-white/40 backdrop-blur-sm border border-charcoal/10 p-10 hover:border-gold-dark transition-all duration-500 shadow-sm hover:shadow-xl group flex flex-col gap-6 rounded-sm relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-10 transition-opacity">
                                <pillar.icon className="w-16 h-16" />
                            </div>
                            <div className="shrink-0 flex items-center justify-center w-12 h-12 bg-charcoal rounded-full group-hover:bg-gold-dark transition-colors border border-charcoal shadow-lg">
                                <pillar.icon className="w-6 h-6 text-bone" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h4 className="font-serif font-bold tracking-[0.2em] uppercase text-sm text-charcoal mb-4 border-b border-charcoal/10 pb-2 inline-block">{pillar.title}</h4>
                                <p className="font-sans text-charcoal/70 text-[13px] leading-relaxed italic">{pillar.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
