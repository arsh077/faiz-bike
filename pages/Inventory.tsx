import React, { useState } from 'react';
import { INVENTORY } from '../constants';
import BikeCard from '../components/BikeCard';
import { Filter } from 'lucide-react';

const Inventory: React.FC = () => {
    const [filter, setFilter] = useState('All');
    
    const categories = ['All', 'Motorcycle', 'Scooter', 'Cruiser', 'Sports'];

    const filteredInventory = filter === 'All' 
        ? INVENTORY 
        : INVENTORY.filter(bike => bike.category === filter);

    return (
        <div className="bg-stone-950 min-h-screen pt-24 pb-24">
            <div className="container mx-auto px-6">
                
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white uppercase mb-4">Our Garage</h1>
                    <p className="text-stone-400 max-w-xl mx-auto">Explore our curated collection of premium pre-owned two-wheelers.</p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${
                                filter === cat 
                                ? 'bg-white text-black border-white' 
                                : 'bg-transparent text-stone-500 border-stone-800 hover:border-stone-600 hover:text-white'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredInventory.map((bike) => (
                        <BikeCard key={bike.id} bike={bike} />
                    ))}
                </div>

                {filteredInventory.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-stone-500 text-xl font-serif">No vehicles found in this category.</p>
                        <button 
                            onClick={() => setFilter('All')}
                            className="mt-4 text-amber-500 hover:text-amber-400 underline"
                        >
                            View all vehicles
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inventory;