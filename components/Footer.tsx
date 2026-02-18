import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-stone-950 text-stone-400 border-t border-stone-900 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <h3 className="text-white text-xl font-serif font-bold mb-6 uppercase">Faiz Bike Point</h3>
                        <p className="text-sm leading-relaxed mb-6">
                            We provide best resale value on exchange vehicles and sell premium pre-owned bikes at reasonable prices across Kolkata. Member since Jul 2018.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-serif font-bold mb-6 uppercase tracking-wider">Motorcycles</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-amber-500 transition-colors">Royal Enfield</a></li>
                            <li><a href="#" className="hover:text-amber-500 transition-colors">Suzuki</a></li>
                            <li><a href="#" className="hover:text-amber-500 transition-colors">Yamaha</a></li>
                            <li><a href="#" className="hover:text-amber-500 transition-colors">Honda</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-serif font-bold mb-6 uppercase tracking-wider">Support</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-amber-500 transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-amber-500 transition-colors">Test Ride</a></li>
                            <li><a href="#" className="hover:text-amber-500 transition-colors">Finance Options</a></li>
                            <li><a href="#" className="hover:text-amber-500 transition-colors">Terms & Conditions</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-serif font-bold mb-6 uppercase tracking-wider">Visit Us</h4>
                        <div className="space-y-4 text-sm">
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="text-amber-500 shrink-0 mt-1" />
                                <span>Kolkata Region, West Bengal, India</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-amber-500 shrink-0" />
                                <span>+91 98765 43210</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-amber-500 shrink-0" />
                                <span>sales@faizbikepoint.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-stone-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-600">
                    <p>&copy; 2024 Faiz Bike Point. All Rights Reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-stone-400">Privacy Policy</a>
                        <a href="#" className="hover:text-stone-400">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;