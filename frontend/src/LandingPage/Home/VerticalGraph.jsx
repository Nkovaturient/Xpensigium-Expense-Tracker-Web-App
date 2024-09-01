import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,

 } from 'chart.js'
import React from 'react'
import {Bar} from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Legend,
    Tooltip
);

 const options={
    responsive: true,
    plugins:{
        legend : {
            position: "Top",
        },
        title: {
            display: true,
            text: "Monthly Expenses",
        },
    },
};

export default function VerticalGraph({data}) {
  return (
    <>
    <Bar options={options} data={data} />
    </>
  )
}
