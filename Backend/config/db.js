import mongoose from "mongoose";

export const connectDB =async()=>{
    //using mongodb atlas(browser)
    // await mongoose.connect('mongodb+srv://imran:7989137800@cluster0.2pagk2g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("DB connected"));
    //using mongodb compass
    await mongoose.connect('mongodb://127.0.0.1:27017/KhoobKhalo').then(()=>console.log("DB connected"));
}