import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiErrors.js";
import {User} from "../models/user.model.js"
import { ApiResponse } from "../utils/apiResponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const registerUser=asyncHandler(async (req,res)=>{
const {username,email,firstname,password}=req.body
console.log("email:",email);
 


if(
    [username,email,firstname,password].some((fields)=>
        fields?.trim()===""
    
)
){
    throw new ApiError(400,"fields are required")
}
const registeredUser=await User.findOne(
    {
        $or:[{username},{email}]
    })
if (registeredUser){
    throw new ApiError(409,"username or email already exists")
}

const avatarLocalpath=req.files?.avatar[0]?.path;
console.log(avatarLocalpath)

// const coverImageLocalpath=req.files?.coverImage?.path;
let coverImageLocalpath;
if (req.files && Array.isArray(req.files.coverImage )&& req.files.coverImage.length>0) {
    coverImageLocalpath=req.files.coverImage[0].path
}


if(!avatarLocalpath){   
    throw new ApiError(400,"avatar image required")
}

const avatar=await uploadOnCloudinary(avatarLocalpath)
const coverImage=await uploadOnCloudinary(coverImageLocalpath)

if(!avatarLocalpath){
    throw new ApiError(400,"avatar image required")
}

const user=await User.create({
    firstname,
    email,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    username:username.toLowerCase(),
    password
})
const createdUser=await User.findById(user._id).select(
    "-password -refereshToken"
)
if(!createdUser){
    throw new ApiError(500,"something went wrong")
}

return res.status(200).json(
    new ApiResponse(200,createdUser,"user registered successfully")
)
})
export {registerUser}