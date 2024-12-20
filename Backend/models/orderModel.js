/*
import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    items:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:"Food Processing"},
    date: { type: Date, default: () => Date.now() },
    payment:{type:Boolean,default:false}
})

const orderModel = mongoose.models.order || mongoose.model("order",orderSchema);
export default orderModel;
*/
import mongoose from "mongoose";

// Function to get current date in IST
function getCurrentISTDate() {
    const now = new Date();
    // IST is UTC+5:30
    const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours and 30 minutes in milliseconds
    const istDate = new Date(now.getTime() + istOffset);
    return istDate;
}

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Food Processing" },
    date: { type: Date, default: getCurrentISTDate }, // Storing IST date
    payment: { type: Boolean, default: false }
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;
