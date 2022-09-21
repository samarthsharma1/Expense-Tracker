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
bcrypt.compare(password,user[0].password,(err,result)=>{
    if(err){
    throw new Error('Something went wrong')
    }
    if(result==true){
   return res.status(200).json({success:true,message:"Login Successful"})
}
else{
    return res.status(400).json({success:false,message:"password is incorrect"})
}
})
}
}
catch(err){ 
res.status(500).json({Message:err,success:false})
}}