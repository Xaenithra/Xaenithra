import { useEffect, useState } from 'react';
import Lenis from 'lenis';

import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Team from './sections/Team';
import Projects from './sections/Projects';
import Timeline from './sections/Timeline';
import ThreatMap from './sections/ThreatMap';
import Footer from './sections/Footer';
import GlobalHUD from './components/GlobalHUD';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
    setTimeout(() => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  return (
    <main className="relative min-h-screen text-charcoal bg-bone">
      <div className="grain-overlay" />
      <GlobalHUD isUnlocked={isUnlocked} />
      <CustomCursor />
      <Navigation />

      <div className="relative z-10 flex flex-col">
        <Hero onUnlock={handleUnlock} isUnlocked={isUnlocked} />
        
        {isUnlocked ? (
            <>
                <About />
                <Team />
                <Projects />
                <Timeline />
                <ThreatMap />
                <Footer />
            </>
        ) : (
            <div className="py-32 md:py-48 flex flex-col items-center justify-center border-t border-charcoal/10 opacity-40 select-none pointer-events-none relative overflow-hidden">
                <div className="w-16 h-16 border-2 border-charcoal/20 border-t-charcoal rounded-full animate-spin mb-8" />
                <h2 className="text-2xl font-serif text-charcoal tracking-widest uppercase mb-4">System Locked</h2>
                <p className="font-mono text-sm text-charcoal/60 tracking-widest uppercase">Awaiting valid syndicate credentials...</p>
                
                <div className="mt-16 w-full max-w-sm h-[1px] bg-charcoal/10 relative overflow-hidden">
                     <div className="absolute top-0 left-0 h-full bg-charcoal/40 w-1/3 animate-[slide_2s_ease-in-out_infinite]" />
                     <style>{`
                        @keyframes slide {
                            0% { transform: translateX(-100%); }
                            100% { transform: translateX(300%); }
                        }
                     `}</style>
                </div>
            </div>
        )}
      </div>
    </main>
  );
}

export default App;
