import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Github, ExternalLink, Hexagon, Database, Power } from 'lucide-react';

const projects = [
    { 
        id: 'SEC-01', 
        title: 'ASTRA', 
        desc: 'Advanced Surveillance & Threat Recognition Architecture.', 
        fullDesc: 'ASTRA is a multimodal authenticity detector for images, videos, and URLs. It uses FastAPI + PyTorch (XceptionNet, MTCNN) with Grad-CAM explainability and a Next.js dashboard.', 
        features: ['Real-time Network Auditing', 'Deepfake Inversion Engine', 'Threat Vector Hunting', 'Media Integrity Validation'],
        techStack: ['Python', 'Next.JS', ' Computer Vision', 'Deepfake Detection', 'Multimodal AI', 'Explainable AI (XAI)'],
        image: '/Astra2.png', 
        link: 'https://www.instagram.com/p/DVVdY4RjZzW/?img_index=1',
        icon: ExternalLink
    },
    { 
        id: 'SEC-02', 
        title: 'TRINETRA SUITE', 
        desc: 'Digital Assembly Line & Forensic Extraction Core.', 
        fullDesc: 'The TriNetra suite provides a unified pipeline for forensic data ingestion and automated reporting. Built to handle complex digital archives with military-grade efficiency, it ensures no trace is left unanalyzed.', 
        features: ['Indrajaal Extraction Core', 'Automated Dossier Generation', 'Encrypted Archive Processing', 'Forensic Timeline Recon'],
        techStack: ['Rust', 'ADB Shell', 'Digital Forensics', 'Malware Analysis', 'Logs Organizer'],
        image: '/Trinetra.png', 
        link: 'https://github.com/utxdev/Xaenithra-ps6-investigation',
        icon: Github
    },
    { 
        id: 'SEC-03', 
        title: 'ENCODED GRID', 
        desc: 'Zero-Trust Secure Communication Mesh.', 
        fullDesc: "A closed-circuit communication matrix utilizing Pre-Shared Static Artifacts (PSSA). Operating on a 'blind relay' architecture, it eliminates the possibility of traffic analysis even at the ISP layer.", 
        features: ['Zero-Knowledge Signal', 'Static Artifact Encryption', 'PSSA Validation Loop', 'Hostile Grid Operation'],
        techStack: ['Go (Golang)', 'Libsodium', 'WebSockets', 'Docker / K8s'],
        image: '/img_encoded.png', 
        link: 'https://github.com/utxdev/Xaenithra-Encoded',
        icon: Github
    },
    { 
        id: 'SEC-04', 
        title: 'COMPANIO', 
        desc: 'Empathetic Human-AI Interface for Isolation Mitigation.', 
        fullDesc: 'Harnessing the Google Gemini multimodal model, Companio provides high-fidelity voice interaction through the persona of "Leda". Designed for the elderly, it functions as a companion that truly listens.', 
        features: ['Leda Multimodal Persona', 'Real-time Voice Synthesis', 'Empathetic Response Logic', 'Integrated Life-Link Tools'],
        techStack: ['Gemini Multimodal API', 'Custom Model', 'Express', 'Vite / React'],
        image: '/Companio.png', 
        link: 'https://github.com/utxdev/Companio',
        icon: Github
    },
];

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

    return (
        <section id="projects" className="py-32 relative border-t-2 border-charcoal/10 bg-bone min-h-screen overflow-hidden">
            {/* High-Visibility Hexagonal Grid Background */}
            <div className="absolute inset-0 opacity-[0.1] pointer-events-none z-0" 
                 style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'100\' viewBox=\'0 0 60 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l25.98 15v30L30 60 4.02 45V15zM30 100l25.98-15v-30L30 40 4.02 55v30z\' fill=\'none\' stroke=\'%232A2522\' stroke-width=\'1.5\'/%3E%3C/svg%3E")', backgroundSize: '60px 100px' }} 
            />

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-32 text-center"
                >
                    <div className="inline-flex items-center gap-4 mb-4">
                        <Hexagon className="w-8 h-8 text-gold-dark animate-spin-slow" />
                        <h2 className="text-3xl md:text-5xl tracking-[0.3em] font-serif uppercase text-charcoal">Offensive Arsenal</h2>
                        <Hexagon className="w-8 h-8 text-gold-dark animate-spin-slow" />
                    </div>
                    <p className="font-mono text-[10px] text-charcoal/40 tracking-[0.4em] uppercase">Chapter 3 : Archive Classification</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, delay: index * 0.15 }}
                            onClick={() => setSelectedProject(project)}
                            className="group cursor-pointer bg-white/40 backdrop-blur-sm border-2 border-charcoal/10 overflow-hidden hover:border-gold-dark transition-all duration-700 shadow-xl hover:-translate-y-3 flex flex-col rounded-sm relative"
                        >
                            {/* Card Brackets */}
                            <div className="absolute top-4 left-4 w-4 h-[1px] bg-charcoal/20 group-hover:bg-gold-dark transition-colors" />
                            <div className="absolute top-4 left-4 h-4 w-[1px] bg-charcoal/20 group-hover:bg-gold-dark transition-colors" />
                            
                            <div className="h-72 overflow-hidden relative border-b-2 border-charcoal/10 bg-charcoal">
                                <motion.img 
                                    src={project.image} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000" 
                                />
                                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-charcoal/80 to-transparent flex items-end p-4">
                                     <div className="w-full h-[1px] bg-gold-dark/40" />
                                </div>
                            </div>
                            
                            <div className="p-10 flex-1 flex flex-col relative bg-[#FDFCF8]/80 group-hover:bg-white transition-colors duration-700">
                                {/* <div className="absolute top-0 right-10 -translate-y-1/2 bg-charcoal text-bone px-4 py-1 font-mono text-xs tracking-widest shadow-2xl group-hover:bg-gold-dark transition-colors">
                                    {project.id}
                                </div> */}
                                
                                <h3 className="font-serif text-2xl text-charcoal tracking-widest uppercase mb-4 transition-all duration-500 group-hover:tracking-[0.2em]">{project.title}</h3>
                                <p className="font-sans text-charcoal/70 leading-relaxed text-[13px] mb-8 flex-1 italic">
                                    {project.desc}
                                </p>
                                
                                <div className="inline-flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase font-bold text-charcoal/40 group-hover:text-gold-dark transition-all duration-500">
                                    <Database className="w-4 h-4" />
                                    DECRYPT_PROJECT_CORE <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal Overlay (Premium High-Density Redesign) */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-charcoal/90 backdrop-blur-xl"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 100, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 100, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-bone border-4 border-charcoal w-full max-w-6xl max-h-[92vh] overflow-y-auto flex flex-col lg:flex-row shadow-[0_0_100px_rgba(0,0,0,0.8)] relative rounded-sm"
                        >
                            {/* Premium Header Bar */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gold-dark" />
                            
                            <button 
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-6 right-6 z-[110] w-12 h-12 bg-charcoal text-bone flex items-center justify-center hover:bg-gold-dark transition-all rounded-sm shadow-xl group"
                            >
                                <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                            </button>

                            <div className="w-full lg:w-1/2 h-80 lg:h-auto border-b-2 lg:border-b-0 lg:border-r-2 border-charcoal bg-charcoal relative">
                                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/20 to-transparent pointer-events-none" />
                                {/* <div className="absolute bottom-10 left-10 p-4 border border-bone/20 backdrop-blur-sm bg-black/40 text-bone font-mono text-[10px] tracking-widest uppercase">
                                    IMAGE_VERIFICATION::PASS
                                </div> */}
                            </div>

                            <div className="w-full lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center relative bg-bone">
                                {/* Technical Stamps Background */}
                                <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none">
                                    <Hexagon className="w-96 h-96 rotate-12" />
                                </div>

                                <div className="font-serif text-6xl text-charcoal/5 font-black mb-2 absolute -top-4 -left-4">{selectedProject.id}</div>
                                <h3 className="font-serif text-4xl text-charcoal uppercase tracking-[0.2em] mb-10 border-b-2 border-charcoal/10 pb-4">{selectedProject.title}</h3>
                                
                                <p className="font-sans text-charcoal/80 leading-loose text-[15px] mb-12 italic border-l-2 border-gold-dark pl-6">
                                    {selectedProject.fullDesc}
                                </p>

                                <div className="grid grid-cols-1 gap-10 mb-12">
                                    <div>
                                        <h4 className="font-serif text-xs font-bold tracking-[.3em] uppercase text-charcoal mb-6 flex items-center gap-3">
                                            <Power className="w-4 h-4 text-gold-dark" />
                                            CAPABILITIES_LIST
                                        </h4>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                                            {selectedProject.features.map((feature, i) => (
                                                <li key={i} className="flex items-center gap-3 text-sm text-charcoal/70 font-sans border-b border-charcoal/5 pb-1">
                                                    <span className="text-gold-dark font-bold">»</span> 
                                                    <span className="tracking-wide">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-serif text-xs font-bold tracking-[.3em] uppercase text-charcoal mb-6 flex items-center gap-3">
                                            <Hexagon className="w-4 h-4 text-gold-dark" />
                                            ENGINE_SPECIFICATIONS
                                        </h4>
                                        <div className="flex flex-wrap gap-3">
                                            {selectedProject.techStack.map((tech, i) => (
                                                <span key={i} className="px-4 py-2 border-2 border-charcoal/10 bg-white/40 font-mono text-[10px] tracking-[.15em] uppercase text-charcoal/90 hover:bg-charcoal hover:text-bone hover:border-charcoal transition-all cursor-crosshair">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <a 
                                    href={selectedProject.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-4 px-10 py-5 bg-charcoal text-bone hover:bg-gold-dark transition-all uppercase tracking-[0.3em] text-xs self-start group shadow-[10px_10px_0_0_rgba(42,37,34,0.1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                                >
                                    <selectedProject.icon className="w-5 h-5" />
                                    <span>DECRYPT PROJECT CORE</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 15s linear infinite;
                }
            `}</style>
        </section>
    );
}
