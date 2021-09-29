import React, { useContext } from 'react';
import { DataContext } from './DataContext';
import { Bar } from 'react-chartjs-2';

function IncomeChart() {

    const { summaryDateData } = useContext(DataContext);

    let netValues = []

    if (summaryDateData) {
        netValues = summaryDateData.map((item) => {
            return item[1].total || 0
        });
    }

    const data = {
        labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ],
        datasets: [
            {
                label: 'Net Income',
                data: netValues,
                backgroundColor: [
                    "rgb(99,91,255)"
                ]
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

    return (
        <Bar data={data} options={options} />
    )
};

export default IncomeChart;
