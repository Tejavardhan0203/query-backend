const express= require("express")
const app=express()
const dotenv=require("dotenv").config()
const connectDb=require("./config/connectionDB")
const queryRoutes=require("./routes/sub") 
const adminRoutes = require("./routes/admin")
const cors=require("cors")

const PORT=process.env.PORT || 3000

connectDb(process.env.CONNECTION_STRING)
app.use(express.json())
const allowedOrigins = ['http://localhost:5173', 'https://query-portal-frontend.vercel.app']; // Add more origins as needed
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true, // Allow credentials
    })
);

app.use("/queries", queryRoutes)
app.use("/admin", adminRoutes)
    
app.get("/",(req,res)=>{
    res.json({message:"hello"})
})
app.listen(PORT,(err)=>{
    console.log(`app is listening on port ${PORT}`)
})