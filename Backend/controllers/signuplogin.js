let User=require('../models/user');
const bcrypt=require('bcrypt');

exports.signup=async (req,res)=>{

try{
const{name,email,password}=req.body;
const saltround=10;
bcrypt.hash(password,saltround,async(err,hash)=>{
    await User.create({name,email,password:hash})
res.status(201).json({message:"User Created Successful"})
})}
catch(err)
{
    res.status(500).json({message:"Something went wrong"});
} 
}


exports.login=async (req,res,next)=>{
    try{
    const {email,password}=req.body
const user=await User.findAll({where:{email}})
if(user.length>0){
if(user[0].password===password){
   return res.status(200).json({success:true,message:"Login Successful"})
}
else{
    return res.status(400).json({success:false,message:"password is incorrect"})
}
}
else{
    return res.status(404).json({message:"User doesn't exist",success:false})
}
}
catch(err){
res.status(500).json({Message:err,success:false})
}}