import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './LandingPage/Home/HomePage'
import ExpensePage from './LandingPage/Expenses/ExpensePage'
import Signup from './LandingPage/Signup/Signup'
import Login from './LandingPage/Signup/Login'
import Sidebar from './LandingPage/Sidebar'
import RecordsPage from './LandingPage/Records/RecordsPage'
import Dashboard from './LandingPage/Dashboard/Dashboard'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ExpenseForm from './LandingPage/ExpenseForm/ExpenseForm'
import BudgetCalculator from './LandingPage/BudgetCalculator'
import EditExpense from './LandingPage/Records/EditExpense'
import ScrollToTop from './LandingPage/ScrollToTop'


const App = () => {
  return (
    <>
    <ToastContainer/>
    
    <div className="app">
    <Sidebar />
    <div className="app-components">
      <ScrollToTop />
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/expenses' element={<ExpensePage />} />
      <Route path='/expenses/edit/:id' element={<EditExpense />} />
      <Route path='/records' element={<RecordsPage />} />
      <Route path='/addexpense' element={<ExpenseForm />} />
      <Route path='/calc' element={<BudgetCalculator />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
    </Routes>
    </div>
    </div>
    </>
  )
}

export default App