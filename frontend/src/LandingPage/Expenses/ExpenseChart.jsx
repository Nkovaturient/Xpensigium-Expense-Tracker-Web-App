import React, { useContext } from 'react'
import Labels from './Labels';
import { StoreContext } from '../../Context/StoreContext';
import DoughnutChart from './DoughnutChart';
import { calcSum } from '../../utils/helper';

const ExpenseChart = () => {

  const {expData, navigate}=useContext(StoreContext);

  const labels=expData.map((exp)=> exp.title); 

  const expAmt=expData.map((exp)=> exp.amount);
  const totalamt=calcSum(expAmt);
  // console.log('total=',totalamt);

  const expenseData={
    labels,
    datasets: [
      {
        label: "Expense Data",
        data: expAmt,
        backgroundColor: [
          "rgba(255, 99, 132, 9.2)",
          "rgba(54, 162, 235, 9.2)",
          "rgba(255, 266, 85, 9.2)",
          "rgba(75, 192, 192, 9.2)",
          "rgba(153, 192, 255, 9.2)",
          "rgba(255, 162, 64, 9.2)",
        ],
        borderRadius: 10,
      spacing: 10,
      cutout: 85,
      }
    ]
  };

  return (
    <div className='flex justify-content max-w-xs ' style={{margin: '0 auto'}}>
      <div className="item">
        <div className="chart relative">
          <DoughnutChart data={expenseData} />
          <h3 className='mb-4 font-bold title'>Total 
            <span className='block text-3xl text-emerald-500'>$( { totalamt ? totalamt : 0 } )</span>
          </h3>
        </div>

        <div className="flex flex-col py-10 gap-4">
          <Labels totalamt={totalamt} />
        </div>
      </div>
    </div>
  )
}

export default ExpenseChart