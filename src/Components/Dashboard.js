import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from './DataContext';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router';
import Doughnut from './Doughnut';
import { FaPiggyBank, FaMoneyBillWave } from 'react-icons/fa';
import { RiBankFill } from 'react-icons/ri';
import { BiDollarCircle } from 'react-icons/bi';
import { BsGraphUp, BsGraphDown } from 'react-icons/bs';
import ComparisonChart from './ComparisonChart';
import IncomeChart from './IncomeChart';
import SummaryTable from './SummaryTable';
import { Box,
    Heading,
    Text,
    Stack,
    StatGroup,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    Stat,
    useColorModeValue
} from '@chakra-ui/react';
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
        summaryDateData,
        setSummaryDateData
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

    useEffect(() => {
        console.log("Hi", summaryDateData)
        tallyIncome()
        tallySpend()
    }, [summaryDateData])

    const [totalIncome, setTotalIncome] = useState(0);
    let incomeTally = 0;

    const tallyIncome = () => {
        if (summaryDateData) {
            for (let month of summaryDateData) {
                incomeTally = incomeTally + month[1].income;
            }
        }
        console.log("Total Income is: ", incomeTally);
        setTotalIncome(incomeTally)
    }

    const [totalSpend, setTotalSpend] = useState(0);
    let expenseTally = 0;

    const tallySpend = () => {
        if (summaryDateData) {
            for (let month of summaryDateData) {
                expenseTally = expenseTally + month[1].expenses;
            }
        }
        console.log("Total Spend is: ", expenseTally);
        setTotalSpend(expenseTally)
    }

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
                if (transaction.type !== "Income") {
                    if (!summaryMap[transaction.category]) {
                        summaryMap[transaction.category] = {totalSpend: transaction.amount}
                    } else {
                        summaryMap[transaction.category].totalSpend += transaction.amount
                    }
                }
            }

            for (let budget of userData.budgets) {
                if (budget.type !== "Income") {
                    if (!summaryMap[budget.category]) {
                        summaryMap[budget.category] = {totalBudget: budget.amount}
                    } else {
                        summaryMap[budget.category].totalBudget = budget.amount
                    }
                }
            }

            for (let transaction of userData.transactions) {
                switch(moment(transaction.date).format("MMM")) {
                    case "Jan":
                        transaction.type === "Income"
                            ? summaryDateMap.Jan.income += transaction.amount
                            : summaryDateMap.Jan.expenses += transaction.amount
                        summaryDateMap.Jan.total = summaryDateMap.Jan.income - summaryDateMap.Jan.expenses
                        break;
                    case "Feb":
                        transaction.type === "Income"
                            ? summaryDateMap.Feb.income += transaction.amount
                            : summaryDateMap.Feb.expenses += transaction.amount
                        summaryDateMap.Feb.total = summaryDateMap.Feb.income - summaryDateMap.Feb.expenses
                        break;
                    case "Mar":
                        transaction.type === "Income"
                            ? summaryDateMap.Mar.income += transaction.amount
                            : summaryDateMap.Mar.expenses += transaction.amount
                            summaryDateMap.Mar.total = summaryDateMap.Mar.income - summaryDateMap.Mar.expenses
                        break;
                    case "Apr":
                        transaction.type === "Income"
                            ? summaryDateMap.Apr.income += transaction.amount
                            : summaryDateMap.Apr.expenses += transaction.amount
                            summaryDateMap.Apr.total = summaryDateMap.Apr.income - summaryDateMap.Apr.expenses
                        break;
                    case "May":
                        transaction.type === "Income"
                            ? summaryDateMap.May.income += transaction.amount
                            : summaryDateMap.May.expenses += transaction.amount
                            summaryDateMap.May.total = summaryDateMap.May.income - summaryDateMap.May.expenses
                        break;
                    case "Jun":
                        transaction.type === "Income"
                            ? summaryDateMap.Jun.income += transaction.amount
                            : summaryDateMap.Jun.expenses += transaction.amount
                            summaryDateMap.Jun.total = summaryDateMap.Jun.income - summaryDateMap.Jun.expenses
                        break;
                    case "Jul":
                        transaction.type === "Income"
                            ? summaryDateMap.Jul.income += transaction.amount
                            : summaryDateMap.Jul.expenses += transaction.amount
                            summaryDateMap.Jul.total = summaryDateMap.Jul.income - summaryDateMap.Jul.expenses
                        break;
                    case "Aug":
                        transaction.type === "Income"
                            ? summaryDateMap.Aug.income += transaction.amount
                            : summaryDateMap.Aug.expenses += transaction.amount
                            summaryDateMap.Aug.total = summaryDateMap.Aug.income - summaryDateMap.Aug.expenses
                        break;
                    case "Sep":
                        transaction.type === "Income"
                            ? summaryDateMap.Sep.income += transaction.amount
                            : summaryDateMap.Sep.expenses += transaction.amount
                            summaryDateMap.Sep.total = summaryDateMap.Sep.income - summaryDateMap.Sep.expenses
                        break;
                    case "Oct":
                        transaction.type === "Income"
                            ? summaryDateMap.Oct.income += transaction.amount
                            : summaryDateMap.Oct.expenses += transaction.amount
                            summaryDateMap.Oct.total = summaryDateMap.Oct.income - summaryDateMap.Oct.expenses
                        break;
                    case "Nov":
                        transaction.type === "Income"
                            ? summaryDateMap.Nov.income += transaction.amount
                            : summaryDateMap.Nov.expenses += transaction.amount
                            summaryDateMap.Nov.total = summaryDateMap.Nov.income - summaryDateMap.Nov.expenses
                        break;
                    case "Dec":
                        transaction.type === "Income"
                            ? summaryDateMap.Dec.income += transaction.amount
                            : summaryDateMap.Dec.expenses += transaction.amount
                            summaryDateMap.Dec.total = summaryDateMap.Dec.income - summaryDateMap.Dec.expenses
                        break;
                    default:
                        console.log("Something weird happened when mapping Dashboard Data.")
                }
            }
            setSummaryDateData(Object.entries(summaryDateMap))
            setSummaryData(Object.entries(summaryMap))
        }
    }

    return (
        <div className="dashboard">
            <Box minH={'93vh'} p={4} bg={useColorModeValue('gray.50', 'gray.800')}>
                <div className="screen-header">
                    <Stack spacing={{ base: 10, md: 20 }}>
                        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl', md: '4xl', lg: '5xl' }}>
                            <Text as={'span'} bgGradient="linear(to-r, green.400,green.300)" bgClip="text">Dashboard</Text>{' '}
                        </Heading>
                    </Stack>
                </div>

                <StatGroup style={{margin: "4rem auto", padding: "2rem", backgroundColor: "rgb(237,242,246)", borderRadius: "10px", textAlign: "center"}} spacing="24px" maxW={'85vw'}>
                    <Stat>
                        <RiBankFill style={{fontSize: "2.5em", color: "rgb(31,180,226)", margin: "1rem auto"}} />
                        <StatLabel>Total Income</StatLabel>
                        <StatNumber>${totalIncome || 0}</StatNumber>
                        <StatHelpText>
                        <StatArrow type="increase" />
                        23.36%
                        </StatHelpText>
                    </Stat>
                    <Stat>
                        <FaMoneyBillWave style={{fontSize: "2.5em", color: "rgb(31,180,226)", margin: "1rem auto"}} />
                        <StatLabel>Total Spend</StatLabel>
                        <StatNumber>${totalSpend || 0}</StatNumber>
                        <StatHelpText>
                        <StatArrow type="increase" />
                        23.36%
                        </StatHelpText>
                    </Stat>
                    <Stat>
                        <FaPiggyBank style={{fontSize: "2.5em", color: "rgb(31,180,226)", margin: "1rem auto"}} />
                        <StatLabel>Net Income</StatLabel>
                        <StatNumber>${totalIncome - totalSpend || 0}</StatNumber>
                        <StatHelpText>
                        <StatArrow type={(Math.sign((totalIncome - totalSpend || 0)) >= 0) ? "increase" : "decrease"}  />
                        9.05%
                        </StatHelpText>
                    </Stat>
                    <Stat>
                        <BsGraphUp style={{fontSize: "2.5em", color: "rgb(31,180,226)", margin: "1rem auto"}} />
                        <StatLabel>Avg Mo. Income</StatLabel>
                        <StatNumber>${Math.round(totalIncome / 12) || 0}</StatNumber>
                        <StatHelpText>
                        <StatArrow type="decrease" />
                        9.05%
                        </StatHelpText>
                    </Stat>
                    <Stat>
                        <BsGraphDown style={{fontSize: "2.5em", color: "rgb(31,180,226)", margin: "1rem auto"}} />
                        <StatLabel>Avg Mo. Spend</StatLabel>
                        <StatNumber>${Math.round(totalSpend / 12) || 0}</StatNumber>
                        <StatHelpText>
                        <StatArrow type="increase" />
                        23.36%
                        </StatHelpText>
                    </Stat>
                    <Stat>
                        <BiDollarCircle style={{fontSize: "2.5em", color: "rgb(31,180,226)", margin: "1rem auto"}} />
                        <StatLabel>Avg Net Income</StatLabel>
                        <StatNumber>${(Math.round(totalIncome / 12) - Math.round(totalSpend / 12)) || 0}</StatNumber>
                        <StatHelpText>
                        <StatArrow type="decrease" />
                        9.05%
                        </StatHelpText>
                    </Stat>
                </StatGroup>

                <Box p={4} display={{ md: "flex" }}>
                    <Box flexShrink={0}>
                        <div className="chart-container">
                            <Heading lineHeight={1.1} fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
                                <h1 style={{paddingBottom: "3rem"}}>Spending vs. Budget</h1>
                            </Heading>
                            <ComparisonChart w={{ base: '100%', sm: '75%', md: '50%', lg: '25%' }}/>
                        </div>
                    </Box>
                    <Box mt={{ base: 4, md: 0 }}>
                        <div className="chart-container">
                            <Heading lineHeight={1.1} fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
                                <h1 style={{paddingBottom: "3rem"}}>Income vs. Expenses</h1>
                            </Heading>
                            <IncomeChart/>
                        </div>
                    </Box>
                </Box>
                <Box p={4} display={{ md: "flex" }}>
                    <Box flexShrink={0}>
                        <Heading lineHeight={1.1} fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
                            <h1 style={{paddingBottom: "3rem"}}>Spending by Category</h1>
                        </Heading>
                        <Doughnut/>
                    </Box>
                    <Box mt={{ base: 4, md: 0 }}>
                        <Heading lineHeight={1.1} fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
                            <h1 style={{paddingBottom: "3rem"}}>Financial Snapshot</h1>
                        </Heading>
                        <SummaryTable/>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default Dashboard;



// import { Box, Flex, GridItem, Stack, useColorModeValue } from '@chakra-ui/react'
// import * as React from 'react'
// import { AspectRatioGrid } from './AspectRatioGrid'
// import { GridItemAspectRatioSelect } from './GridItemAspectRatioSelect'
// import { GridItemNumberInput } from './GridItemNumberInput'
// import { GridItemWidthSelect } from './GridItemWidthSelect'
//
// export const App = () => {
//   const [items, setItems] = React.useState(2)
//   const [minWidth, setMinWidth] = React.useState(320)
//   const [aspectRatio, setAspectRatio] = React.useState(16 / 9)
//
//   const bgColor = useColorModeValue('orange.500', 'orange.300')
//   return (
//
//   )
// }
