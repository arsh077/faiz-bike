import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { INVENTORY } from '../constants';
import BikeCard from '../components/BikeCard';
import { ArrowRight, ShieldCheck, Banknote, RefreshCcw } from 'lucide-react';
import { RevealWaveImage } from '../components/ui/reveal-wave-image';
import { GradientButton } from '../components/ui/gradient-button';

const Home: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div className="bg-stone-950 min-h-screen">
            {/* Hero Section */}
            <div ref={targetRef} className="relative h-screen overflow-hidden flex items-center justify-center">
                <motion.div 
                    style={{ y, opacity }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent z-10 pointer-events-none" />
                    <RevealWaveImage 
                        src="https://images.unsplash.com/photo-1558981806-ec527fa84c3d?q=80&w=2070&auto=format&fit=crop"
                        className="w-full h-full"
                        waveAmplitude={0.2}
                        waveFrequency={1.0}
                        revealRadius={0.4}
                    />
                </motion.div>

                <div className="relative z-20 text-center px-4 md:px-6 max-w-4xl mx-auto pointer-events-none">
                    <motion.h1 
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl md:text-7xl font-serif font-bold text-white mb-6 uppercase tracking-wider drop-shadow-lg"
                    >
                        Ride Your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-700">Legacy</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-stone-300 text-lg md:text-xl mb-10 font-light tracking-wide drop-shadow-md"
                    >
                        Kolkata's Premier Destination for Certified Pre-Owned Motorcycles
                    </motion.p>
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="pointer-events-auto"
                    >
                        <Link to="/inventory">
                            <GradientButton size="lg">
                                Explore Inventory <ArrowRight size={16} className="ml-2" />
                            </GradientButton>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Features Banner */}
            <div className="bg-stone-900 py-16 border-y border-stone-800">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center p-6">
                        <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mb-6 text-amber-500 shadow-inner border border-stone-700">
                            <ShieldCheck size={32} />
                        </div>
                        <h3 className="text-white font-serif font-bold text-lg mb-2 uppercase">Certified Quality</h3>
                        <p className="text-stone-400 text-sm">Every bike undergoes a rigorous inspection process before listing.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 border-x-0 md:border-x border-stone-800">
                        <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mb-6 text-amber-500 shadow-inner border border-stone-700">
                            <Banknote size={32} />
                        </div>
                        <h3 className="text-white font-serif font-bold text-lg mb-2 uppercase">Best Valuation</h3>
                        <p className="text-stone-400 text-sm">Guaranteed best resale value and competitive pricing.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6">
                        <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mb-6 text-amber-500 shadow-inner border border-stone-700">
                            <RefreshCcw size={32} />
                        </div>
                        <h3 className="text-white font-serif font-bold text-lg mb-2 uppercase">Easy Exchange</h3>
                        <p className="text-stone-400 text-sm">Seamless exchange process for your old two-wheeler.</p>
                    </div>
                </div>
            </div>

            {/* Featured Section */}
            <div className="py-24 container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="mb-6 md:mb-0">
                        <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2 block">New Arrivals</span>
                        <h2 className="text-3xl md:text-4xl text-white font-serif font-bold uppercase">Latest Collection</h2>
                    </div>
                    <Link to="/inventory">
                        <GradientButton variant="variant" size="sm">
                            View All <ArrowRight size={14} className="ml-2" />
                        </GradientButton>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {INVENTORY.slice(0, 3).map((bike) => (
                        <BikeCard key={bike.id} bike={bike} />
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link to="/inventory">
                        <GradientButton variant="variant" className="w-full">
                            View All Inventory
                        </GradientButton>
                    </Link>
                </div>
            </div>

            {/* Scrolling Banner / Parallax Strip */}
            <div className="relative py-32 overflow-hidden bg-stone-900">
                 <div className="absolute inset-0 opacity-40">
                    <RevealWaveImage 
                        src="https://images.unsplash.com/photo-1605152276897-4f618f831968?q=80&w=2070&auto=format&fit=crop"
                        className="w-full h-full"
                        revealRadius={0.6}
                        waveAmplitude={0.1}
                    />
                 </div>
                <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>
                <div className="relative container mx-auto px-6 text-center pointer-events-none">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 uppercase drop-shadow-lg">Ready to Upgrade?</h2>
                    <p className="text-stone-300 max-w-2xl mx-auto mb-10 text-lg drop-shadow-md">Experience the thrill of a new ride. Exchange your old bike today and get the best market value.</p>
                    <div className="pointer-events-auto inline-block">
                        <Link to="/inventory">
                            <GradientButton size="lg">
                                Book a Test Ride
                            </GradientButton>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;