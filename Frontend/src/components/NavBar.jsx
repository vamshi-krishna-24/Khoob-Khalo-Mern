import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from './StoreContext';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavBar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("Home"); //when we click menu page , it becomes active and underlined 
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();
    const [showProfileOptions, setShowProfileOptions] = useState(false);
    const [nav, setNav] = useState(false);

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    }

    const toggleProfileOptions = () => {
        setShowProfileOptions(prevState => !prevState);
    }

    const toggleNav = () => {
        setNav(!nav);
    }

    const handleCartClick = () => {
        if (getTotalCartAmount() === 0) {
            alert("Add items to cart");
            navigate('/cart');
        } else {
            navigate('/cart');
        }
    }

    return (
        <div className='navbar pt-6 flex justify-between items-center relative z-40'>
            <Link to='/'><img className='logo h-12 w-40 pl-5' src={assets.logokk2} alt="Logo" /></Link>
            <ul className='hidden md:flex gap-5 text-zinc-500 text-xl font-outfit'>
                <Link to='/'
                    className={`${menu === "Home" ? "border-b-2 border-green-700" : ""} text-xl text-zinc-500 px-2 cursor-pointer hover:scale-105 duration-100`}
                    onClick={() => setMenu("Home")}
                >
                    Home
                </Link>
                <li
                    className={`${menu === "Menu" ? "border-b-2 border-green-700" : ""} text-xl text-zinc-500 px-2 cursor-pointer hover:scale-105 duration-100`}
                    onClick={() => setMenu("Menu")}
                >
                    <a href='#explore-menu' smooth={true} duration={500}>Menu</a>
                </li>
                <li
                    className={`${menu === "Mobile-App" ? "border-b-2 border-green-700" : ""} text-xl text-zinc-500 px-2 cursor-pointer hover:scale-105 duration-100`}
                    onClick={() => setMenu("Mobile-App")}
                >
                    <a href='#app-download' smooth={true} duration={500}>Mobile-App</a>
                </li>
                <li
                    className={`${menu === "Contact Us" ? "border-b-2 border-green-700" : ""} text-xl text-zinc-500 px-2 cursor-pointer hover:scale-105 duration-100`}
                    onClick={() => setMenu("Contact Us")}
                >
                    <a href='#footer' smooth={true} duration={500}>Contact Us</a>
                </li>
            </ul>
            <div className='hidden md:flex gap-10 items-center'>
                <img src={assets.search_icon} alt="Search Icon" />
                <div className="navbar-search-icon relative">
                    <div onClick={handleCartClick}>
                        <img className='hover:scale-105 duration-100 cursor-pointer' src={assets.basket_icon} alt="Basket Icon" />
                        <div className={`${getTotalCartAmount() === 0 ? "" : "dot absolute bg-green-600 rounded-md min-w-2 min-h-2 -top-2 -right-2"} `}></div>
                    </div>
                </div>
                {!token ?
                    <button className='text-xl text-green-800 px-3 py-1 cursor-pointer rounded-3xl hover:scale-105 duration-200 hover:bg-slate-200 bg-transparent border border-zinc-600 font-bold' onClick={() => setShowLogin(true)}>
                        Sign In
                    </button>
                    :
                    <div className='relative'>
                        <img src={assets.profile_icon} alt="Profile Icon" className='cursor-pointer hover:scale-105 duration-100' onClick={toggleProfileOptions} />
                        {showProfileOptions && (
                            <ul className='nav-profile-dropdown mt-3 absolute right-0 z-10 bg-green-200 w-28 shadow-lg rounded-lg'>
                                <li onClick={()=>navigate('/myorders')} className='flex items-center p-2 hover:bg-green-300 cursor-pointer hover:rounded-lg' >
                                    <img src={assets.bag_icon} alt="Orders" className='w-5 h-5 mr-2' /><p>Orders</p>
                                </li>
                                <hr className='my-1' />
                                <li onClick={logout} className='flex items-center p-2 hover:bg-green-300 cursor-pointer hover:rounded-lg'>
                                    <img src={assets.logout_icon} alt="Logout" className='w-5 h-5 mr-2' /><p>Logout</p>
                                </li>
                            </ul>
                        )}
                    </div>
                }
            </div>
            <div className='md:hidden flex items-center'>
                <div onClick={toggleNav} className='cursor-pointer text-gray-500'>
                    {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
                </div>
            </div>
            {nav && (
                <div className='absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-green-700 via-green-300 to-blue-300 text-white flex flex-col justify-center items-center z-40 list-none'>
                    <div onClick={toggleNav} className='cursor-pointer absolute top-6 right-6 text-gray-500'>
                        <FaTimes size={30} />
                    </div>
                    <Link to='/'
                        className='px-4 cursor-pointer capitalize py-6 text-4xl'
                        onClick={() => { setMenu("Home"); toggleNav(); }}
                    >
                        Home
                    </Link>
                    <li
                        className='px-4 cursor-pointer capitalize py-6 text-4xl'
                        onClick={() => { setMenu("Menu"); toggleNav(); }}
                    >
                        <a href='#explore-menu' smooth={true} duration={500}>Menu</a>
                    </li>
                    <li
                        className='px-4 cursor-pointer capitalize py-6 text-4xl'
                        onClick={() => { setMenu("Mobile-App"); toggleNav(); }}
                    >
                        <a href='#app-download' smooth={true} duration={500}>Mobile-App</a>
                    </li>
                    <li
                        className='px-4 cursor-pointer capitalize py-4 text-4xl'
                        onClick={() => { setMenu("Contact Us"); toggleNav(); }}
                    >
                        <a href='#footer' smooth={true} duration={500}>Contact Us</a>
                    </li>
                    <div className='flex flex-col items-center gap-4 mt-4'>
                        <div className='flex gap-2 my-1'>
                        <div className='text-4xl'>Search</div></div>
                        <div className="navbar-search-icon relative ">
                            
                            <div onClick={() => { handleCartClick(); toggleNav(); }}>
                                <div className=' my-1 flex gap-2 cursor-pointer'>
                                    <div className='text-4xl text-green-500 font-semibold'>Cart</div>
                                </div>
                            </div>
                            <div className={`${getTotalCartAmount() === 0 ? "" : "dot absolute bg-green-600 rounded-md min-w-2 min-h-2 -top-2 -right-2"} `}></div>
                        </div>
                        {!token ?
                            <button className='text-4xl text-white font-bold mt-2' onClick={() => { setShowLogin(true); toggleNav(); }}>
                                Sign In
                            </button>
                            :
                            <div className='relative'>
                                <img src={assets.profile_icon} alt="Profile Icon" className='cursor-pointer hover:scale-105 duration-100' onClick={() => { toggleProfileOptions(); toggleNav(); }} />
                                {showProfileOptions && (
                                    <ul className='nav-profile-dropdown mt-3 absolute right-0 z-10 bg-green-200 w-28 shadow-lg rounded-lg'>
                                        <li className='flex items-center p-2 hover:bg-green-300 cursor-pointer hover:rounded-lg' onClick={() => { /* Handle Orders Click */ }}>
                                            <img src={assets.bag_icon} alt="Orders" className='w-5 h-5 mr-2' /><p>Orders</p>
                                        </li>
                                        <hr className='my-1' />
                                        <li onClick={logout} className='flex items-center p-2 hover:bg-green-300 cursor-pointer hover:rounded-lg'>
                                            <img src={assets.logout_icon} alt="Logout" className='w-5 h-5 mr-2' /><p>Logout</p>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        }
                    </div>
                </div>
            )}
        </div>
    );
}

export default NavBar;