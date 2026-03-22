import { motion } from 'framer-motion';

const milestones = [
    { event: 'HackData CTF', date: '14 Mar 2026', rank: 'Rank 5', desc: 'Out of 300 teams' },
    { event: 'Bear CTF', date: '21 Feb 2026', rank: 'Top 20', desc: 'International CTF' },
    { event: 'SVNIT Surat', date: '17 Jan 2026', rank: 'Rank 1 — Echelon', desc: 'Secured 1st position.' },
    { event: 'IIT Madras', date: '15 Dec 2025', rank: '6th Position', desc: 'Out of 600+ teams' },
];

export default function Timeline() {
    return (
        <section id="timeline" className="py-32 border-t border-charcoal/10 bg-bone">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-24 text-center"
                >
                    <h2 className="text-3xl md:text-5xl tracking-[0.2em] font-serif uppercase text-charcoal mb-4">Timeboard</h2>
                    <p className="font-sans text-charcoal/50 tracking-widest text-sm uppercase">The Archival Ledger</p>
                </motion.div>

                <div className="relative">
                    {/* Solid vertical line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-charcoal/20" />

                    <div className="space-y-20">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`flex items-center w-full ${index % 2 === 0 ? 'justify-start' : 'justify-end'} relative group cursor-pointer`}
                            >
                                {/* Center Stamped Seal */}
                                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border border-charcoal/30 bg-bone z-10 flex items-center justify-center transition-all duration-500 group-hover:border-gold-muted group-hover:shadow-[0_0_15px_rgba(176,141,87,0.4)]">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gold-dark transition-transform duration-300 group-hover:scale-150" />
                                </div>

                                <div className={`w-[calc(50%-3rem)] ${index % 2 === 0 ? 'text-right' : 'text-left'} transition-all duration-500 group-hover:-translate-y-1`}>
                                    <div className="font-sans text-gold-dark font-medium text-xs tracking-widest uppercase mb-2 transition-colors duration-300 group-hover:text-gold-light">{milestone.date}</div>
                                    <h3 className="font-serif text-2xl md:text-3xl text-charcoal tracking-wide uppercase mb-3 transition-colors duration-300 group-hover:text-gold-dark">{milestone.event}</h3>

                                    <div className="font-sans text-sm font-medium text-charcoal/80 mb-3 px-4 py-1.5 border border-charcoal/10 inline-block bg-white/30 transition-all duration-300 group-hover:border-gold-muted/50 group-hover:bg-gold-light/5">
                                        {milestone.rank}
                                    </div>

                                    <p className="font-serif text-charcoal/60 leading-relaxed text-sm italic group-hover:text-charcoal/80 transition-colors duration-300">
                                        {milestone.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
