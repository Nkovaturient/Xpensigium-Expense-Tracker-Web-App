const mongoose=require('mongoose');
const Schema = mongoose.Schema

const categorySchema= new Schema({
    type: {
        type: String,
        default: 'Investment',
        required: true,
    },
    color: {
        type: String,
        default: "#FCBE44",
        required: true,
    },
    
});

const categoryModel=new mongoose.model("Category", categorySchema);

module.exports=categoryModel;