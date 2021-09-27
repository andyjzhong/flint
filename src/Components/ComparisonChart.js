import React, { useContext } from 'react';
import { DataContext } from './DataContext';
import { Bar } from 'react-chartjs-2';

function ComparisonChart() {

    const { summaryData } = useContext(DataContext);

    let categories = []
    let compBudgetValues = []
    let compSpendValues = []

    if (summaryData) {
        categories = summaryData.map((item) => {
            return item[0]
        });

        compBudgetValues = summaryData.map((item) => {
            return item[1].totalBudget || 0
        });

        compSpendValues = summaryData.map((item) => {
            return item[1].totalSpend || 0
        });
    }

    const data = {
        labels: categories,
        datasets: [
            {
              label: "Budget",
              data: compBudgetValues,
              backgroundColor: "rgb(142,71,253)",
            },
            {
              label: "Spend",
              data: compSpendValues,
              backgroundColor: "rgb(242,56,136)",
            }
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

    return (
        <Bar data={data} options={options} />
    )
}

export default ComparisonChart;
