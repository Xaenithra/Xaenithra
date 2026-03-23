import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crosshair, Globe, ShieldCheck, Activity, Wifi, ShieldAlert } from 'lucide-react';
import { fetchLiveThreats, type ThreatEvent } from '../services/threatService';

const STATIC_NODES = [
    // `x`/`y` are precomputed from `geoToGrid(lat, lng)` against `public/world.svg`'s mapsvg:geoViewBox.
    { id: 'SZX', label: 'Shenzhen', lat: 22.5431, lng: 114.0579, x: 78.75, y: 42.97 },
    { id: 'TKY', label: 'Tokyo', lat: 35.6762, lng: 139.6503, x: 85.86, y: 33.72 },
    { id: 'SYD', label: 'Sydney', lat: -33.8688, lng: 151.2093, x: 89.08, y: 82.66 },
    { id: 'SGP', label: 'Singapore', lat: 1.3521, lng: 103.8198, x: 75.9, y: 57.88 },
    { id: 'BOM', label: 'Mumbai', lat: 19.076, lng: 72.8777, x: 67.29, y: 45.41 },
    { id: 'DXB', label: 'Dubai', lat: 25.2048, lng: 55.2708, x: 62.4, y: 41.09 },
    { id: 'MOW', label: 'Moscow', lat: 55.7558, lng: 37.6173, x: 57.49, y: 19.59 },
    { id: 'FRA', label: 'Frankfurt', lat: 50.1109, lng: 8.6821, x: 49.44, y: 23.57 },
    { id: 'LHR', label: 'London', lat: 51.5074, lng: -0.1278, x: 46.99, y: 22.58 },
    { id: 'NYC', label: 'New York', lat: 40.7128, lng: -74.006, x: 26.45, y: 30.18 },
    { id: 'SFO', label: 'San Francisco', lat: 37.7749, lng: -122.4194, x: 12.98, y: 32.25 },
    { id: 'GRU', label: 'Sao Paulo', lat: -23.5558, lng: -46.6396, x: 34.06, y: 75.4 },
];

type Payload = {
    id: string;
    source: { x: number, y: number, label: string };
    target: { x: number, y: number, label: string };
    timestamp: string;
    type: string;
    status: 'TRANSMITTING' | 'DEPLOYED';
};

const geoToGrid = (lat: number, lng: number) => {
    // Matches `public/world.svg` -> mapsvg:geoViewBox="-169.110266 83.600842 190.486279 -58.508473"
    const minLng = -169.110266;
    const maxLat = 83.600842;
    const maxLng = 190.486279;
    const minLat = -58.508473;

    const lngSpan = maxLng - minLng;
    let normalizedLng = lng;
    while (normalizedLng < minLng) normalizedLng += lngSpan;
    while (normalizedLng > maxLng) normalizedLng -= lngSpan;

    const x = ((normalizedLng - minLng) / lngSpan) * 100;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 100;

    return {
        x: Math.min(100, Math.max(0, x)),
        y: Math.min(100, Math.max(0, y)),
    };
};

export default function ThreatMap() {
    const [payloads, setPayloads] = useState<Payload[]>([]);
    const [activeLogs, setActiveLogs] = useState<Payload[]>([]);
    const [threatCache, setThreatCache] = useState<ThreatEvent[]>([]);
    const WORLD_MAP_URL = `${import.meta.env.BASE_URL}world.svg`;

    useEffect(() => {
        const refreshThreats = async () => {
            const realData = await fetchLiveThreats();
            if (realData.length > 0) {
                setThreatCache(realData);
            }
        };

        refreshThreats();
        const interval = setInterval(refreshThreats, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (threatCache.length === 0) return;

        const triggerAnimation = () => {
            const threat = threatCache[Math.floor(Math.random() * threatCache.length)];
            const targetNode = STATIC_NODES[Math.floor(Math.random() * STATIC_NODES.length)];
            const srcPos = geoToGrid(threat.lat, threat.lng);
            
            const newPayload: Payload = {
                id: Math.random().toString(36).substr(2, 6).toUpperCase(),
                source: { ...srcPos, label: `${threat.city}, ${threat.country}` },
                target: { x: targetNode.x, y: targetNode.y, label: targetNode.label },
                timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' }),
                type: threat.type,
                status: 'TRANSMITTING'
            };
            
            setPayloads(prev => [...prev.slice(-4), newPayload]);
            setActiveLogs(prev => [newPayload, ...prev.slice(0, 3)]);
            
            setTimeout(() => {
                setPayloads(prev => prev.map(p => p.id === newPayload.id ? { ...p, status: 'DEPLOYED' } : p));
                setActiveLogs(prev => prev.map(p => p.id === newPayload.id ? { ...p, status: 'DEPLOYED' } : p));
            }, 2000);
        };

        triggerAnimation();
        const timer = setInterval(triggerAnimation, 3000);
        return () => clearInterval(timer);
    }, [threatCache]);

    // Decorative static data for the "Tactical Header"
    const tacticalStats = useMemo(() => ({
        threatLevel: 'Elevated',
        uplink: 'Secure',
        nodes: 12,
        active: 5
    }), []);

    return (
        <section id="threats" className="py-24 bg-bone relative overflow-hidden text-charcoal border-t border-charcoal/10 font-sans">
            {/* Massive Background SVG Schematic (Network Mesh) */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" viewBox="0 0 1000 1000">
                <defs>
                    <pattern id="dotGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1" fill="#2A2522" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dotGrid)" />
                <circle cx="500" cy="500" r="400" stroke="#2A2522" strokeWidth="1" fill="none" opacity="0.3" />
                <line x1="100" y1="500" x2="900" y2="500" stroke="#2A2522" strokeWidth="0.5" />
                <line x1="500" y1="100" x2="500" y2="900" stroke="#2A2522" strokeWidth="0.5" />
            </svg>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                
                {/* Tactical Dashboard Header */}
                <div className="mb-12 flex flex-col md:flex-row items-baseline gap-6 border-b border-charcoal/10 pb-8">
                    <div className="flex items-center gap-4">
                        <div className="bg-charcoal p-3 rounded-sm shadow-lg">
                            <Wifi className="w-8 h-8 text-bone animate-pulse" />
                        </div>
                        <div>
                            <h1 className="font-serif text-4xl uppercase tracking-[0.2em] leading-none mb-1">Global Tactical Intel</h1>
                            <p className="font-mono text-[10px] text-charcoal/50 uppercase tracking-[0.4em]">Real-Time Perimeter Monitoring // Unit 762</p>
                        </div>
                    </div>
                    
                    <div className="md:ml-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
                        {[
                            { label: 'Threat Status', value: tacticalStats.threatLevel, icon: ShieldAlert },
                            { label: 'Uplink Integrity', value: tacticalStats.uplink, icon: Globe },
                            { label: 'Obsidian Nodes', value: tacticalStats.nodes, icon: Activity },
                            { label: 'Intercepts', value: tacticalStats.active, icon: Crosshair }
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <span className="font-mono text-[9px] uppercase text-charcoal/40 flex items-center gap-1.5">
                                    <stat.icon className="w-3 h-3" />
                                    {stat.label}
                                </span>
                                <span className="font-serif text-lg uppercase text-charcoal tracking-widest">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col xl:flex-row gap-8 items-stretch pt-4">
                    
                    {/* Telemetry Console (Light Themed) */}
                    <div className="w-full xl:w-1/3 flex flex-col bg-white/60 backdrop-blur-md border border-charcoal/10 shadow-xl p-8 rounded-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-[0.05] pointer-events-none">
                            <h3 className="font-serif text-4xl rotate-90 origin-top-right whitespace-nowrap uppercase tracking-widest">SYNDICATE_DATA</h3>
                        </div>

                        <div className="flex items-center gap-3 mb-8 border-b border-charcoal/20 pb-5">
                            <Activity className="w-6 h-6 text-charcoal" />
                            <h2 className="font-serif text-2xl tracking-widest uppercase text-charcoal">Log Terminal</h2>
                            <div className="ml-auto flex items-center gap-3">
                                <span className="px-2 py-0.5 bg-charcoal text-bone text-[8px] font-mono tracking-widest">LIVE_FEED</span>
                            </div>
                        </div>

                        <div className="flex-1 font-mono text-[11px] overflow-hidden flex flex-col gap-4 min-h-[450px]">
                            <AnimatePresence mode="popLayout">
                                {activeLogs.map((log) => (
                                    <motion.div 
                                        key={`log-${log.id}`}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        className={`border-l-4 pl-4 py-3 flex flex-col gap-1.5 transition-all bg-charcoal/5 group hover:bg-charcoal/[0.08] cursor-crosshair border-charcoal/20 ${
                                            log.status === 'DEPLOYED' ? 'border-charcoal bg-charcoal/10' : ''
                                        }`}
                                    >
                                        <div className="flex items-center justify-between text-[10px] text-charcoal/40">
                                            <span>TIMESTAMP: {log.timestamp}</span>
                                            <span className="font-bold tracking-tighter text-charcoal/80">HASH_ID::{log.id}</span>
                                        </div>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className={`px-2 py-0.5 text-[9px] font-bold tracking-[0.2em] uppercase border ${
                                                log.status === 'TRANSMITTING' 
                                                ? 'text-charcoal/60 border-charcoal/20' 
                                                : 'bg-charcoal text-bone border-charcoal'
                                            }`}>
                                                {log.status === 'TRANSMITTING' ? 'IN_TRANSIT' : 'BREACH_CONFIRMED'}
                                            </span>
                                            <span className="text-charcoal font-bold text-sm truncate uppercase tracking-tight">{log.type}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2 opacity-70">
                                            <Globe className="w-3 h-3" />
                                            <span className="capitalize">{log.source.label}</span>
                                            <span className="text-charcoal/30">→</span>
                                            <span className={`font-bold ${log.status === 'DEPLOYED' ? 'text-charcoal underline' : 'text-charcoal/50'}`}>{log.target.label}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <div className="mt-8 pt-6 border-t border-charcoal/20 flex flex-col gap-4">
                            <div className="flex items-center gap-3 text-charcoal/40">
                                <ShieldCheck className="w-5 h-5" />
                                <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Validated SANS Core Intelligence Feed</span>
                            </div>
                            <div className="flex gap-1">
                                {[...Array(20)].map((_, i) => (
                                    <div key={i} className={`h-1 flex-1 ${i < 12 ? 'bg-charcoal/20' : 'bg-charcoal/5'}`} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tactical Map - High Density Display */}
                    <div
                        className="w-full xl:w-4/5 relative bg-[#f7f2ed] border-2 border-charcoal rounded-sm overflow-hidden shadow-2xl group cursor-none"
                        style={{ aspectRatio: '1009.6727 / 665.96301' }}
                    >
                        
                        {/* Detailed world map (`public/world.svg`) */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-[0.16]"
                            style={{
                                backgroundImage: `url(${WORLD_MAP_URL})`,
                                backgroundSize: '100% 100%',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                mixBlendMode: 'multiply',
                                filter: 'contrast(1.05) saturate(0.9)',
                            }}
                        />

                        {/* Static Grid Lines */}
                        <div className="absolute inset-0 opacity-[0.1] pointer-events-none" 
                             style={{ backgroundImage: 'linear-gradient(#2A2522 1px, transparent 1px), linear-gradient(90deg, #2A2522 1px, transparent 1px)', backgroundSize: '10% 10%' }} />

                        {/* Multiple Radar Elements */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] opacity-[0.03] pointer-events-none rounded-full"
                             style={{ background: 'conic-gradient(from 0deg, transparent 0 340deg, #2A2522 360deg)' }}
                        >
                            <motion.div className="w-full h-full" animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} style={{ borderRadius: '50%', background: 'inherit' }} />
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-[0.05] pointer-events-none rounded-full border border-charcoal/20" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] opacity-[0.05] pointer-events-none rounded-full border border-charcoal/20 shadow-[0_0_50px_rgba(42,37,34,0.1)]" />

                        {/* Top Right Coordinate Readout */}
                        <div className="absolute top-6 right-6 z-40 bg-charcoal p-3 border border-bone shadow-2xl flex flex-col gap-1 min-w-[140px]">
                            <p className="font-mono text-[8px] text-bone/50 tracking-tighter">GLOBAL_SECTOR_READOUT</p>
                            <div className="flex justify-between items-center">
                                <span className="font-serif text-xs text-bone tracking-widest uppercase">Sec-094</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-bone animate-pulse" />
                            </div>
                        </div>

                        {/* SVG Drawing Layer */}
                        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-10" preserveAspectRatio="none">
                            <AnimatePresence>
                                {payloads.map(p => (
                                    <g key={`group-${p.id}`}>
                                        <motion.line
                                            x1={p.source.x} y1={p.source.y}
                                            x2={p.target.x} y2={p.target.y}
                                            stroke="#2A2522"
                                            strokeWidth="0.8"
                                            strokeDasharray="1, 3"
                                            initial={{ pathLength: 0, opacity: 0.8 }}
                                            animate={{ pathLength: 1, opacity: [0.8, 0.4, 0] }}
                                            transition={{ duration: 3, ease: "linear" }}
                                        />
                                        {/* Particle Stream */}
                                        <motion.circle
                                            r="0.6"
                                            fill="#2A2522"
                                            initial={{ cx: p.source.x, cy: p.source.y }}
                                            animate={{ cx: p.target.x, cy: p.target.y }}
                                            transition={{ duration: 2, ease: "easeInOut" }}
                                        >
                                            <animate attributeName="r" values="0.6;1.2;0.6" dur="0.5s" repeatCount="indefinite" />
                                        </motion.circle>
                                    </g>
                                ))}
                            </AnimatePresence>
                        </svg>

                        {/* Grid Corner Brackets */}
                        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-charcoal opacity-40" />
                        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-charcoal opacity-40" />
                        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-charcoal opacity-40" />
                        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-charcoal opacity-40" />

                        {/* Static Map Nodes with ID Labels */}
                        {STATIC_NODES.map(node => (
                            <div
                                key={node.id}
                                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group/node"
                                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                            >
                                <div className="w-1.5 h-1.5 bg-charcoal/30 border border-charcoal/40 rounded-full group-hover/node:scale-150 transition-transform" />
                                <span className="absolute bottom-full mb-1 opacity-0 group-hover/node:opacity-100 transition-opacity font-mono text-[7px] bg-charcoal text-bone px-1 py-0.5 pointer-events-none">
                                    NODE::{node.id}
                                </span>
                            </div>
                        ))}

                        {/* Dynamic Breach Indicators (When Deployed) */}
                        <AnimatePresence>
                            {payloads.map(p => (
                                <motion.div
                                    key={`impact-${p.id}`}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    className="absolute -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
                                    style={{ left: `${p.target.x}%`, top: `${p.target.y}%` }}
                                >
                                    {p.status === 'DEPLOYED' && (
                                        <div className="relative">
                                            <div className="w-4 h-4 bg-charcoal rounded-sm shadow-2xl border border-bone flex items-center justify-center">
                                                <Activity className="w-2 h-2 text-bone animate-spin-slow" />
                                            </div>
                                            <div className="absolute -inset-2 bg-charcoal/20 rounded-full animate-ping" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Bottom Status Scale */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[80%] z-40 flex flex-col gap-2">
                            <div className="flex justify-between font-mono text-[7px] text-charcoal/40 uppercase tracking-widest">
                                <span>Scanning Vector Alpha</span>
                                <span>100% Signal Stability</span>
                            </div>
                            <div className="h-[2px] w-full bg-charcoal/10 relative overflow-hidden">
                                <motion.div 
                                    className="absolute top-0 left-0 h-full bg-charcoal w-[30%]"
                                    animate={{ x: ['0%', '233%'] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                                />
                            </div>
                        </div>

                        {/* Watermark */}
                        <div className="absolute top-1/2 left-4 -translate-y-1/2 vertical-text font-serif text-[40px] opacity-[0.02] select-none pointer-events-none uppercase tracking-[0.5em]">
                            Xaenithra Operative Grid
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                .vertical-text {
                    writing-mode: vertical-rl;
                    text-orientation: mixed;
                }
                .cursor-none {
                    cursor: none !important;
                }
                .animate-spin-slow {
                    animation: spin 6s linear infinite;
                }
            `}</style>
        </section>
    );
}
