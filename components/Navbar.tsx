import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User } from 'lucide-react';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navClass = `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== '/' ? 'bg-stone-950/95 backdrop-blur-md py-4 border-b border-stone-800' : 'bg-transparent py-6'
    }`;

    return (
        <nav className={navClass}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl md:text-3xl font-bold tracking-tighter text-white font-serif uppercase">
                    Faiz<span className="text-amber-600">.</span>BikePoint
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-widest uppercase">
                    <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
                    <Link to="/inventory" className="hover:text-amber-500 transition-colors">Motorcycles</Link>
                    <Link to="/account" className="hover:text-amber-500 transition-colors">Account</Link>
                    <Link to="/inventory" className="flex items-center gap-2 bg-white text-black px-5 py-2 hover:bg-amber-500 hover:text-white transition-all duration-300">
                        Shop Now
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button 
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-stone-900 border-b border-stone-800 p-6 flex flex-col space-y-4">
                    <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-amber-500 uppercase tracking-widest text-sm">Home</Link>
                    <Link to="/inventory" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-amber-500 uppercase tracking-widest text-sm">Inventory</Link>
                    <Link to="/account" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-amber-500 uppercase tracking-widest text-sm">Account</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;