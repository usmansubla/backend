
import connectDb from "./db/index.js";

import dotenv from "dotenv"
dotenv.config({
    path:"./env"
})

connectDb()


































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