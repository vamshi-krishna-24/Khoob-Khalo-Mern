import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
    return (
        <div className='footer text-white bg-zinc-500 flex flex-col items-center gap-6 px-4 py-6 mt-10' id='footer'>
            <div className='footer-content w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12'>
                <div className='footer-content-left flex flex-col items-start gap-4'>
                    <a href='#' className='cursor-pointer'>
                        <img src={assets.logokk2} alt="Logo" className='w-32 md:w-72' />
                    </a>
                    <p className='text-sm md:text-base'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse eaque earum error tempora
                    </p>
                    <div className='footer-social-icons flex gap-3 md:gap-4'>
                        <img className='cursor-pointer w-6 md:w-8' src={assets.facebook_icon} alt="Facebook" />
                        <img className='cursor-pointer w-6 md:w-8' src={assets.twitter_icon} alt="Twitter" />
                        <img className='cursor-pointer w-6 md:w-8' src={assets.linkedin_icon} alt="LinkedIn" />
                    </div>
                </div>
                <div className='footer-content-center flex flex-col items-start gap-4'>
                    <h2 className='font-bold text-md md:text-lg'>COMPANY</h2>
                    <ul className='text-sm md:text-base'>
                        <li className='mb-1 cursor-pointer'>Home</li>
                        <li className='mb-1 cursor-pointer'>About Us</li>
                        <li className='mb-1 cursor-pointer'>Delivery</li>
                        <li className='mb-1 cursor-pointer'>Privacy policy</li>
                    </ul>
                </div>
                <div className='footer-content-right flex flex-col items-start gap-4'>
                    <h2 className='font-bold text-md md:text-lg'>GET IN TOUCH</h2>
                    <ul className='text-sm md:text-base'>
                        <li className='mb-1 cursor-pointer'>+1-256-746-1598</li>
                        <li className='mb-1 cursor-pointer'>khoobkhalo@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr className='w-full h-[1px] md:h-[2px] mx-4 md:mx-7 bg-zinc-400 border-none' />
            <p className='copyright-footer text-sm md:text-base'>
                Copyright 2024 © <a className='underline' href='#'>KhoobKhalo.com</a> - All Rights Reserved.
            </p>
        </div>
    );
}

export default Footer;