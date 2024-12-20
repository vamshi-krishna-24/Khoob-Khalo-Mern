import React, { useState } from 'react';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import SuccessPage from './pages/SuccessPage';
import FailurePage from './pages/FailurePage';
import Footer from './components/Footer';
import LoginPopup from './components/LoginPopup';
import MyOrders from './pages/MyOrders';
import { Toaster } from 'react-hot-toast';

const App = () => {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <>
            {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}
            <div className='px-5 app scroll-smooth'>
                <NavBar setShowLogin={setShowLogin} />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/order' element={<PlaceOrder />} />
                    <Route path='/success' element={<SuccessPage />} />
                    <Route path='/failure' element={<FailurePage />} />
                    <Route path='/myorders' element={<MyOrders />} />
                    
                </Routes>
                <Toaster/>
            </div>
            <Footer />
        </>
    );
};

export default App;
