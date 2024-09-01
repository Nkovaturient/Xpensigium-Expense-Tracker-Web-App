const express=require("express")
const app=express();
const cors=require("cors");
const mongoose=require('mongoose');
require('dotenv').config();
const expenseRouter=require('./routes/expenseRoutes.js');

const PORT= process.env.PORT || 6500;
const DB_URL=process.env.DB_URL;
app.use(cors());
app.use(express.json());

app.use('/api/expense', expenseRouter);

mongoose.connect(DB_URL)
.then(()=>{
    console.log(`Pinged to Db! Connected Successfully.`);
    app.listen(PORT, ()=>{
        console.log(`Listening on Port ${PORT}`);
    });
})
.catch((err)=>{
    console.log(`${err.message}`);
});


