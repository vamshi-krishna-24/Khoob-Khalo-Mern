import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

    const Add = ({url}) => {
        //backend url
        // const url= "http://localhost:3000";url is wriiten in app.jsx and given as prop to add,list,orders
        const [image,setImage]=useState(false)
        const [data,setData]= useState({
            name:"",
            description:"",
            price:"",
            category:""
        })

        const onChangeHandler =(event)=>{
            const name= event.target.name;
            const value= event.target.value;
            setData(data=>({...data,[name]:value}))
        }

        const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData= new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("category", data.category)
        formData.append("image", image)
        const response =await axios.post(`${url}/api/food/add`,formData);
        if (response.data.success){
            setData({
            name:"",
            description:"",
            price:"",
            category:"Salad"
            })
            setImage(false)//check database if all things are added and also u can check image in another tab by 'localhost:3000/images/check ss1 in assets
            toast.success(response.data.message)
        } else{
            toast.error(response.data.message)
        }
        }
        

    return (
        <div className='add'>
        <form onSubmit={onSubmitHandler} className='flexx-col'>
        <div className="add-img-upload flexx-col">
        <p>Upload Image</p>
        <label htmlFor="image">
        <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
        </label>
        <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flexx-col">
            <p>Product Name</p>
            <input onChange={onChangeHandler} value={data.name} type="text" placeholder='Type here' name="name" required />
        </div>
        <div className="add-product-dscription flexx-col">
        <p>Description</p>
        <textarea onChange={onChangeHandler} value={data.description} name='description' rows={6} placeholder='Write your content here'></textarea>
        </div>
        <div className="add-category-price">
            <div className="add-category flexx-col">
                <p>Product Category</p>
                <select onChange={onChangeHandler} name='category'>
                    <option value="Salad">Salad</option>
                    
                    <option value="Deserts">Deserts</option>
                    
                    <option value="Cake">Cake</option>
                    
                    <option value="Chinese">Chinese</option>
                    <option value="Biryani">Biryani</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Starters">Starters</option>
                    <option value="Shawarma">Shawarma</option>
                    <option value="Rotis">Rotis</option>
                    <option value="Italian">Italian</option>
                </select>
            </div>
            <div className="add-price flexx-col">
                <p>Product Price</p>
                <input onChange={onChangeHandler} value={data.price} type='Number' name='price' placeholder='$20'></input>
            </div>

        </div>
        <button type='submit' className='add-btn'>ADD</button>
        </form>
        </div>
    )
    }

export default Add
