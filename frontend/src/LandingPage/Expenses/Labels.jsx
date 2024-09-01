import { Colors } from 'chart.js'
import React, { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import { calcPercent } from '../../utils/helper';

const Labels = ({totalamt}) => {

    const{expData}=useContext(StoreContext);

    const obj=[
        {
            type:"Savings",
            color: "#109F70",
            percent: 45,
        },
        {
            type:"Investment",
            color: "#f9c74f",
            percent: 20,
        },
        {
            type:"Expense",
            color: "#059BFF",
            percent: 10,
        },
        {
            type:"Commodities",
            color: "#FF6384",
            percent: 15,
        },

    ]
  return (
    <>
    {
        expData.map((v, index)=>{
            return <LabelComponent totalamt={totalamt} key={index} data={v} />
        })
    }
    
    </>
  )
}

export default Labels


const LabelComponent=({data, totalamt})=>{

    if(!data) return <></>;
   
    const bgc= [
        "rgba(255, 99, 132, 9.2)",
        "rgba(54, 162, 235, 9.2)",
        "rgba(255, 266, 85, 9.2)",
        "rgba(75, 192, 192, 9.2)",
        "rgba(153, 192, 255, 9.2)",
        "rgba(255, 162, 64, 9.2)",
        "rgba(225, 62, 234, 9.2)",
        "rgba(128, 0, 128, 1)",
        "rgba(255, 20, 147, 1)",
        "rgba(0, 255, 255, 1)",
        "rgba(50, 205, 50, 1)",
        "rgba(238, 130, 238, 1)",
        "rgba(255, 0, 255, 1)",
        "rgba(238, 130, 238, 1)",
      ];
      const length=bgc.length;
      const color=Math.floor(Math.random()* length)+1;
      const bgcolor=bgc[color];

    return(
        <>
        <div className="labels flex justify-between">
        <div className="flex gap-2">
            <div className="w-2 h-2 rounded py-3" style={{backgroundColor: `${bgcolor}`}}></div>
            <h3 className="text-md">{data.category}</h3>
        </div>
        <h3 className="font-bold">{ calcPercent(data.amount, totalamt)}%</h3>
    </div>
        </>
    )
}