/*
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order from frontend
const placeOrder = async (req, res) => {
    const frontend_url = "https://localhost:5173";

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 80 // Make sure this is correct based on your requirement
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 80 // Make sure this is correct based on your requirement
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { placeOrder };
*/
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing user order from frontend
const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment:true
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        res.json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        console.error("Backend error:", error);
        res.json({ success: false, message: "Error placing order: " + error.message });
    }
};
///user orders for frontend
const userOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({success:true,data:orders})
    } catch(error){
        console.log("Error fetching user orders:", error);
        res.json({success:false,message})
    }
}

//lisitng orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
}catch(error){
    console.log("Error fetching orders:", error);
    res.json({ success: false, message: "Error fetching orders" });

}
}



//api for updating order status
const updateStatus=async(req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Order status updated successfully"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error updating order status"})
    }
}

export { placeOrder,userOrders,listOrders,updateStatus };
