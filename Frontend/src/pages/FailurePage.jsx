import React from 'react';
import { Link } from 'react-router-dom';
import failureGif from '../assets/FailureAnimation.gif'; // Make sure to replace this with the actual path and file name of your failure animation

const FailurePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <div className="mb-6">
                    <img src={failureGif} alt="Failure animation" className="w-47 h-40 mx-auto" />
                </div>
                <h1 className="text-3xl font-bold mb-4 text-gray-800">Order Placement Failed</h1>
                <p className="text-lg mb-6 text-gray-600">
                    There was an issue placing your order. Please try again later.
                </p>
                <Link 
                    to="/" 
                    className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Go back to Home
                </Link>
            </div>
        </div>
    );
};

export default FailurePage;
