import React, { useContext } from 'react';
import { DataContext } from './DataContext';
import { Doughnut as DoughnutChart } from 'react-chartjs-2';

function Doughnut(props) {

    const { summaryData } = useContext(DataContext);

    // const categories = Object.keys(summaryData);
    // console.log("Available categories", categories);

    const data = {
        labels: ['Andy', 'Zak', 'Nita', 'Alex', 'Naeem'],
        datasets: [
            {
                label: '# of Votes',
                data: [10, 20, 30, 40, 50],
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
                <h1 className='title'>Monthly Expenses</h1>
                <DoughnutChart data={data} />
            </div>
        </div>
    );
}

export default Doughnut;
