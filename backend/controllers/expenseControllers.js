const expenseModel = require("../models/expenseModel");

//add new expense
module.exports.addExpense=async(req,res)=>{
    try{

        // const {title, amount, category, date, description}=req.body;

        const newExpense= await new expenseModel({
           title:req.body.title ,
           amount: req.body.amount,
           date: req.body.date,
           description: req.body.description,
        });
        newExpense.category= req.body.category;

        const saveExpense=await newExpense.save();
        return res.status(201).json({success: true, message: saveExpense });

       
        
    }catch(err){
        return res.status(401).json({success: false, message: `${err.message}`});
    }
}

//fetch all expense data
module.exports.getExpense=async(req,res)=>{
    try{
        const allExpense=await expenseModel.find({});

        return res.status(200).json({success: true, message: allExpense });   
    }catch(err){
        return res.status(401).json({success: false, message: `${err.message}`});
    }
}

//get edit form
module.exports.editExpenseForm=async(req,res)=>{
    try{
        const {id}=req.params;
        const expense=await expenseModel.findById(id);
        
        if(!expense){
            return res.status(404).json({success: false, message: `No expense record found`});
        }

        return res.status(200).json({success: true, message: expense });
   
    }catch(err){
        return res.status(401).json({success: false, message: `${err.message}`});
    }

}

//edit expense
module.exports.editExpense=async(req,res)=>{
    try{
        const {id}=req.params;
        const expense=await expenseModel.findById(id);
        
        if(!expense){
            return res.status(404).json({success: false, message: `No expense record found`});
        }

           expense.title= req.body.title || expense.title ;
           expense.amount= req.body.amount || expense.amount;
           expense.date= req.body.date || expense.date ;
           expense.category= req.body.category || expense.category;
           expense.description= req.body.description || expense.description;
       

        const updatedExpense=await expense.save();

        return res.status(202).json({success: true, message: updatedExpense }); 
        
    }catch(err){
        return res.status(403).json({success: false, message: `${err.message}`});
    }
}

//delete expense
module.exports.deleteExpense=async(req,res)=>{
    const {id}=req.params;
    try{
        const deletedExpense=await expenseModel.findByIdAndDelete({_id: id });

        return res.status(200).json({success: true, message: deletedExpense });   
    }catch(err){
        return res.status(401).json({success: false, message: `${err.message}`});
    }
}