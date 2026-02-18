import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { INVENTORY, TERMS_AND_CONDITIONS } from '../constants';
import { Shield, Lock, CreditCard, ChevronDown, ChevronUp } from 'lucide-react';
import { GradientButton } from '../components/ui/gradient-button';

const Payment: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const bikeId = queryParams.get('bikeId');
    const bike = INVENTORY.find(b => b.id === bikeId);
    
    const [agreed, setAgreed] = useState(false);
    const [isTermsOpen, setIsTermsOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [customerName, setCustomerName] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        if (!bike) {
            // In a real app, redirect. For demo, we handle the null check below.
        }
    }, [bike]);

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreed) {
            alert("Please agree to the Terms and Conditions.");
            return;
        }
        if (!customerName || !phone) {
            alert("Please fill in your details.");
            return;
        }

        setIsProcessing(true);

        // Simulate Backend: Save to Local Storage
        const newBooking = {
            id: 'BK-' + Math.floor(Math.random() * 10000),
            date: new Date().toLocaleDateString(),
            customerName,
            phone,
            bikeId: bike?.id,
            bikeTitle: bike?.title,
            amount: '₹ 2,000',
            status: 'Pending Verification'
        };

        const existingBookings = JSON.parse(localStorage.getItem('admin_bookings') || '[]');
        existingBookings.push(newBooking);
        localStorage.setItem('admin_bookings', JSON.stringify(existingBookings));

        setTimeout(() => {
            alert("Order Placed Successfully! We will contact you shortly for the documentation process.");
            setIsProcessing(false);
            navigate('/account'); // Or redirect to a success page
        }, 2000);
    };

    if (!bike) return <div className="min-h-screen bg-stone-950 flex items-center justify-center text-white">Loading Order Details...</div>;

    // Calculate simulated costs
    const basePrice = parseInt(bike.price.replace(/[^\d]/g, ''));
    const rtoCharges = 1500;
    const processingFee = 500;
    const total = basePrice + rtoCharges + processingFee;

    const formatCurrency = (num: number) => "₹ " + num.toLocaleString('en-IN');

    return (
        <div className="bg-stone-950 min-h-screen pt-28 pb-16">
            <div className="container mx-auto px-6 max-w-6xl">
                <h1 className="text-3xl font-serif font-bold text-white uppercase mb-8 border-b border-stone-800 pb-4">Secure Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* Left Column: Form */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Customer Info */}
                        <div className="bg-stone-900 p-8 border border-stone-800 rounded-lg">
                            <h3 className="text-lg font-bold text-white uppercase mb-6 flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs">1</span>
                                Customer Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs text-stone-500 uppercase tracking-widest mb-2">Full Name</label>
                                    <input 
                                        type="text" 
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        className="w-full bg-stone-950 border border-stone-800 text-white p-3 focus:border-amber-500 outline-none rounded-sm" 
                                        placeholder="John Doe" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-stone-500 uppercase tracking-widest mb-2">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full bg-stone-950 border border-stone-800 text-white p-3 focus:border-amber-500 outline-none rounded-sm" 
                                        placeholder="+91 98765 43210" 
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs text-stone-500 uppercase tracking-widest mb-2">Address</label>
                                    <input type="text" className="w-full bg-stone-950 border border-stone-800 text-white p-3 focus:border-amber-500 outline-none rounded-sm" placeholder="Street Address, Area" />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-stone-900 p-8 border border-stone-800 rounded-lg">
                            <h3 className="text-lg font-bold text-white uppercase mb-6 flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs">2</span>
                                Payment Method
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 bg-stone-950 p-4 border border-amber-500/50 rounded-sm">
                                    <input type="radio" name="payment" defaultChecked className="accent-amber-500 w-4 h-4" />
                                    <CreditCard className="text-amber-500" />
                                    <div>
                                        <p className="text-white font-bold text-sm">Booking Amount Only (₹ 2,000)</p>
                                        <p className="text-stone-500 text-xs">Pay the rest upon vehicle inspection.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 bg-stone-950 p-4 border border-stone-800 opacity-60 rounded-sm">
                                    <input type="radio" name="payment" disabled className="accent-amber-500 w-4 h-4" />
                                    <Shield className="text-stone-500" />
                                    <div>
                                        <p className="text-white font-bold text-sm">Full Online Payment</p>
                                        <p className="text-stone-500 text-xs">Currently unavailable for high-value transactions.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* T&C Accordion */}
                        <div className="bg-stone-900 border border-stone-800 rounded-lg overflow-hidden">
                            <button 
                                onClick={() => setIsTermsOpen(!isTermsOpen)}
                                className="w-full flex justify-between items-center p-6 text-left hover:bg-stone-800 transition-colors"
                            >
                                <span className="text-white font-bold uppercase text-sm">Terms and Conditions</span>
                                {isTermsOpen ? <ChevronUp size={18} className="text-stone-400" /> : <ChevronDown size={18} className="text-stone-400" />}
                            </button>
                            
                            {isTermsOpen && (
                                <div className="p-6 border-t border-stone-800 bg-stone-950">
                                    <div className="h-64 overflow-y-auto text-xs text-stone-400 leading-relaxed pr-2 space-y-4 whitespace-pre-line border border-stone-800 p-4 font-mono rounded-sm">
                                        {TERMS_AND_CONDITIONS}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Agreement Checkbox */}
                        <div className="flex items-start gap-3">
                            <input 
                                type="checkbox" 
                                id="agree" 
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="mt-1 accent-amber-600 w-4 h-4" 
                            />
                            <label htmlFor="agree" className="text-stone-400 text-sm">
                                I have read and agree to the <span className="text-white underline cursor-pointer" onClick={() => setIsTermsOpen(true)}>Terms and Conditions</span> regarding vehicle condition, ownership transfer, and return policy.
                            </label>
                        </div>

                        <div onClick={handlePayment} className="w-full">
                            <GradientButton 
                                className="w-full text-lg" 
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Processing...' : `Pay Booking Amount (₹ 2,000)`}
                            </GradientButton>
                        </div>
                    </div>

                    {/* Right Column: Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white text-stone-950 p-6 sticky top-28 rounded-lg shadow-2xl">
                            <h3 className="font-serif font-bold text-xl mb-6 uppercase border-b-2 border-black pb-2">Order Summary</h3>
                            
                            <div className="flex gap-4 mb-6">
                                <img src={bike.imageUrl} alt="Thumbnail" className="w-20 h-20 object-cover bg-stone-200 rounded-sm" />
                                <div>
                                    <p className="font-bold text-sm line-clamp-2">{bike.title}</p>
                                    <p className="text-xs text-stone-600 mt-1">{bike.year} | {bike.kilometers}</p>
                                </div>
                            </div>

                            <div className="space-y-3 text-sm mb-6 border-b border-stone-200 pb-6">
                                <div className="flex justify-between">
                                    <span className="text-stone-600">Vehicle Price</span>
                                    <span className="font-medium">{formatCurrency(basePrice)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-stone-600">RTO Handling</span>
                                    <span className="font-medium">₹ 1,500</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-stone-600">Processing Fee</span>
                                    <span className="font-medium">₹ 500</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-8">
                                <span className="font-bold text-lg uppercase">Total</span>
                                <span className="font-bold text-xl">{formatCurrency(total)}</span>
                            </div>

                            <div className="bg-stone-100 p-4 text-xs text-stone-600 mb-4 flex items-start gap-2 rounded-sm">
                                <Lock size={14} className="mt-0.5 shrink-0" />
                                <p>Transactions are secured with 256-bit encryption. Your details are safe with us.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Payment;