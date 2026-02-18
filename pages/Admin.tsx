import React, { useState, useEffect } from 'react';
import { Package, Search, Trash2 } from 'lucide-react';
import { GradientButton } from '../components/ui/gradient-button';

interface Booking {
    id: string;
    date: string;
    customerName: string;
    phone: string;
    bikeId: string;
    bikeTitle: string;
    amount: string;
    status: string;
}

const Admin: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        const storedBookings = localStorage.getItem('admin_bookings');
        if (storedBookings) {
            setBookings(JSON.parse(storedBookings));
        }
    }, []);

    const clearData = () => {
        if(confirm("Are you sure you want to clear all booking data?")) {
            localStorage.removeItem('admin_bookings');
            setBookings([]);
        }
    }

    return (
        <div className="bg-stone-950 min-h-screen pt-28 pb-16">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-stone-800 pb-6">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-white uppercase mb-2">Admin Dashboard</h1>
                        <p className="text-stone-500 text-sm">Manage bookings and customer enquiries.</p>
                    </div>
                    <div className="flex gap-4 mt-4 md:mt-0">
                         <button 
                            onClick={clearData}
                            className="text-red-500 hover:text-red-400 flex items-center gap-2 text-xs uppercase tracking-widest border border-red-900 px-4 py-2 rounded"
                        >
                            <Trash2 size={14} /> Clear Data
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-stone-900 p-6 rounded-lg border border-stone-800">
                        <div className="text-stone-500 text-xs uppercase tracking-widest mb-2">Total Bookings</div>
                        <div className="text-3xl font-bold text-white">{bookings.length}</div>
                    </div>
                    <div className="bg-stone-900 p-6 rounded-lg border border-stone-800">
                        <div className="text-stone-500 text-xs uppercase tracking-widest mb-2">Pending Verification</div>
                        <div className="text-3xl font-bold text-amber-500">{bookings.length}</div>
                    </div>
                    <div className="bg-stone-900 p-6 rounded-lg border border-stone-800">
                        <div className="text-stone-500 text-xs uppercase tracking-widest mb-2">Revenue (Simulated)</div>
                        <div className="text-3xl font-bold text-emerald-500">₹ {(bookings.length * 2000).toLocaleString()}</div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-stone-900 border border-stone-800 rounded-lg overflow-hidden">
                    <div className="p-4 border-b border-stone-800 flex justify-between items-center bg-stone-900">
                        <h3 className="text-white font-bold uppercase text-sm">Recent Bookings</h3>
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                            <input 
                                type="text" 
                                placeholder="Search ID..." 
                                className="bg-stone-950 border border-stone-800 rounded-full pl-8 pr-4 py-1 text-xs text-white focus:border-amber-500 outline-none w-48"
                            />
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-stone-400">
                            <thead className="bg-stone-950 text-stone-500 uppercase text-xs font-bold tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Vehicle</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-800">
                                {bookings.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-stone-600 italic">
                                            No bookings found. Go to the payment page to simulate an order.
                                        </td>
                                    </tr>
                                ) : (
                                    bookings.map((booking, idx) => (
                                        <tr key={idx} className="hover:bg-stone-800/50 transition-colors">
                                            <td className="px-6 py-4 font-mono text-white">{booking.id}</td>
                                            <td className="px-6 py-4">{booking.date}</td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-white">{booking.customerName}</div>
                                                <div className="text-xs">{booking.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 text-white">{booking.bikeTitle}</td>
                                            <td className="px-6 py-4 text-emerald-500 font-bold">{booking.amount}</td>
                                            <td className="px-6 py-4">
                                                <span className="bg-amber-900/30 text-amber-500 border border-amber-900 px-2 py-1 rounded text-xs font-bold uppercase">
                                                    {booking.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;