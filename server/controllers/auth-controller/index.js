const User=req('../../models/User.js');

const registeredUser=async(req,res)=>{
    const {userName,userEmail,password,role}=req.body;

    const existingUser=await User.findOne({$or : [{userName},{userEmail}]});

    if(existingUser){
        return res.status(400).json({success:false,message:"UserEmail already exists!"})
    }

}

