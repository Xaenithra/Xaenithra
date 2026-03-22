import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import logoUrl from '../assets/logo.png';

const Tactical3DGlobe = () => (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-[0.15] z-0">
        <motion.div
            className="w-full h-full relative"
            animate={{ rotateY: 360, rotateX: 20 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
            {/* Longitude / Latitude Rings for 3D Feel */}
            {[...Array(6)].map((_, i) => (
                <div key={`long-${i}`} 
                     className="absolute inset-0 border border-charcoal/40 rounded-full"
                     style={{ transform: `rotateY(${i * 30}deg)` }} />
            ))}
            {[...Array(6)].map((_, i) => (
                <div key={`lat-${i}`} 
                     className="absolute inset-0 border border-charcoal/40 rounded-full"
                     style={{ transform: `rotateX(${i * 30}deg)` }} />
            ))}
            {/* Center Grid */}
            <div className="absolute inset-0 border-2 border-charcoal/10 rounded-full shadow-[inset_0_0_100px_rgba(42,37,34,0.1)]" />
        </motion.div>
    </div>
);

const RotatingEmblem = () => (
    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center mb-12 mx-auto">
        <div className="absolute inset-0 bg-gold-light/10 blur-[60px] rounded-full z-0 transition-opacity duration-1000 animate-pulse" />
        
        <motion.div
            className="absolute inset-0 rounded-full border border-charcoal/20 border-dashed z-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
            className="absolute inset-4 rounded-full border border-charcoal/10 z-10"
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute inset-12 rounded-full flex items-center justify-center overflow-hidden z-20">
            <img src={logoUrl} alt="Xaenithra Logo" className="w-[85%] h-[85%] object-contain drop-shadow-lg" />
        </div>
    </div>
);

type ScriptAction = 
  | { type: 'delay', ms: number }
  | { type: 'type', text: string }
  | { type: 'output', text: string }
  | { type: 'action', action: 'trigger_cursor' };

const SCRIPT: ScriptAction[] = [
    { type: 'delay', ms: 1000 },
    { type: 'type', text: 'ls -a' },
    { type: 'delay', ms: 300 },
    { type: 'output', text: 'readme.txt   unlock.sh   .shadow_credential' },
    { type: 'delay', ms: 800 },
    { type: 'type', text: 'cat .shadow_credential' },
    { type: 'delay', ms: 400 },
    { type: 'output', text: 'FLAG{x4en1thr4_r00t_4cc3ss}' },
    { type: 'delay', ms: 800 },
    { type: 'type', text: './unlock.sh FLAG{x4en1thr4_r00t_4cc3ss}' },
    { type: 'delay', ms: 600 },
    { type: 'output', text: 'AUTHENTICATING...\n[OK] VALID FLAG DETECTED.\n[OK] DECRYPTING CORE DATABASES...\n\nACCESS GRANTED. Overriding physical lock...' },
    { type: 'delay', ms: 800 },
    { type: 'action', action: 'trigger_cursor' }
];

const AutoHackTerminal = ({ onTriggerCursor, isUnlocked }: { onTriggerCursor: () => void, isUnlocked: boolean }) => {
    const [history, setHistory] = useState<{ cmd: string, out: string }[]>([
        { cmd: '', out: 'Xaenithra Secure Terminal [Version 1.0.4]\n(c) Xaenithra Syndicate. All rights reserved.\n\nEstablishing secure connection... OK\nInitiating automated infiltration protocol...' }
    ]);
    const [currentTyping, setCurrentTyping] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [history, currentTyping]);

    // Clear terminal and show welcome message once unlocked
    useEffect(() => {
        if (isUnlocked) {
            setHistory([
                { cmd: '', out: 'Xaenithra Secure Terminal [Version 1.0.4]\n(c) Xaenithra Syndicate. All rights reserved.\n\n[ SYSTEM OVERRIDE SUCCESSFUL ]\n\nWelcome to Xaenithra\'s Official Page.' }
            ]);
            setCurrentTyping('');
            setIsTyping(false);
        }
    }, [isUnlocked]);

    useEffect(() => {
        if (isUnlocked) return; // Halt instantly if already unlocked

        let isActive = true;
        
        const runScript = async () => {
            const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
            
            for (const step of SCRIPT) {
                if (!isActive || isUnlocked) break;

                if (step.type === 'delay') {
                    await sleep(step.ms);
                } else if (step.type === 'type') {
                    setIsTyping(true);
                    let typed = '';
                    for (let i = 0; i < step.text.length; i++) {
                        if (!isActive || isUnlocked) break;
                        typed += step.text[i];
                        setCurrentTyping(typed);
                        await sleep(40);
                    }
                    if (!isActive || isUnlocked) break;
                    await sleep(200);
                    setHistory(prev => [...prev, { cmd: step.text, out: '' }]);
                    setCurrentTyping('');
                    setIsTyping(false);
                } else if (step.type === 'output') {
                    setHistory(prev => {
                        const newHistory = [...prev];
                        newHistory[newHistory.length - 1].out = step.text;
                        return newHistory;
                    });
                } else if (step.type === 'action' && step.action === 'trigger_cursor') {
                    if (isActive && !isUnlocked) {
                        onTriggerCursor();
                    }
                }
            }
        };

        runScript();

        return () => { isActive = false; };
    }, [onTriggerCursor, isUnlocked]);

    return (
        <div className="bg-[#0D0D0D] border border-charcoal/40 rounded-lg shadow-2xl text-left w-full max-w-2xl mx-auto backdrop-blur-md bg-opacity-95 overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 p-4 bg-[#1A1A1A] border-b border-charcoal/40">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 font-mono text-xs text-charcoal/60 uppercase tracking-widest">AUTO_INFILTRATION</span>
            </div>
            
            <div ref={containerRef} className="p-5 font-mono text-sm md:text-base leading-relaxed h-[250px] overflow-y-auto custom-scrollbar">
                {history.map((entry, i) => (
                    <div key={i} className="mb-3">
                        {entry.cmd && (
                            <div className="flex gap-2 mb-1 opacity-90">
                                <span>
                                    <span className="text-green-400 font-bold">bot</span>
                                    <span className="text-gray-400">@</span>
                                    <span className="text-blue-400 font-bold">xaenithra</span>
                                    <span className="text-gray-400">:~#</span>
                                </span>
                                <span className="text-yellow-200">{entry.cmd}</span>
                            </div>
                        )}
                        {entry.out && (
                            <div className="text-gray-300 whitespace-pre-wrap">
                                {entry.out}
                            </div>
                        )}
                    </div>
                ))}

                {isTyping && (
                    <div className="flex gap-2 opacity-90">
                        <span>
                            <span className="text-green-400 font-bold">bot</span>
                            <span className="text-gray-400">@</span>
                            <span className="text-blue-400 font-bold">xaenithra</span>
                            <span className="text-gray-400">:~#</span>
                        </span>
                        <span className="text-yellow-200">
                            {currentTyping}
                            <span className="inline-block w-[0.5em] h-[1em] bg-gray-400 align-middle ml-1 animate-pulse" />
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default function Hero({ onUnlock, isUnlocked }: { onUnlock: () => void, isUnlocked: boolean }) {
    const [showOverride, setShowOverride] = useState(false);
    const [showCursor, setShowCursor] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);

    const handleTriggerCursor = useCallback(() => {
        setShowOverride(true);
        setShowCursor(true);
        setTimeout(() => {
            setButtonClicked(true);
            setTimeout(() => {
                setButtonClicked(false);
                onUnlock();
            }, 300);
        }, 1500); 
    }, [onUnlock]);

    return (
        <section id="hero" className="min-h-screen flex flex-col items-center justify-center relative pt-20 pb-20 overflow-hidden bg-bone">
            {/* Background High-Density Technical Mesh */}
            <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="tacticalGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2A2522" strokeWidth="0.5"/>
                            <circle cx="0" cy="0" r="1.5" fill="#2A2522" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#tacticalGrid)" />
                </svg>
            </div>

            {/* Premium 3D Rotating Wireframe Sphere */}
            <Tactical3DGlobe />

            {/* Faint Background Astrolabe Schematic (Boosted Visibility) */}
            <div className="absolute -bottom-64 -left-64 w-[800px] h-[800px] opacity-[0.08] pointer-events-none text-charcoal z-0">
                <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_120s_linear_infinite]">
                    <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 4" />
                    <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.2" />
                    <path d="M50 2 L50 98 M2 50 L98 50 M16 16 L84 84 M16 84 L84 16" stroke="currentColor" strokeWidth="0.2" />
                </svg>
            </div>
            
            <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <RotatingEmblem />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="text-4xl md:text-5xl lg:text-7xl font-serif text-charcoal mb-8 tracking-[0.2em] uppercase font-light leading-tight drop-shadow-sm"
                >
                    Pwning Boxes.<br />Shipping Code.
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="w-full mb-10"
                >
                    <AutoHackTerminal onTriggerCursor={handleTriggerCursor} isUnlocked={isUnlocked} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.6 }}
                    className="flex flex-col sm:flex-row gap-4 mt-2 font-mono h-16 justify-center items-center relative"
                >
                    {isUnlocked ? (
                        <>
                            <a
                                href="#about"
                                className="px-6 py-4 bg-[#0D0D0D] text-gray-300 text-sm md:text-base border border-[#333] hover:bg-[#1A1A1A] hover:border-charcoal/50 hover:shadow-[0_0_15px_rgba(42,37,34,0.1)] transition-all duration-300 rounded shadow-lg group flex items-center gap-3 cursor-pointer"
                            >
                                <span className="text-charcoal font-bold group-hover:text-gold-dark transition-colors">❯</span> 
                                <span><span className="text-bone/80 italic">cat</span> /whoami</span>
                            </a>
                            <a
                                href="#projects"
                                className="px-6 py-4 bg-[#0D0D0D] text-gray-300 text-sm md:text-base border border-[#333] hover:bg-[#1A1A1A] hover:border-charcoal/50 hover:shadow-[0_0_15px_rgba(42,37,34,0.1)] transition-all duration-300 rounded shadow-lg group flex items-center gap-3 cursor-pointer"
                            >
                                <span className="text-charcoal font-bold group-hover:text-gold-dark transition-colors">❯</span> 
                                <span><span className="text-bone/80 italic">ls</span> -la ./projects</span>
                            </a>
                        </>
                    ) : showOverride ? (
                        <div className="relative">
                            <button className={`px-8 py-4 bg-red-900/20 text-red-500 border border-red-500/50 rounded shadow-[0_0_20px_rgba(239,68,68,0.2)] flex items-center justify-center gap-3 transition-transform duration-100 ${buttonClicked ? 'scale-95 bg-red-500/60 text-white' : ''}`}>
                                <span className="font-bold">⚠</span> 
                                <span>[ EXECUTE OVERRIDE ]</span>
                            </button>
                            {showCursor && (
                                <motion.div 
                                    initial={{ x: 250, y: -200, opacity: 0 }} 
                                    animate={{ x: 50, y: 15, opacity: 1 }} 
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                    className="absolute top-0 left-0 z-50 pointer-events-none"
                                >
                                    <svg width="32" height="48" viewBox="0 0 24 36" fill="none" className="drop-shadow-[0_0_12px_rgba(239,68,68,0.8)] filter">
                                        <path d="M1 1L10 35L14 20L23 15L1 1Z" fill="#ef4444" stroke="#7f1d1d" strokeWidth="1.5" strokeLinejoin="round"/>
                                    </svg>
                                </motion.div>
                            )}
                        </div>
                    ) : (
                        <div className="px-6 py-4 bg-[#0D0D0D]/50 text-gray-600 border border-red-900/40 rounded shadow-lg flex items-center gap-3 cursor-not-allowed">
                            <span className="text-red-900/60 font-bold animate-pulse">✗</span> 
                            <span>[ SYSTEM LOCKED - AWAITING BYPASS ]</span>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
