import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, FileText, Fingerprint, Lock, ExternalLink, X, ChevronRight, Cpu } from 'lucide-react';

const members = [
    {
        name: 'Utkarsh Pratham',
        role: 'Advanced Threat Operative',
        specialization: 'Binary Exploitation / Pwn',
        bio: 'Syndicate Lead specializing in low-level binary exploitation and architectural pwnage. Dismantles complex memory protections to establish advanced threat vectors.',
        portfolio: 'https://utkarsh.xaenithra.com/',
        image: '/utkarsh.jpg'
    },
    {
        name: 'Yuyutshu',
        role: 'Lead Intelligence Specialist',
        specialization: 'Reverse Engineering',
        bio: 'Master of deconstruction. Specializes in analyzing malicious binary artifacts and de-obfuscating proprietary signal protocols for Syndicate intelligence.',
        portfolio: 'https://yuyutshu.xaenithra.com/',
        image: '/yuyutshu.jpg'
    },
    {
        name: 'Shivang',
        role: 'OSINT Operative',
        specialization: 'Open Intelligence',
        bio: 'The Order\'s eyes on the open web. Specializes in global intelligence gathering, social engineering vectors, and identifying adversary fingerprints through public data clusters.',
        portfolio: 'https://shivang.xaenithra.com/',
        image: '/shivang.jpg'
    },
    {
        name: 'Aryan',
        role: 'Web Exploitation Lead',
        specialization: 'Tactical Web Auditing',
        bio: 'Engineers sophisticated exploits for modern web architectures. Specializes in advanced server-side injection and complex bypass operations against enterprise defense layers.',
        portfolio: 'https://aryan.xaenithra.com/',
        image: '/aryan.jpg'
    },
    {
        name: 'Nehul',
        role: 'Systems Analyst',
        specialization: 'Vulnerability Research',
        bio: 'Precision analyst focusing on edge-case vulnerability research and secure architectural design. Orchestrates the Order\'s internal payload validation cycles.',
        portfolio: 'https://nehul.xaenithra.com/',
        image: '/nehul.jpg'
    },
    {
        name: 'Sukhmandeep',
        role: 'Research Syndicate',
        specialization: 'Strategic Intelligence Research',
        bio: 'Directs the Syndicate\'s deep-dive research initiatives. Mapping emerging threat landscapes and developing the theoretical foundations for the Order\'s offensive arsenal.',
        portfolio: 'https://sukhmandeep.xaenithra.com/',
        image: '/sukhmandeep.jpg'
    }
];

export default function Team() {
    const [selectedOperative, setSelectedOperative] = useState<typeof members[0] | null>(null);

    return (
        <section id="team" className="py-32 relative bg-bone border-b-2 border-charcoal/10 overflow-hidden text-charcoal">
            {/* Background Dossier Elements (High Visibility) */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-20 left-10 w-72 h-72 border-2 border-charcoal/5 rotate-12 flex items-center justify-center opacity-[0.15]">
                    <span className="font-serif text-5xl uppercase tracking-[0.4em] -rotate-12 select-none">SYNDICATE_ONLY</span>
                </div>
                <div className="absolute bottom-40 right-10 w-96 h-96 opacity-[0.1]">
                    <Fingerprint className="w-full h-full text-charcoal" />
                </div>
                {/* Tactical Lines */}
                <div className="absolute inset-0 flex flex-col justify-around opacity-[0.05]">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="w-full h-[1px] bg-charcoal" />
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24 max-w-2xl mx-auto"
                >
                    <div className="inline-flex items-center gap-4 mb-6">
                        <div className="w-8 h-[1px] bg-gold-dark" />
                        <h2 className="text-3xl md:text-5xl font-serif uppercase tracking-[0.3em] text-charcoal">Operative_Roster</h2>
                        <div className="w-8 h-[1px] bg-gold-dark" />
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-charcoal/40 mb-2">Access_Node::Chapter_I_Dossiers</p>
                    <p className="font-serif italic text-sm text-charcoal/60">"Identity is the final vulnerability. We keep ours encrypted."</p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-8 md:gap-12 max-w-7xl mx-auto">
                    {members.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            onClick={() => setSelectedOperative(member)}
                            className="w-full sm:w-[320px] bg-white border-2 border-charcoal/10 p-8 md:p-10 shadow-[20px_20px_0_0_rgba(42,37,34,0.05)] hover:shadow-none hover:translate-x-3 hover:translate-y-3 hover:border-gold-dark transition-all duration-700 group relative cursor-pointer"
                        >
                            {/* Card Decorative Brackets */}
                            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-charcoal/10 group-hover:border-gold-dark transition-colors" />
                            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-charcoal/10 group-hover:border-gold-dark transition-colors" />

                            <div className="relative mb-10 flex justify-center scale-100 group-hover:scale-105 transition-transform duration-700">
                                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-2 border-charcoal/20 overflow-hidden relative z-10 group-hover:border-gold-dark transition-all duration-700 shadow-xl">
                                    <img 
                                        src={member.image} 
                                        alt={member.name} 
                                        className="w-full h-full object-cover grayscale brightness-90 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" 
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gold-dark/5 blur-[40px] rounded-full scale-150 group-hover:bg-gold-dark/15 transition-colors" />
                            </div>

                            <div className="text-center relative z-10">
                                <h3 className="text-xl md:text-2xl font-serif uppercase tracking-widest mb-2 text-charcoal group-hover:text-gold-dark">{member.name}</h3>
                                <p className="text-gold-dark font-sans text-[10px] uppercase tracking-[.3em] mb-6 font-black">{member.role}</p>
                                
                                <div className="flex items-center justify-center gap-3 mb-8 opacity-20 group-hover:opacity-100 transition-all duration-500">
                                    <ShieldCheck className="w-4 h-4" />
                                    <div className="h-[2px] w-12 bg-charcoal/10 group-hover:bg-gold-dark/40" />
                                    <Lock className="w-4 h-4" />
                                </div>

                                <p className="font-mono text-[9px] md:text-[10px] text-charcoal/40 mb-6 uppercase tracking-widest px-4">{member.specialization}</p>
                                
                                <button className="mt-4 px-6 py-2 border-2 border-charcoal text-[9px] uppercase tracking-[.3em] hover:bg-charcoal hover:text-bone transition-all flex items-center gap-3 mx-auto shadow-md">
                                    <FileText className="w-3 h-3" />
                                    ACCESS_DOSSIER
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Operative Dossier Modal (The requested full detail view) */}
            <AnimatePresence>
                {selectedOperative && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-charcoal/90 backdrop-blur-2xl"
                        onClick={() => setSelectedOperative(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 50, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 50, opacity: 0 }}
                            className="bg-bone border-4 border-charcoal w-full max-w-4xl shadow-[0_0_100px_rgba(0,0,0,0.8)] relative overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setSelectedOperative(null)}
                                className="absolute top-6 right-6 z-[120] w-12 h-12 bg-charcoal text-bone flex items-center justify-center hover:bg-gold-dark transition-all rounded-sm group"
                            >
                                <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                            </button>

                            <div className="flex flex-col md:flex-row min-h-[500px]">
                                {/* Dossier Image Section */}
                                <div className="w-full md:w-2/5 bg-charcoal relative flex items-center justify-center p-12 overflow-hidden border-b-4 md:border-b-0 md:border-r-4 border-charcoal">
                                    <div className="absolute inset-0 opacity-20 grayscale scale-150 rotate-12">
                                        <Fingerprint className="w-full h-full text-bone" />
                                    </div>
                                    <div className="relative z-10 w-full aspect-square rounded-full border-8 border-bone/10 overflow-hidden shadow-2xl">
                                        <img src={selectedOperative.image} alt={selectedOperative.name} className="w-full h-full object-cover grayscale brightness-75 contrast-125" />
                                    </div>
                                    <div className="absolute bottom-10 left-0 w-full text-center">
                                         <p className="font-mono text-[10px] text-bone/40 tracking-[0.4em] uppercase">STATUS::AUTHORIZED</p>
                                    </div>
                                </div>

                                {/* Dossier Content Section */}
                                <div className="w-full md:w-3/5 p-12 md:p-16 relative bg-bone flex flex-col justify-center">
                                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none pointer-events-none">
                                        <span className="font-serif text-[120px] leading-none">ID</span>
                                    </div>

                                    <h4 className="font-mono text-[9px] text-gold-dark tracking-[0.5em] uppercase mb-4">SYNDICATE_OPERATIVE_PROFILE</h4>
                                    <h3 className="font-serif text-3xl md:text-5xl text-charcoal uppercase tracking-widest mb-2">{selectedOperative.name}</h3>
                                    <p className="font-serif italic text-gold-dark text-lg mb-10 border-b border-charcoal/10 pb-4">{selectedOperative.role}</p>
                                    
                                    <div className="mb-12">
                                        <p className="font-sans text-charcoal/80 leading-loose text-lg italic border-l-4 border-charcoal pl-8 mb-8">
                                            "{selectedOperative.bio}"
                                        </p>
                                        <div className="flex items-center gap-4 py-4 border-y border-charcoal/5">
                                            <ShieldCheck className="w-5 h-5 text-gold-dark" />
                                            <span className="font-mono text-[10px] tracking-widest uppercase opacity-60">Verification_Key::0x{Math.random().toString(16).slice(2, 10).toUpperCase()}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-6">
                                        <a 
                                            href={selectedOperative.portfolio} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-4 px-10 py-5 bg-charcoal text-bone hover:bg-gold-dark transition-all uppercase tracking-[0.3em] text-xs shadow-[10px_10px_0_0_rgba(42,37,34,0.1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 group"
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                            <span>ACCESS_FULL_PORTFOLIO</span>
                                            <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                        </a>
                                        <div className="flex-1" />
                                    </div>
                                    
                                    <div className="mt-12 pt-8 border-t border-charcoal/10 flex items-center justify-between opacity-30">
                                        <span className="font-serif text-[10px] uppercase tracking-widest">XAENITHRA_ARCHIVE_NODE</span>
                                        <Cpu className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
