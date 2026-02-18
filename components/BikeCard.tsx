import React from 'react';
import { Bike } from '../types';
import { Link } from 'react-router-dom';
import { ArrowRight, Gauge, Calendar } from 'lucide-react';
import { RevealWaveImage } from './ui/reveal-wave-image';
import { GradientButton } from './ui/gradient-button';

interface BikeCardProps {
    bike: Bike;
}

const BikeCard: React.FC<BikeCardProps> = ({ bike }) => {
    return (
        <div className="group block bg-stone-900 overflow-hidden hover:bg-stone-800 transition-all duration-500 rounded-lg border border-stone-800 shadow-xl">
            <div className="relative aspect-[4/3] overflow-hidden">
                <div className="absolute inset-0 w-full h-full z-10">
                    <RevealWaveImage 
                        src={bike.imageUrl} 
                        className="w-full h-full"
                        revealRadius={0.4}
                        waveAmplitude={0.05}
                    />
                </div>
                <div className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider z-20 shadow-md">
                    {bike.condition}
                </div>
            </div>
            
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-serif font-bold text-white uppercase group-hover:text-amber-500 transition-colors line-clamp-2">
                        {bike.title}
                    </h3>
                </div>
                
                <p className="text-stone-400 text-xs mb-4 uppercase tracking-widest">{bike.category}</p>
                
                <div className="flex items-center gap-4 mb-6 text-stone-500 text-sm">
                    <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{bike.year}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Gauge size={14} />
                        <span>{bike.kilometers}</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between border-t border-stone-800 pt-4 gap-4">
                    <span className="text-xl font-bold text-white">{bike.price}</span>
                    <Link to={`/bike/${bike.id}`} className="w-full sm:w-auto">
                        <GradientButton size="sm" className="w-full sm:w-auto">
                           Details <ArrowRight size={14} className="ml-2"/>
                        </GradientButton>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BikeCard;