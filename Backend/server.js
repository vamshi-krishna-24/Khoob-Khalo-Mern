import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import foodRouter from "./routes/foodRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"


//app config
const app=express()
const port=3000


//middleware
app.use(express.json())
app.use(cors())


//db connection
connectDB();

//added
//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'));
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)




app.get('/',(req,res)=>{
    res.send('hello world')
})

app.listen(port,()=>{
    console.log(`server started on http:://localhost:${port}`)
})


//mongodb+srv://imran:7989137800@cluster0.2pagk2g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0