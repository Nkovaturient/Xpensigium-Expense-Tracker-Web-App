const mongoose=require('mongoose');
const Schema = mongoose.Schema

const expenseSchema= new Schema({
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    category: {
        type: String,
        enum:['House Rent', 'Car Insurance', 'Travel Expenses', 'Food and Groceries', 'Utility Bills', 'Cell Phone Recharge', 'Childcare and School Costs', 'Pet Care', 'Clothing and Accessories', 'Health Insurance', 'Entertainment', 'Loans', 'Retirement', 'Emergency', 'Others'],
        required: true,
    },
    description: {
        type: String,
    },
   
}, {timestamps: true});

const expenseModel=new mongoose.model("Expense", expenseSchema);

module.exports=expenseModel;