let bcrypt=require('bcrypt');
let User=require('../models/user');

exports.postuserdata=async (req,res)=>{

let {name,email,pwd}=req.body;

let password=await bcrypt.hash(pwd,10);

User.create({
    name,email,password
})
.then(result=>{
res.json({result,success:true})
})
.catch(err=>{
    res.json(err);
})
} 