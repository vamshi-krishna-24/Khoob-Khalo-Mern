import React, { useContext } from 'react'
import { StoreContext } from './StoreContext'
import FoodItem from './FoodItem'

const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext)

    return (
        <div className='food-display mt-7 mx-4'>
            <h2 className=' text-3xl font-outfit  font-bold text-yellow-400'>Food List</h2>
            <div className=' grid grid-cols-4 mt-7 gap-5 animate-fadeIn'>
                {food_list.map((item,index)=>{
                    {console.log(category,item.category);}
                    if(category==="All" || category===item.category){
                        return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}  />
                    }
                    
                })}
            </div>
        </div>
    )
    }

export default FoodDisplay