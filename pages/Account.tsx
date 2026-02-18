import React from 'react';
import { User, Package, Heart, LogOut, Settings } from 'lucide-react';

const Account: React.FC = () => {
    // Mock user data
    const user = {
        name: "Rohan Das",
        email: "rohan.das@example.com",
        memberSince: "July 2024"
    };

    return (
        <div className="bg-stone-950 min-h-screen pt-28 pb-16">
            <div className="container mx-auto px-6 max-w-5xl">
                
                <div className="flex items-end justify-between mb-12 pb-6 border-b border-stone-800">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-white uppercase mb-2">My Account</h1>
                        <p className="text-stone-500 text-sm">Welcome back, {user.name}</p>
                    </div>
                    <button className="text-stone-500 hover:text-red-500 flex items-center gap-2 text-xs uppercase tracking-widest transition-colors">
                        <LogOut size={16} /> Sign Out
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <div className="md:col-span-3">
                        <div className="bg-stone-900 p-6 rounded-sm">
                            <div className="flex flex-col items-center mb-8">
                                <div className="w-20 h-20 bg-stone-800 rounded-full flex items-center justify-center text-stone-400 mb-4 border border-stone-700">
                                    <User size={32} />
                                </div>
                                <h3 className="text-white font-bold">{user.name}</h3>
                                <p className="text-xs text-stone-500 uppercase mt-1">Member since {user.memberSince}</p>
                            </div>
                            
                            <nav className="space-y-1">
                                <button className="w-full flex items-center gap-3 text-stone-300 hover:bg-stone-800 p-3 rounded-sm transition-colors text-sm font-medium">
                                    <Package size={18} /> Orders
                                </button>
                                <button className="w-full flex items-center gap-3 text-stone-300 hover:bg-stone-800 p-3 rounded-sm transition-colors text-sm font-medium">
                                    <Heart size={18} /> Wishlist
                                </button>
                                <button className="w-full flex items-center gap-3 text-stone-300 hover:bg-stone-800 p-3 rounded-sm transition-colors text-sm font-medium">
                                    <Settings size={18} /> Settings
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-9 space-y-8">
                        
                        {/* Recent Activity */}
                        <div className="bg-stone-900 border border-stone-800 p-8">
                            <h3 className="text-lg font-serif font-bold text-white uppercase mb-6">Recent Enquiries</h3>
                            <div className="space-y-4">
                                {/* Mock Item */}
                                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between p-4 bg-stone-950 border border-stone-800 hover:border-amber-900 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <img src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=200&q=80" className="w-16 h-16 object-cover" alt="Bike" />
                                        <div>
                                            <h4 className="text-white font-bold text-sm">2017 Royal Enfield Classic 350</h4>
                                            <p className="text-stone-500 text-xs mt-1">Status: <span className="text-amber-500">Processing</span></p>
                                        </div>
                                    </div>
                                    <button className="text-xs uppercase tracking-widest text-white border border-stone-700 px-4 py-2 hover:bg-white hover:text-black transition-colors">
                                        View Details
                                    </button>
                                </div>
                                
                                <div className="p-4 text-center text-stone-600 text-sm italic">
                                    No other recent activity.
                                </div>
                            </div>
                        </div>

                        {/* Profile Details */}
                        <div className="bg-stone-900 border border-stone-800 p-8">
                            <h3 className="text-lg font-serif font-bold text-white uppercase mb-6">Profile Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Full Name</label>
                                    <input type="text" value={user.name} readOnly className="w-full bg-stone-950 border border-stone-800 text-stone-300 px-4 py-3 focus:outline-none focus:border-amber-600" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Email Address</label>
                                    <input type="email" value={user.email} readOnly className="w-full bg-stone-950 border border-stone-800 text-stone-300 px-4 py-3 focus:outline-none focus:border-amber-600" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;