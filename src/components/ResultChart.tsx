import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type ResultChartProps = {
  correctAnswers: number;
  wrongAnswers: number;
};

const ResultChart: React.FC<ResultChartProps> = ({
  correctAnswers,
  wrongAnswers,
}) => {
  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "퀴즈 결과 정오답 비율",
      },
    },
    aspectRatio: 1,
    scales: {
      y: {
        beginAtZero: true,
        // max: 100,
        max: 10,
        min: 0,
        ticks: {
          stepSize: 1,
          autoSkip: false,
        },
      },
    },
  };

  const labels = ["정답", "오답"];

  const data = {
    labels,
    datasets: [
      {
        data: [correctAnswers, wrongAnswers],
        backgroundColor: ["green", "red"],
      },
    ],
  };
  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
};

export default ResultChart;
