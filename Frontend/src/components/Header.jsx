import React from 'react';

const Header = () => {
    return (
        <div className='header h-[34vw] my-8 mx-auto bg-no-repeat bg-cover relative rounded-2xl' style={{ backgroundImage: "url('/header1.png')" }}>
            {/* Overlay to dim the background */}
            <div className="absolute inset-0 bg-green-800 bg-opacity-50 rounded-2xl"></div>
            
            <div className="header-content absolute flex flex-col items-start gap-4 bottom-4 left-4 md:bottom-[10%]  md:left-[10%] lg:left-[30%] xl:left-[40%] z-10 p-4 md:p-8 max-w-full md:max-w-[50%]">
                <h2 className="text-2xl md:text-4xl md:pt-3 lg:text-5xl xl:text-6xl font-bold text-white animate-fadeIn">
                    Order your favourite food here
                </h2>
                <p className="text-sm md:text-base lg:text-lg xl:text-xl text-zinc-200 font-outfit animate-fadeIn hidden md:block">
                    Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our Mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
                </p>
                <a href='#explore-menu' smooth={true} duration={500}>
                    <button className="px-3 py-2 md:px-4 md:py-2 lg:px-5 lg:py-3 xl:px-6 xl:py-3 bg-zinc-400 text-white rounded-md hover:bg-zinc-500 font-semibold text-xs md:text-sm lg:text-base xl:text-lg">
                        View Menu
                    </button>
                </a>
            </div>
        </div>
    );
};

export default Header;