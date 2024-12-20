import React from 'react'
import { assets } from '../assets/assets'

const AppDownload = () => {
    return (
        <div className='app-download m-auto mt-16 text-center font-medium' id='app-download'>
            <p className='text-3xl font-semibold '>For Better Experience Download <br/> <span className='text-5xl font-outfit font-bold text-green-700'>Khoob Khalo App</span> </p>
            <div className="app-download-platforms flex gap-5 justify-center mt-4">
                <img className='max-w-44 cursor-pointer hover:scale-105 duration-200' src={assets.play_store}/>
                <img className='max-w-44 cursor-pointer hover:scale-105 duration-200' src={assets.app_store}/>

            </div>
        
        </div>
    )
    }

export default AppDownload
