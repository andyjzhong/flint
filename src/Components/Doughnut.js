import React, { useContext } from 'react';
import { DataContext } from './DataContext';
import { Doughnut as DoughnutChart } from 'react-chartjs-2';

function Doughnut() {

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
    }

    const data = {
        labels: categories,
        datasets: [
            {
                label: '# of Votes',
                data: doughnutBudgetValues,
                backgroundColor: [
                    "rgb(0,217,36)",
                    "rgb(26,89,230)",
                    "rgb(249,65,73)",
                    "rgb(31,180,226)",
                    "rgb(250,176,1)",
                    "rgb(142,71,253)",
                    "rgb(242,56,136)",
                    "rgb(0,44,89)",
                    "rgb(46,202,203)",
                    "rgb(13,85,80)",
                    "rgb(251,217,106)",
                    "rgb(28,150,135)",
                ],
                borderColor: [
                    "rgb(255,255,255)"
                ],
                borderWidth: 3.5,
            },
        ],
    };

    const options = {
        layout: {
            padding: 40,
        },
        plugins: {
            legend: {
                padding: 20,
                position: 'bottom',
                labels: {
                    font: {
                        size: 16
                    }
                }
            }
        },
    };

    return (
        <DoughnutChart data={data} options={options} height={800} width={800}/>
    )
}

export default Doughnut;
