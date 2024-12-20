import React, { useContext } from 'react'
import { StoreContext } from '../components/StoreContext';
import { food_list } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Cart = () => {
    const {cartItems,food_list,removeFromCart,getTotalCartAmount,url}= useContext(StoreContext);

    const navigate =useNavigate();

    const handleRemoveFromCart = (itemId) => {
        removeFromCart(itemId);
        toast.success("Food removed from cart!");
    };

    return (
        <div className='cart mt-24 mx-6'>
            <div className="cart-items">
                <div className="cart-items-title grid items-center text-gray-600 text-[max(1vw,12px)] grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr]">
                <p>Items</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
                </div>
                <br/>
                <hr/>
                {food_list.map((item,index)=>{
                if(cartItems[item._id]>0){
                    return (
                        <div>
                        <div className='cart-items-title cart-items-item mx-2 mt-3 mb-3  grid items-center text-black text-[max(1vw,12px)] grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] font-sans'>
                            <img className='w-14  ' src={url+"/images/"+item.image}></img>
                            <p className='text-base font-serif'>{item.name}</p>
                            <p>${item.price}</p>
                            <p className='ml-3'>{cartItems[item._id]}</p>
                            <p className='ml-3'>${item.price*cartItems[item._id]}</p>
                            <p className='cross cursor-pointer ml-3 text-lg text-red-600' onClick={() => handleRemoveFromCart(item._id)}>X</p>
                        </div>
                        <hr/>
                        </div>
                    )
                }
            })}
            </div>
            <div className="cart-bottom mt-20 flex justify-between gap-[max(12vw,20px)]">
                <div className="cart-total flex-1 flex flex-col gap-5">
                    <h2>Cart Totals</h2>
                    <div>
                    <div className="cart-total-details flex justify-between text-gray-600">
                        <p>Subtotal</p>
                        <p className='font-sans'>${getTotalCartAmount()}</p>
                    </div>
                    <hr className='my-2 text-gray-600 bg-gray-900'/>
                    <div className="cart-total-details flex justify-between text-gray-600">
                        <p>Delivery Fee</p>
                        <p className='font-sans'>${getTotalCartAmount()===0?0:2}</p>
                    </div>
                    <hr className='my-2 text-gray-600 bg-gray-900'/>
                    <div className="cart-total-details flex justify-between text-gray-600">
                        <b>Total</b>
                        <b className='font-sans'>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
                        
                    </div>
                    </div>
                    <button onClick={()=>navigate('/order')} className='border-none text-white bg-green-600 rounded-md w-[max(18vw,250px)] px-3 py-3 cursor-pointer text-base font-semibold'>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cart-promocode flex-1">
                <div>
                    <p className='text-gray-600 mb-2'>If you have a promo code, Enter it here</p>
                    <div className="cart-promocode-input ">
                        <input  type="text" placeholder='promo code' className="type  bg-transparent border border-gray-500 outline-none px-2 py-1 bg-slate-200  mr-2" />
                        <button className="btn border-none text-white bg-black rounded-md  px-3 py-2 cursor-pointer text-base font-semibold w-[max(7vw,130px)] ">Apply</button>
                    </div>
                </div>
            </div>
            </div>
            
        
        </div>
    )
}

export default Cart
