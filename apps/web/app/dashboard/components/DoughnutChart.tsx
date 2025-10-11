"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface chartProps {
  totalUsersData: number;
  total_Google_Users: number;
  total_Gmail_Users: number;
}

export default function DoughnutChart({
  totalUsersData,
  total_Google_Users,
  total_Gmail_Users,
}: chartProps) {
  const data = {
    labels: ["Total", "google", "Gmail"],
    datasets: [
      {
        label: "total",
        data: [totalUsersData, total_Google_Users, total_Gmail_Users],
        backgroundColor: ["#60a5fa", "#facc15", "#f87171"],
        borderColor: ["#3b82f6", "#eab308", "#ef4444"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        align: "center" as const,
        margin: 4,
      },
    },
  };
  return (
    // <div className="w-full max-w-md mx-auto p-4 bg-white rounded-xl shadow dark:bg-gray-800">
    <Doughnut data={data} options={options} />
    // {/* </div> */}
  );
}
