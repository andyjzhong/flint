import React, { useState, useEffect } from 'react';
import Doughnut from './Doughnut';
import SummaryTable from './SummaryTable';
import { Grid, GridItem } from '@chakra-ui/react';
import "./Dashboard.css"
import axios from 'axios';

const Dashboard = () => {

    const userId = localStorage.getItem('fuid');
    const [userData, setUserData] = useState();

    useEffect(() => {
        getUserData()
    }, [])

    useEffect(() => {
        joinData()
    }, [userData])

    const getUserData = async () => {
        console.log("Attempting to retrieve user data...")

        try {
            const url =
                process.env.NODE_ENV === 'production'
                    ? `http://flint-server.herokuapp.com/users/${userId}`
                    : `http://localhost:8000/users/${userId}`

            const response = await axios.get(url)
            console.log("Response data: ", response.data);
            setUserData(response.data)
        } catch (error) {
            console.warn("Error when retrieving user data.")
        }
    }

    const joinData = () => {
        console.log("firing?");
        let summaryMap = {}

        if (userData) {
            for (let transaction of userData.transactions) {
                if(!summaryMap[transaction.category]) {
                    summaryMap[transaction.category] = {totalSpend: transaction.amount}
                } else {
                    summaryMap[transaction.category].totalSpend += transaction.amount
                }
            }

            for (let budget of userData.budgets) {
                !summaryMap[budget.category]
                    ? summaryMap[budget.category] = {totalBudget: budget.amount}
                    : summaryMap[budget.category].totalBudget = budget.amount
            }

            console.log("summaryMap", summaryMap);
        }
    }

    return (
        <div className="dashboard">
            <h1>Dashboard Page</h1>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <GridItem colSpan={1}>
                    <div className="chart-container">
                        <Doughnut/>
                    </div>
                </GridItem>
                <GridItem colSpan={1}>
                    <SummaryTable />
                </GridItem>
            </Grid>
        </div>
    )
}

export default Dashboard;
