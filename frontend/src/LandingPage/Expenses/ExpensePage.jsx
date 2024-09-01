import React from 'react'
import ExpenseChart from './ExpenseChart'
import Form from './Form'

const ExpensePage = () => {
  return (
    <div className='expense-container'>
      <div className="expense-head">
        <h1 className='text-center text-2xl font-bold title'>Expense Tracker</h1>
      </div>
      <div className="expense-body flex flex-wrap justify-between my-6">
      <ExpenseChart/>
      <Form/>
       <div className=" my-4 expense-form flex flex-col flex-wrap justify-content gap-6">

       </div>
      </div>
    </div>
  )
}

export default ExpensePage