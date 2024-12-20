// import React, { useContext, useState } from 'react'
// import { StoreContext } from '../components/StoreContext'

// const PlaceOrder = () => {

//     const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext)

//     const [data,setData]=useState({
//         firstName:"",
//         lastName:"",
//         email:"",
//         phone:"",
//         street:"",
//         city:"",
//         state:"",
//         zipcode:"",
//         country:""
//     })

//     const onChangeHandler=(event)=>{
//         const name=event.target.name;
//         const value=event.target.value;
//         setData(data=>({...data,[name]:value}))
//     }

//     const placeOrder = async (event) => {
//         event.preventDefault();
//         let orderItems = [];
//         food_list.map((item)=>{
//         if (cartItems[item._id]>0) {
//         let itemInfo = item;
//         itemInfo["quantity"] = cartItems[item._id];
//         orderItems.push(itemInfo);
//             }
//         })
//         let orderData ={
//             address:data,
//             items:orderItems,
//             amount:getTotalCartAmount()+2,
//         }
//         let response= await axios.post(url+"/api/order/place",orderData,{headers:{token}})
//         if (response.data.success){
//             const {session_url}=response.data;
//             window.location.replace(session_url);
//     } else{
//         alert("Order failed");
//     }
// }

//     return (
//     <form onSubmit={placeOrder} className='place-order flex items-start justify-between mt-20 mx-20'>
//         <div className="place-order-left w-[100%] max-w-[max(30%,500px)]">
//             <p className="title text-3xl font-serif font-semibold mb-12">
//                 Delivery Information
//             </p>
//             <div className="multi-fields flex gap-2">
//                 <input type="text" className="text mb-4 w-[100%] p-2 border border-zinc-400 rounded outline-green-500" placeholder='First Name' name='firstName' onChange={onChangeHandler} value={data.firstName} required />
//                 <input type="text" className="text mb-4 w-[100%] p-2 border border-zinc-400 rounded outline-green-500"placeholder='Last Name' name='lastName' onChange={onChangeHandler} value={data.lastName} required />
//             </div>
//             <input name='email' onChange={onChangeHandler} value={data.email} type="email" className="text mb-4 w-[100%] p-2 border border-zinc-400 rounded outline-green-500" placeholder='Email Address' required />
//             <input name='street' onChange={onChangeHandler} value={data.street} type="text" className="text mb-4 w-[100%] p-2 border border-zinc-400 rounded outline-green-500" placeholder='Street' required />
//             <div className="multi-fields flex gap-2">
//                 <input name='city' onChange={onChangeHandler} value={data.city} type="text" className="text mb-4 w-[100%] p-2 border border-zinc-400 rounded outline-green-500" placeholder='City' required />
//                 <input name='state' onChange={onChangeHandler} value={data.state} type="text" className="text mb-4 w-[100%] p-2 border border-zinc-400 rounded outline-green-500" placeholder='State' required />
//             </div>
//             <div className="multi-fields flex gap-2">
//                 <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" className="text mb-4 w-[100%] p-2 border border-zinc-400 rounded outline-green-500" placeholder='ZIP CODE' required />
//                 <input name='country' onChange={onChangeHandler} value={data.country} type="text" className="text mb-4 w-[100%] p-2 border border-zinc-400 rounded outline-green-500" placeholder='Country' required />
//             </div>
//             <input name='phone' onChange={onChangeHandler} value={data.phone} className="text mb-4 w-[100%] p-2 border border-zinc-400 rounded outline-green-500" type='text' placeholder='Phone' required></input>
//         </div>
//         <div className="place-order-right w-[100%] max-w-max(40%,500px) ml-32">
//             <div className="cart-total flex-1 flex flex-col gap-5">
//                     <h2 className='text-lg font-semibold font-outfit'>Cart Totals</h2>
//                     <div>
//                     <div className="cart-total-details flex justify-between text-gray-600">
//                         <p>Subtotal</p>
//                         <p className='font-sans'>${getTotalCartAmount()}</p>
//                     </div>
//                     <hr className='my-2 text-gray-600 bg-gray-900'/>
//                     <div className="cart-total-details flex justify-between text-gray-600">
//                         <p>Delivery Fee</p>
//                         <p className='font-sans'>${getTotalCartAmount()===0?0:2}</p>
//                     </div>
//                     <hr className='my-2 text-gray-600 bg-gray-900'/>
//                     <div className="cart-total-details flex justify-between text-gray-600">
//                         <b>Total</b>
//                         <b className='font-sans'>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
                        
//                     </div>
//                     </div>
//                     <button type='submit' className='border-none text-white bg-green-600 rounded-md w-[max(18vw,250px)] px-3 py-3 cursor-pointer text-base font-semibold mt-8 '>PROCEED TO PAY</button>
//                 </div>

//         </div>
        
//     </form>
//     )
// }

// export default PlaceOrder
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../components/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url, clearCart } = useContext(StoreContext);
    const navigate = useNavigate();
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const placeOrder = async (event) => {
        event.preventDefault();
        if (getTotalCartAmount() === 0) {
            alert("Your cart is empty. Please add items to the cart before proceeding.");
            return;
        }

        let orderItems = [];
        food_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
                const itemInfo = { ...item, quantity: cartItems[item._id] };
                orderItems.push(itemInfo);
            }
        });

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2,
        };

        try {
            const response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
            if (response.data.success) {
                clearCart(); // Clear the cart
                navigate('/success'); // Redirect to the success page
            } else {
                console.error("API response error:", response.data.message);
                alert("Error placing order: " + response.data.message);
            }
        } catch (error) {
            console.error("API call error:", error);
            alert("Error placing order: " + (error.response?.data?.message || error.message));
        }
        
    }
    
    useEffect(()=>{
        if(!token){
            navigate('/cart')
        }
        else if(getTotalCartAmount()===0){
            navigate('/cart')
        }
        
    },[token])

    return (
        <form onSubmit={placeOrder} className='place-order flex items-start justify-between mt-20 mx-20'>
            <div className="place-order-left w-[100%] max-w-[max(30%,500px)]">
                <p className="title text-3xl font-serif font-semibold mb-12">
                    Delivery Information
                </p>
                <div className="multi-fields flex gap-2">
                    <input name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" className="text mb-4 w-[100%] p-2 border border-zinc-400 rounded outline-green-500" placeholder='First Name' required />
                    <input name="lastName" type="text" onChange={onChangeHandler} value={data.lastName} className="text mb-4 w-[100%] p-2 border border-zinc-400 rounded outline-green-500" placeholder='Last Name' required />
                </div>
                <input name="email" type="email" onChange={onChangeHandler} value={data.email} className="text mb-4 w-[100%] p-2 border border-zinc-400 rounded outline-green-500" placeholder='Email Address' required />
                <input name="street" onChange={onChangeHandler} value={data.street} type="text" className="text mb-4 w-[100%] p-2 border border-zinc-400 rounded outline-green-500" placeholder='Street' required />
                <div className="multi-fields flex gap-2">
                    <input name="city" onChange={onChangeHandler} value={data.city} type="text" className="text mb-4 w-[100%] p-2 border border-zinc-400 rounded outline-green-500" placeholder='City' required />
                    <input name='state' onChange={onChangeHandler} value={data.state} type="text" className="text mb-4 w-[100%] p-2 border border-zinc-400 rounded outline-green-500" placeholder='State' required />
                </div>
                <div className="multi-fields flex gap-2">
                    <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" className="text mb-4 w-[100%] p-2 border border-zinc-400 rounded outline-green-500" placeholder='ZIP CODE' required />
                    <input name='country' onChange={onChangeHandler} value={data.country} type="text" className="text mb-4 w-[100%] p-2 border border-zinc-400 rounded outline-green-500" placeholder='Country' required />
                </div>
                <input name='phone' onChange={onChangeHandler} value={data.phone} className="text mb-4 w-[100%] p-2 border border-zinc-400 rounded outline-green-500" type='text' placeholder='Phone' required></input>
            </div>
            <div className="place-order-right w-[100%] max-w-[max(40%,500px)] ml-32">
                <div className="cart-total flex-1 flex flex-col gap-5">
                    <h2 className='text-lg font-semibold font-outfit'>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details flex justify-between text-gray-600">
                            <p>Subtotal</p>
                            <p className='font-sans'>${getTotalCartAmount()}</p>
                        </div>
                        <hr className='my-2 text-gray-600 bg-gray-900' />
                        <div className="cart-total-details flex justify-between text-gray-600">
                            <p>Delivery Fee</p>
                            <p className='font-sans'>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr className='my-2 text-gray-600 bg-gray-900' />
                        <div className="cart-total-details flex justify-between text-gray-600">
                            <b>Total</b>
                            <b className='font-sans'>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    <button type='submit' className='border-none text-white bg-green-600 rounded-md w-[max(18vw,250px)] px-3 py-3 cursor-pointer text-base font-semibold mt-8'>PROCEED TO PAY</button>
                </div>
            </div>
        </form>
    );
}

export default PlaceOrder;

