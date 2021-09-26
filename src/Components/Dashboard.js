import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from './DataContext';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router';
import Doughnut from './Doughnut';
import ComparisonChart from './ComparisonChart';
import IncomeChart from './IncomeChart';
import SummaryTable from './SummaryTable';
import { Grid, GridItem } from '@chakra-ui/react';
import "./Dashboard.css"
import axios from 'axios';

const Dashboard = () => {

    const userId = localStorage.getItem('fuid');
    const [userData, setUserData] = useState();
    const [isTokenValid, setIsTokenValid] = useState(false)
    const history = useHistory()
    const {
        summaryData,
        setSummaryData,
        accessToken,
        setAccessToken,
    } = useContext(DataContext);
    let summaryMap = {}

    const refreshToken = async () => {
        try{
            const decoded = jwt_decode(localStorage.getItem('refreshToken'))

            const res = await axios.post('http://localhost:8000/users/refreshtoken', {
                email: decoded.email,
                token: localStorage.getItem('refreshToken')
            }).catch((err) => {
                console.log(err)
            })

            localStorage.setItem('refreshToken', res.data.refreshToken)
            setIsTokenValid(true)
            setAccessToken(res.data.accessToken)
        } catch {
            history.push('/login')
        }
    }

    useEffect(() => {
        if (!accessToken) {
            refreshToken()
        } else {
            getUserData()
        }
    }, [accessToken])

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

            const response = await axios.get(url,{
                headers: {"authorization": `Bearer ${accessToken}`}
            })
            console.log("Response data: ", response.data);
            setUserData(response.data)
        } catch (error) {
            console.warn("Error when retrieving user data.")
        }
    }

    const joinData = () => {
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
            setSummaryData(Object.entries(summaryMap))
        }
    }

    return (
        <div className="dashboard">
            <h1>Dashboard Page</h1>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <GridItem colSpan={1}>
                    <div className="chart-container">
                        <ComparisonChart/>
                    </div>
                </GridItem>
                <GridItem colSpan={1}>
                    <IncomeChart/>
                </GridItem>
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <GridItem colSpan={1}>
                    <div className="chart-container">
                        <Doughnut/>
                    </div>
                </GridItem>
                <GridItem colSpan={1}>
                    <div className="chart-container">
                        <h1>Financial Snapshot</h1>
                        <SummaryTable/>
                    </div>
                </GridItem>
            </Grid>
        </div>
    )
}

export default Dashboard;
