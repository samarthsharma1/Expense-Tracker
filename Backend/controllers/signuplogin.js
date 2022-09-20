let User=require('../models/user');

exports.signup=async (req,res)=>{

let {name,email,password}=req.body;

User.create({ name,email,password})
.then(res.status(201).json({message:"User Created Successful"}))
.catch(err=>res.status(500).json({message:"Something went wrong"}));
} 

exports.login=async (req,res,next)=>{
    try{
    const {email,password}=req.body
const user=await User.findAll({where:{email}})
if(user.length>0){
if(user[0].password===password){
   return res.status(200).json({success:true,message:"user successfully logged in"})
}
else{
    return res.status(400).json({success:false,message:"password is incorrect"})
}
}
else{
    return res.status(404).json({message:"user doesn't exist",success:false})
}
}
catch(err){
res.status(500).json({Message:err,success:false})
}}