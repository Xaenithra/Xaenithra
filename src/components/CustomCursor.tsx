import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('interactive')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
            {/* Main Crosshair Wrapper */}
            <motion.div
                className="absolute flex items-center justify-center"
                style={{ left: 0, top: 0 }}
                animate={{
                    x: mousePosition.x,
                    y: mousePosition.y,
                }}
                transition={{
                    type: 'spring',
                    damping: 40,
                    stiffness: 800,
                    mass: 0.1,
                }}
            >
                {/* Tactical Ring */}
                <motion.div
                    className="absolute border border-charcoal/20 rounded-full flex items-center justify-center p-1"
                    animate={{
                        width: isHovering ? 56 : 32,
                        height: isHovering ? 56 : 32,
                        rotate: isHovering ? 180 : 0,
                        borderColor: isHovering ? 'rgba(42, 37, 34, 0.4)' : 'rgba(42, 37, 34, 0.15)',
                    }}
                >
                    {/* Inner Rotating Gear (only on hover populated with notches) */}
                    <AnimatePresence>
                        {isHovering && (
                            <motion.div
                                initial={{ opacity: 0, rotate: 0 }}
                                animate={{ opacity: 1, rotate: 360 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-0 border-t-2 border-l-2 border-charcoal/30 rounded-full"
                            />
                        )}
                    </AnimatePresence>

                    {/* Simple Precise Crosshair */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        <div className="absolute w-[1px] h-3 bg-charcoal/60" />
                        <div className="absolute h-[1px] w-3 bg-charcoal/60" />
                        
                        {/* Center Dot */}
                        <motion.div 
                            className="w-1 h-1 bg-charcoal rounded-full"
                            animate={{ scale: isClicked ? 0.5 : 1 }}
                        />
                    </div>
                </motion.div>

                {/* Satellite Coordinates Readout */}
                <motion.div
                    className="absolute left-6 top-6 flex flex-col font-mono text-[7px] text-charcoal/40 uppercase tracking-tighter whitespace-nowrap"
                    animate={{ opacity: isHovering ? 0.8 : 0.4 }}
                >
                    <div className="flex gap-2">
                        <span>X_LOC::{Math.round(mousePosition.x)}</span>
                        <span>Y_LOC::{Math.round(mousePosition.y)}</span>
                    </div>
                    <span>SYNC_STATUS::NOMINAL</span>
                </motion.div>

                {/* Locking Brackets on Hover */}
                <AnimatePresence>
                    {isHovering && (
                        <motion.div
                            initial={{ scale: 2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 2, opacity: 0 }}
                            className="absolute w-[70px] h-[70px] pointer-events-none"
                        >
                            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-charcoal" />
                            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-charcoal" />
                            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-charcoal" />
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-charcoal" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Delayed Trailing Tail (Dust) */}
            <motion.div
                className="absolute w-1 h-1 bg-charcoal/10 rounded-full blur-[0.5px]"
                animate={{
                    x: mousePosition.x,
                    y: mousePosition.y,
                }}
                transition={{
                    type: 'spring',
                    damping: 30,
                    stiffness: 100,
                    mass: 0.8,
                }}
            />
        </div>
    );
}
