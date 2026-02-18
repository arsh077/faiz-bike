import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import BikeDetail from './pages/BikeDetail';
import Account from './pages/Account';
import Payment from './pages/Payment';
import Admin from './pages/Admin';

const App: React.FC = () => {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/inventory" element={<Inventory />} />
                        <Route path="/bike/:id" element={<BikeDetail />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/admin" element={<Admin />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;