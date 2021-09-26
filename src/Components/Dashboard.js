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
import moment from 'moment';

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
    let summaryDateMap = {
        Jan: {
            income: 0,
            expenses: 0,
            total: 0
        },
        Feb: {
            income: 0,
            expenses: 0,
            total: 0
        },
        Mar: {
            income: 0,
            expenses: 0,
            total: 0
        },
        Apr: {
            income: 0,
            expenses: 0,
            total: 0
        },
        May: {
            income: 0,
            expenses: 0,
            total: 0
        },
        Jun: {
            income: 0,
            expenses: 0,
            total: 0
        },
        Jul: {
            income: 0,
            expenses: 0,
            total: 0
        },
        Aug: {
            income: 0,
            expenses: 0,
            total: 0
        },
        Sep: {
            income: 0,
            expenses: 0,
            total: 0
        },
        Oct: {
            income: 0,
            expenses: 0,
            total: 0
        },
        Nov: {
            income: 0,
            expenses: 0,
            total: 0
        },
        Dec: {
            income: 0,
            expenses: 0,
            total: 0
        }
    }

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

            // For Income v Expenses
            for (let transaction of userData.transactions) {
                switch(moment(transaction.date).format("MMM")) {
                    case "Jan":
                        summaryDateMap.Jan.total += transaction.amount
                        transaction.type === "Income"
                            ? summaryDateMap.Jan.income += transaction.amount
                            : summaryDateMap.Jan.expenses += transaction.amount
                        break;
                    case "Feb":
                        summaryDateMap.Feb.total += transaction.amount
                        transaction.type === "Income"
                            ? summaryDateMap.Feb.income += transaction.amount
                            : summaryDateMap.Feb.expenses += transaction.amount
                        break;
                    case "Mar":
                        summaryDateMap.Mar.total += transaction.amount
                        transaction.type === "Income"
                            ? summaryDateMap.Mar.income += transaction.amount
                            : summaryDateMap.Mar.expenses += transaction.amount
                        break;
                    case "Apr":
                        summaryDateMap.Apr.total += transaction.amount
                        transaction.type === "Income"
                            ? summaryDateMap.Apr.income += transaction.amount
                            : summaryDateMap.Apr.expenses += transaction.amount
                        break;
                    case "May":
                        summaryDateMap.May.total += transaction.amount
                        transaction.type === "Income"
                            ? summaryDateMap.May.income += transaction.amount
                            : summaryDateMap.May.expenses += transaction.amount
                        break;
                    case "Jun":
                        summaryDateMap.Jun.total += transaction.amount
                        transaction.type === "Income"
                            ? summaryDateMap.Jun.income += transaction.amount
                            : summaryDateMap.Jun.expenses += transaction.amount
                        break;
                    case "Jul":
                        summaryDateMap.Jul.total += transaction.amount
                        transaction.type === "Income"
                            ? summaryDateMap.Jul.income += transaction.amount
                            : summaryDateMap.Jul.expenses += transaction.amount
                        break;
                    case "Aug":
                        summaryDateMap.Aug.total += transaction.amount
                        transaction.type === "Income"
                            ? summaryDateMap.Aug.income += transaction.amount
                            : summaryDateMap.Aug.expenses += transaction.amount
                        break;
                    case "Sep":
                        summaryDateMap.Sep.total += transaction.amount
                        transaction.type === "Income"
                            ? summaryDateMap.Sep.income += transaction.amount
                            : summaryDateMap.Sep.expenses += transaction.amount
                        break;
                    case "Oct":
                        summaryDateMap.Oct.total += transaction.amount
                        transaction.type === "Income"
                            ? summaryDateMap.Oct.income += transaction.amount
                            : summaryDateMap.Oct.expenses += transaction.amount
                        break;
                    case "Nov":
                        summaryDateMap.Nov.total += transaction.amount
                        transaction.type === "Income"
                            ? summaryDateMap.Nov.income += transaction.amount
                            : summaryDateMap.Nov.expenses += transaction.amount
                        break;
                    case "Dec":
                        summaryDateMap.Dec.total += transaction.amount
                        transaction.type === "Income"
                            ? summaryDateMap.Dec.income += transaction.amount
                            : summaryDateMap.Dec.expenses += transaction.amount
                        break;
                    default:
                        console.log("Something weird happened when mapping Dashboard Data.")
                }
            }

            console.log("summaryDateMap", summaryDateMap);
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
