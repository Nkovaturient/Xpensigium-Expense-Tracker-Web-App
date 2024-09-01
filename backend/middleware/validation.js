const { expenseValidation } = require("../utils/schemaValidation");


module.exports.validateExpense=(req,res,next)=>{
     const data= expenseValidation(req.body);
    //  console.log(data);
     const error=data.error;
        if(error){
            const errMsg= error.details.map((e)=> e.message).join(",");
        return res.json({success: false, message:`${errMsg}`})
    } else{
        next();
    }

}