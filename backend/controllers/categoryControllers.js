const categoryModel = require("../models/categoryModel");


//add new expense
module.exports.addCategory=async(req,res)=>{
    try{

        const {type, color}=req.body;

        const newCategory= await new categoryModel({
           type: 'Savings',
           color:'#ffff00'
        });

        const saveCategory=await newCategory.save();
        return res.status(201).json({success: true, message: saveCategory });
  
    }catch(err){
        return res.status(401).json({success: false, message: `${err.message}`});
    }
}

//fetch all Category data
module.exports.getCategory=async(req,res)=>{
    try{
        const allCategory=await categoryModel.find({}).sort({ createdAt: -1 });

        return res.status(200).json({success: true, message: allCategory });   
    }catch(err){
        return res.status(401).json({success: false, message: `${err.message}`});
    }
}

//delete Income
module.exports.deleteCategory=async(req,res)=>{
    const {id}=req.params;
    try{
        const deletedCategory=await categoryModel.findByIdAndDelete({_id: id });

        return res.status(200).json({success: true, message: deletedCategory });   
    }catch(err){
        return res.status(401).json({success: false, message: `${err.message}`});
    }
}