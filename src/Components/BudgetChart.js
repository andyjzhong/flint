import React, { useContext } from 'react';
import { DataContext } from './DataContext';
import { Bar } from 'react-chartjs-2'

function BudgetChart(props) {

    const { budgetsList } = useContext(DataContext)

    const budgetCategoriesList = budgetsList.map((item) => {
        return item.category
    })
    const budgetSubCategoriesList = budgetsList.map((item) => {
        return item.subcategory
    })
    const budgetAmountList = budgetsList.map((item) => {
        return item.amount
    })

    return (
        <div>
            <Bar
            height={400}
            width={400}
            data= {{
                labels: budgetCategoriesList,
                datasets: [{
                    label: 'Budget',
                    data: budgetAmountList,
                    backgroundColor: [
                        "rgb(142,71,253, 0.9)"
                    ],
                    borderColor: [
                        "rgb(255,255,255)"
                    ],
                    borderWidth: 1
                }]
            }}
            options= {{
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                indexAxis: 'y'
            }}
            />
        </div>
    );
}

export default BudgetChart;
