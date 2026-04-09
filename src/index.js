import connectDb from "./db/index.js";
import dotenv from "dotenv"
import { app } from "./app.js";
dotenv.config({
    path:"./.env"
})

connectDb()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running at server: ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log("database connection failed",err);
    
})



































/*
import express from "express"
const app=express()

( async ()=>{
   try {
  await  mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`)
  app.on("error",(error)=>{
    console.log("err:",error)
  })
  app.listen(process.env.PORT,()=>{
    console.log(`app is listening on port ${process.env.PORT}`);
    
  })
    
   } catch (error) {
    console.log(error); 
    
   }
})()
   */