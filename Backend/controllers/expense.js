const Expense=require('../models/expense')
const User=require('../models/user')
const AWS=require('aws-sdk');

exports.downloadexpense =async(req,res)=>{
        try{
    const expense=await req.user.getExpenses();
    //console.log(expense);
    const stringifiedExpense=JSON.stringify(expense);
    const userId=req.user.id;
    const filename=`Expense${userId}/${new Date()}.txt`;
    const fileURL= await uploadToS3(stringifiedExpense,filename);
    //console.log('>>>>>',fileURL);
    res.status(200).json({fileURL,success:true})
        }catch(err){
            res.status(500).json({fileURL:'',success:'false'})
        }
       } 
    function uploadToS3(data,filename){
    const BUCKET_NAME='expensetracking12';
    const IAM_USER_KEY='AKIA5UNKXKP4ZLYPRCMP';
    const IAM_USER_SECRET='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'
    
    
    let s3bucket=new AWS.S3({
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET
    })
    
        var params={
            Bucket:BUCKET_NAME,
            Key:filename,
            Body:data,
            ACL:'public-read'
        }
        return new Promise((resolve,reject)=>{
            s3bucket.upload(params,(err,s3response)=>{
                if(err){
                    //console.log('Something went Wrong',err)
                    reject(err);
    
                }
                else{
                    //console.log('success',s3response)
                    resolve( s3response.Location);
                }
            })
        })
}

exports.addExpense=(req,res,next)=>{
    const{amount,description,category}=req.body
    if(amount== undefined || amount.length===0 || description==undefined || description.length===0
        || category==undefined || category.length===0 )
    {
        return res.status(400).json({err:'Missing Parameters'})
    }
    else{
        Expense.create({amount,description,category,userId:req.user.id})
        .then(expense=>{
            res.status(201).json({message:'Expense added' , success:true,expense})
        })
        .catch(err=>{
            res.status(500).json({err:'Something went Wrong'})
        })
    }
} 

exports.showExpense = (req,res,next)=>{
    Expense.findAll({where:{userId:req.user.id}})
    .then(expenses=>{
        return res.status(200).json({expenses,success:true,user:req.user})
    })
}
exports.deleteexpense = (req, res) => {
    const expenseid = req.params.expenseid;
    if(expenseid==undefined || expenseid.length===0){
       return res.status(400).json({success:false})
    }
    Expense.destroy({where: { id: expenseid ,userId:req.user.id }})
    .then((rows) => {
        if(rows==0){
            return res.status(404).json({success:false,message:'This Expense doesnot belong to this user'})
        }
        
        return res.status(204).json({ success: true, message: "Deleted Successfuly"})
    }).catch(err => {
        console.log(err);
        return res.status(403).json({ success: true, message: "Failed"})
    })
}


exports.showExpensePremium=(req,res,next)=>{

    User.findAll()
    .then(users=>{
     res.status(200).json({users,success:true})
    })
  }


  exports.seeExpensePremium = (req,res,next)=>{
      const id =  req.params.id
      Expense.findAll({where:{userId:id}})
      .then(users=>{
       res.status(200).json({users,success:true})
      })
    }