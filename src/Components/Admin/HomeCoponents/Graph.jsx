import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getTotalSales } from '../../../Api/ProductHelper/ProductConnection';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Graph() {
    const [profit,setProfit]=useState([]);
  useEffect(()=>{
    getTotalSales()
    .then((res)=>{
       let result= (res.data).map((price)=>price.totalPrice)
       setProfit(result)
    })
  },[])
  const data = {
    labels: [ 'April', 'May', 'June',"July","August","September"],
    datasets: [
      {
        label: 'Sales',
        data: profit,
        backgroundColor: 'rgba(54, 162, 235, 0.6)', 
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Sales Data (Bar Chart)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white ">
      <h2 className="text-xl font-bold mb-4 text-center">Sales Data Bar Chart</h2>
      <Bar data={data} options={options} />
     
    </div>
  );
}

export default Graph;
