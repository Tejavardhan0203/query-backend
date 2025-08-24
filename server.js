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
app.use(cors())

app.use("/queries", queryRoutes)
app.use("/admin", adminRoutes)
    
app.get("/",(req,res)=>{
    res.json({message:"hello"})
})
app.listen(PORT,(err)=>{
    console.log(`app is listening on port ${PORT}`)
})