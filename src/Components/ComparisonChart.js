import React, { useContext } from 'react';
import { DataContext } from './DataContext';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Red Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: '# of Blue Votes',
      data: [2, 3, 20, 5, 1, 4],
      backgroundColor: 'rgb(54, 162, 235)',
    },
    {
      label: '# of Green Votes',
      data: [3, 10, 13, 15, 22, 30],
      backgroundColor: 'rgb(75, 192, 192)',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

function ComparisonChart() {

    const { summaryData } = useContext(DataContext);

    let categories = []
    let doughnutBudgetValues = []

    if (summaryData) {
        categories = summaryData.map((item) => {
            return item[0]
        });

        doughnutBudgetValues = summaryData.map((item) => {
            return item[1].totalSpend || 0
        });

        console.log("Total spend by category: ", doughnutBudgetValues);
    }

    return (
        <>
            <div className='header'>
                <h1 className='title'>Spend vs. Budget</h1>
            </div>
            <Bar data={data} options={options} />
        </>
    )
}

export default ComparisonChart;
