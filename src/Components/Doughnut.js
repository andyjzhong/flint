import React, { useContext } from 'react';
import { DataContext } from './DataContext';
import { Doughnut as DoughnutChart } from 'react-chartjs-2';

function Doughnut() {

    const { summaryData } = useContext(DataContext);

    // const categories = summaryData.map((item) => {
    //     return item[0]
    // });

    // const doughnutBudgetValues = summaryData.map((item) => {
    //     return item[1].totalSpend
    // });

    // console.log("Total spend by category: ", doughnutBudgetValues);

    const data = {
        // labels: categories,
        datasets: [
            {
                label: '# of Votes',
                // data: doughnutBudgetValues,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="App">
            <div className="chart-container">
                <h1 className='title'>Total Spend</h1>
                <DoughnutChart data={data} />
            </div>
        </div>
    );
}

export default Doughnut;
