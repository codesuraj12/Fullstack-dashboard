import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const Userregistration = async(req,res)=>{

try {
    
const {name,email,password} = req.body;

const userexist = await User.findOne({email})
if(userexist){
    return res.status(404).json({message:"User already exists"})
}

const salt = await bcrypt.genSalt(10);

const hashedpassword =await bcrypt.hash(password,salt)

// create user

const user = User.create({
    name,
    email,
    password:hashedpassword,
})

res.status(201).json({
    message :'User Register Successfully',
    user,
})

} catch (error) {
    res.status(500).json({message:error.message})
}
}



// for Login user we get token here

export const Loginuser = async(req,res)=>{

try {
    const {email,password} = req.body;

    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json( {message: "Invalid Credential"} );
    }

    // compare password

    const isMatch = await bcrypt.compare(password,user.password)

if(!isMatch){
    return res.status(400).json({message : "Invalid Credential"})
}

// generate token

const token = jwt.sign(
    {id:user._id},
    process.env.JWT_SECRET,
    {expiresIn:"7d"}
)

res.json({message:"Login Successfull",
    token

} )

} catch (error) {
    res.status(500).json({message: error.message})
}

}