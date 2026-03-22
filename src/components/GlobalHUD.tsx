import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function GlobalHUD({ isUnlocked }: { isUnlocked: boolean }) {
    const [hexStream, setHexStream] = useState<string[]>(Array(24).fill('...'));

    useEffect(() => {
        if (!isUnlocked) return;

        const chars = '0123456789ABCDEF';
        const prefixes = ['SYS', 'MEM', 'NET', 'SEC', 'OP'];
        
        const interval = setInterval(() => {
            setHexStream(prev => {
                const lines = [...prev];
                lines.shift();
                
                let nLine = prefixes[Math.floor(Math.random() * prefixes.length)] + '_0x';
                for (let i = 0; i < 8; i++) {
                    nLine += chars[Math.floor(Math.random() * chars.length)];
                }
                
                // Add status
                const roll = Math.random();
                if (roll > 0.95) nLine += ' [WARN]';
                else if (roll > 0.7) nLine += ' [OK]  ';
                else nLine += ' [..]  ';
                
                lines.push(nLine);
                return lines;
            });
        }, 120);

        return () => clearInterval(interval);
    }, [isUnlocked]);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30 mix-blend-difference text-white">
            {/* Corner Framing Brackets */}
            <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-current opacity-30" />
            <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-current opacity-30" />
            <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-current opacity-30" />
            <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-current opacity-30" />

            {/* Thin edge grid markers */}
            <div className="absolute top-0 left-1/4 w-[1px] h-4 bg-current opacity-20" />
            <div className="absolute top-0 right-1/4 w-[1px] h-4 bg-current opacity-20" />
            <div className="absolute bottom-0 left-1/4 w-[1px] h-4 bg-current opacity-20" />
            <div className="absolute bottom-0 right-1/4 w-[1px] h-4 bg-current opacity-20" />
            <div className="absolute left-0 top-1/4 w-4 h-[1px] bg-current opacity-20" />
            <div className="absolute right-0 top-1/4 w-4 h-[1px] bg-current opacity-20" />
            <div className="absolute left-0 bottom-1/4 w-4 h-[1px] bg-current opacity-20" />
            <div className="absolute right-0 bottom-1/4 w-4 h-[1px] bg-current opacity-20" />

            {/* Central Giant Faint Crosshair Map */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 scale-150">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 180, repeat: Infinity, ease: 'linear' }}
                    className="w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] rounded-full border border-current border-dashed opacity-50 flex items-center justify-center p-20 relative"
                >
                    <div className="w-full h-full rounded-full border border-current opacity-30" />
                    <div className="absolute inset-0 w-full h-[1px] bg-current top-1/2 -translate-y-1/2 opacity-20" />
                    <div className="absolute inset-0 h-full w-[1px] bg-current left-1/2 -translate-x-1/2 opacity-20" />
                    
                    {/* Concentric rings */}
                    <motion.div 
                        animate={{ rotate: -720 }}
                        transition={{ duration: 240, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-40 rounded-full border-2 border-current border-dotted opacity-20" 
                    />
                </motion.div>
            </div>

            {/* Scrolling Hex Terminal Feed */}
            {isUnlocked && (
                <div className="absolute top-1/2 right-6 -translate-y-1/2 font-mono text-[9px] tracking-[0.2em] leading-[1.8] opacity-40 text-right hidden lg:block">
                    {hexStream.map((line, i) => (
                        <div key={i} className="whitespace-pre">
                            {line}
                        </div>
                    ))}
                </div>
            )}

            {/* Left coordinate vertical reading */}
            <div className="absolute top-1/2 left-6 -translate-y-1/2 font-mono text-[10px] tracking-[0.4em] opacity-30" style={{ writingMode: 'vertical-rl' }}>
                <span className="transform rotate-180 block">LAT 49.332 // LON 11.201</span>
                <span className="transform rotate-180 block mt-8 opacity-50">SYNC RATE: 144HZ</span>
            </div>

            {/* Bottom Status Ticker */}
            {isUnlocked && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] uppercase hidden sm:flex gap-12 opacity-60">
                    <span>SYS: NOMINAL</span>
                    <span>NET_SECURE_V3.4</span>
                    <span className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" /> 
                        OVERWATCH ACTIVE
                    </span>
                </div>
            )}
        </div>
    );
}
