    import React, { useState, useContext } from 'react';
    import { assets } from '../assets/assets';
    import { StoreContext } from './StoreContext';
    import axios from 'axios';

    const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Login");
    const { url, setToken } = useContext(StoreContext);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if (currState === "Login") {
        newUrl += "/api/user/login";
        } else {
        newUrl += "/api/user/register";
        }

        try {
        const response = await axios.post(newUrl, data);
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
        } else {
            alert(response.data.message);
        }
        } catch (error) {
        alert("An error occurred. Please try again.");
        console.error("Login/Register Error:", error);
        }
    };

    return (
        <div className='login-popup absolute inset-0 z-50 flex items-center justify-center bg-slate-900 bg-opacity-75 w-full h-full'>
        <form
            onSubmit={onLogin}
            className="login-popup-container place-self-center w-[max(23vw,330px)] text-zinc-800 bg-white flex flex-col gap-6 px-6 py-7 rounded-lg text-sm animate-fadeIn"
        >
            <div className="login-popup-title flex justify-between items-center text-green-800 font-serif text-xl font-bold">
            <h2>{currState}</h2>
            <img
                className='w-4 cursor-pointer'
                src={assets.cross_icon}
                onClick={() => setShowLogin(false)}
                alt="Close"
            />
            </div>
            <div className="login-popup-inputs flex flex-col gap-5">
            {currState === "Sign Up" && (
                <input
                name='name'
                onChange={onChangeHandler}
                value={data.name}
                className='outline-none border border-slate-400 p-2 rounded'
                type="text"
                placeholder="Your Name"
                required
                />
            )}
            <input
                name='email'
                onChange={onChangeHandler}
                value={data.email}
                className='outline-none border border-slate-400 p-2 rounded'
                type='email'
                placeholder='Your Email'
                required
            />
            <input
                name='password'
                onChange={onChangeHandler}
                value={data.password}
                className='outline-none border border-slate-400 p-2 rounded'
                type="password"
                placeholder="Password"
                required
            />
            </div>
            <button
            type='submit'
            className='outline-none bg-green-700 text-white text-base cursor-pointer p-2 rounded'
            >
            {currState === "Sign Up" ? "Create Account" : "Login"}
            </button>
            <div className='login-popup-condition flex items-start gap-2 -mt-3'>
            <input className='mt-1' type='checkbox' required />
            <p className='text-zinc-500'>
                By continuing, I agree to the terms of use & privacy policy
            </p>
            </div>
            {currState === "Login" ? (
            <p>
                Create a New Account?{" "}
                <span
                className='text-green-900 cursor-pointer font-semibold'
                onClick={() => setCurrState("Sign Up")}
                >
                Click here
                </span>
            </p>
            ) : (
            <p>
                Already have an Account?{" "}
                <span
                className='text-green-900 cursor-pointer font-semibold'
                onClick={() => setCurrState("Login")}
                >
                Login here
                </span>
            </p>
            )}
        </form>
        </div>
    );
    };

    export default LoginPopup;
