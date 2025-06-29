'use client';

import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Total', 'google', 'Gmail'],
  datasets: [
    {
      label: 'total',
      data: [2000, 1800, 200],
      backgroundColor: [ '#60a5fa', '#facc15', '#f87171'],
      borderColor: [ '#3b82f6', '#eab308', '#ef4444'],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display:true,
      position: 'top' as const,
      align: 'center' as const,
      margin:4,
      },
    },
  }  

 



export default function DoughnutChart() {
  return (
    // <div className="w-full max-w-md mx-auto p-4 bg-white rounded-xl shadow dark:bg-gray-800">
      <Doughnut data={data} options={options} />
    // {/* </div> */}
  );
}
