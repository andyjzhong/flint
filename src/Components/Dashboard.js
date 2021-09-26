import React, { useState, useEffect } from 'react';
import Doughnut from './Doughnut';
import SummaryTable from './SummaryTable';
import { Grid, GridItem } from '@chakra-ui/react';
import "./Dashboard.css"
import axios from 'axios';

const Dashboard = () => {

    const userId = "614dd60e29fe32ab9541683b";
    const [userData, setUserData] = useState();
    const [userTransactions, setUserTransactions] = useState();
    const [userBudgets, setUserBudgets] = useState();

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

            const response = await axios(url)
            console.log("Response data: ", response.data);
            setUserData(response.data)
            setUserTransactions(response.data.transactions)
            setUserBudgets(response.data.budgets)
        } catch (error) {
            console.warn("Error when retrieving user data.")
        }
    }

    const joinData = () => {
        let dataMap = {}

        if (userTransactions) {
            for (let transaction of userTransactions) {
                !dataMap[transaction.category]
                    ? dataMap[transaction.category] = transaction.amount
                    : dataMap[transaction.category] += transaction.amount
            }
            console.log("dataMap", dataMap);
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
