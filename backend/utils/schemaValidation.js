const Joi=require("joi");

module.exports.expenseValidation=(data)=>{
    const schema= Joi.object({
        title: Joi.string().required(),
        amount: Joi.number().min(10).required(),
        category: Joi.string().valid('House Rent', 'Car Insurance', 'Travel Expenses', 'Food and Groceries', 'Utility Bills', 'Cell Phone Recharge', 'Childcare and School Costs', 'Pet Care', 'Clothing and Accessories', 'Health Insurance', 'Entertainment', 'Loans', 'Retirement', 'Emergency', 'Others'),
        description: Joi.string().required(),
        date:Joi.date(),

    });
    return schema.validate(data);

}

module.exports.loginValidation=(data)=>{
    const schema= Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(15).required(),
    });
    return schema.validate(data);

}

module.exports.signupValidation=(data)=>{
    const schema= Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(10).required(),
    });
    return schema.validate(data);

}
