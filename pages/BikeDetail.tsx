import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { INVENTORY } from '../constants';
import { ArrowLeft, Check, Calendar, Gauge, Award, Tag } from 'lucide-react';
import { RevealWaveImage } from '../components/ui/reveal-wave-image';
import { GradientButton } from '../components/ui/gradient-button';

const BikeDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const bike = INVENTORY.find(b => b.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!bike) {
        return (
            <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center text-white">
                <h2 className="text-2xl font-serif mb-4">Bike Not Found</h2>
                <Link to="/inventory" className="text-amber-500 hover:underline">Return to Inventory</Link>
            </div>
        );
    }

    return (
        <div className="bg-stone-950 min-h-screen pt-20">
            {/* Breadcrumb */}
            <div className="container mx-auto px-6 py-4">
                <Link to="/inventory" className="inline-flex items-center text-stone-500 hover:text-white text-xs uppercase tracking-widest transition-colors">
                    <ArrowLeft size={14} className="mr-2" /> Back to Inventory
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
                {/* Image Section */}
                <div className="relative h-[50vh] lg:h-auto bg-stone-900 overflow-hidden">
                    <RevealWaveImage 
                        src={bike.imageUrl}
                        className="w-full h-full"
                        revealRadius={0.4}
                        waveAmplitude={0.08}
                        pixelSize={2}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                        <span className="bg-amber-600 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider inline-block mb-2 shadow-lg">
                            {bike.condition}
                        </span>
                    </div>
                </div>

                {/* Details Section */}
                <div className="p-8 lg:p-16 flex flex-col justify-center">
                    <span className="text-stone-500 text-sm uppercase tracking-[0.2em] mb-2">{bike.category}</span>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-white uppercase mb-6 leading-tight">
                        {bike.title}
                    </h1>
                    
                    <p className="text-3xl text-amber-500 font-bold mb-8 font-serif">{bike.price}</p>

                    <p className="text-stone-300 leading-relaxed mb-10 border-l-2 border-stone-700 pl-4">
                        {bike.description}
                    </p>

                    <div className="grid grid-cols-2 gap-6 mb-12">
                        <div className="flex items-center gap-3 text-stone-300">
                            <Calendar className="text-stone-500" />
                            <div>
                                <span className="block text-xs text-stone-500 uppercase tracking-wider">Year</span>
                                <span className="font-bold">{bike.year}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-stone-300">
                            <Gauge className="text-stone-500" />
                            <div>
                                <span className="block text-xs text-stone-500 uppercase tracking-wider">Driven</span>
                                <span className="font-bold">{bike.kilometers}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-stone-300">
                            <Award className="text-stone-500" />
                            <div>
                                <span className="block text-xs text-stone-500 uppercase tracking-wider">Condition</span>
                                <span className="font-bold">{bike.condition}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-stone-300">
                            <Tag className="text-stone-500" />
                            <div>
                                <span className="block text-xs text-stone-500 uppercase tracking-wider">Posted</span>
                                <span className="font-bold">{bike.postedTime}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Link to={`/payment?bikeId=${bike.id}`} className="w-full">
                            <GradientButton className="w-full h-14 text-lg">
                                Book Now
                            </GradientButton>
                        </Link>
                        <p className="text-center text-stone-500 text-xs mt-2">
                            <Check size={12} className="inline mr-1" />
                            Verified Seller | Secure Payment
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BikeDetail;