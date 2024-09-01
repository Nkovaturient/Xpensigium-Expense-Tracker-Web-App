const express=require('express');
const multer=require('multer');
const { addExpense, getExpense, deleteExpense, editExpense, editExpenseForm } = require('../controllers/expenseControllers');
const {addCategory} =require('../controllers/categoryControllers');
const { validateExpense } = require('../middleware/validation');
const router=express.Router();
const upload=multer();

router.post("/categories", addCategory );

router.post("/", getExpense);
router.post("/add", upload.none(), validateExpense, addExpense);
router.route("/edit/:id")
.get(editExpenseForm)

router.patch('/:id', upload.none(), validateExpense, editExpense)
router.delete("/delete/:id", deleteExpense);

module.exports= router;