require("dotenv").config();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=req('../../models/User.js');

const registerUser=async(req,res)=>{
    const {userName,userEmail,password,role}=req.body;
    try{
    const existingUser=await User.findOne({$or : [{userName},{userEmail}]});

    if(existingUser){
        return res.status(400).json({success:false,message:"UserEmail already exists!"})
    }
    const hashPassword=await bcrypt.hash(password,10);
    const newUser=new User({userName,userEmail,role,password:hashPassword});
    await newUser.save();
    return res.status(201).json({success:true,message:"User registered"});
    }
    catch (error) {
        console.log("error",error);
        res.status(500).json({
            message:"Error registering user",
            error:error,
            success:false

        })
    }
};

const loginUser=async(req,res)=>{
    const {userEmail,password}=req.body;
    try {
        const checkUser=await User.findOne({userEmail});
        if(!checkUser){
            return res.status(401).json({success:false,message:"User doesn't exist"});
        }
        const checkPasswordMatch=await bcrypt.compare(password,checkUser.password);
        if(!checkPasswordMatch){
            return res.status(401).json({success:false,message:"Password doesnt match"});
        }
        const accessToken=jwt.sign({
            _id:checkUser._id,
            email:checkUser.email,
            role:checkUser.role,
        },process.env.CLIENT_SECRET_KEY,{expiresIn:'60m'});
          
        
        res.status(200).json({
            success:true,
            message:'Logged in successfully',
            data:{
                accessToken,
            user:{
                    _id:checkUser._id,
                    email:checkUser.email,
                    role:checkUser.role,
                    userName:checkUser.userName,
                    }
                }
        }); 
        
    } catch (error) {
        console.log("Error",error);
        return res.status(500).json
        ({success:false,
            message:"Error registering user",
            error:error});
    }
};

// const logoutUser=(req,res)=>{
//     res.clearCookie('token').json({
//         success:true,
//         message:"Logout successfully"
//     })
// };
module.exports={registerUser,loginUser};
