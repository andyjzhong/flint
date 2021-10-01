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
import {
    Box,
    Grid,
    GridItem,
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
    const history = useHistory()
    const {
        setSummaryData,
        accessToken,
        setAccessToken,
        summaryDateData,
        setSummaryDateData,
        setIsUserLoggedIn
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
            setIsUserLoggedIn(true)
            const decoded = jwt_decode(localStorage.getItem('refreshToken'))

            const res = await axios.post('https://flint-server.herokuapp.com/users/refreshtoken', {
                email: decoded.email,
                token: localStorage.getItem('refreshToken')
            }).catch((err) => {
                console.log(err)
            })

            localStorage.setItem('refreshToken', res.data.refreshToken)
            setAccessToken(res.data.accessToken)
        } catch {
            setIsUserLoggedIn(false)
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
                process.env.REACT_APP_NODE_ENV === 'production'
                    ? `https://flint-server.herokuapp.com/users/${userId}`
                    : `https://flint-server.herokuapp.com/users/${userId}`

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
            <Box p={4} pt={24} bg={useColorModeValue('gray.50', 'gray.800')}>
                <div className="screen-header">
                    <Stack spacing={{ base: 10, md: 20 }}>
                        <Heading lineHeight={1.1} fontSize={{ base: '4xl', sm: '4xl', md: '5xl', lg: '5xl' }}>
                            <Text as={'span'} bgGradient="linear(to-r, green.400,green.300)" bgClip="text">Dashboard</Text>{' '}
                        </Heading>
                    </Stack>
                </div>

                <StatGroup style={{margin: "4rem auto", padding: "2rem", backgroundColor: "rgb(237,242,246)", borderRadius: "10px", textAlign: "center"}} spacing="24px" maxW={'85vw'} boxShadow="lg">
                    <Grid
                        gap={{ base: '1rem', sm: '2rem', md: '2rem', lg: '4rem', xl: '6rem' }}
                        templateColumns={{
                            base: "repeat(3, 1fr)",
                            sm: "repeat(3, 1fr)",
                            md: "repeat(3, 1fr)",
                            lg: "repeat(6, 1fr)"
                        }}
                    >
                        <GridItem>
                            <Stat>
                                <RiBankFill style={{fontSize: "2.5em", color: "rgb(31,180,226)", margin: "1rem auto"}} />
                                <StatLabel>Total Income</StatLabel>
                                <StatNumber fontSize={{ base: '20px', sm: '24px'}}>${totalIncome.toFixed(0) || 0}</StatNumber>
                                <StatHelpText>
                                <StatArrow type="increase" />
                                23.36%
                                </StatHelpText>
                            </Stat>
                        </GridItem>
                        <GridItem>
                            <Stat>
                                <FaMoneyBillWave style={{fontSize: "2.5em", color: "rgb(31,180,226)", margin: "1rem auto"}} />
                                <StatLabel>Total Spend</StatLabel>
                                <StatNumber fontSize={{ base: '20px', sm: '24px'}}>${totalSpend.toFixed(0) || 0}</StatNumber>
                                <StatHelpText>
                                <StatArrow type="increase" />
                                23.36%
                                </StatHelpText>
                            </Stat>
                        </GridItem>
                        <GridItem>
                            <Stat>
                                <FaPiggyBank style={{fontSize: "2.5em", color: "rgb(31,180,226)", margin: "1rem auto"}} />
                                <StatLabel>Net Income</StatLabel>
                                <StatNumber fontSize={{ base: '20px', sm: '24px'}}>${(totalIncome - totalSpend).toFixed(0) || 0}</StatNumber>
                                <StatHelpText>
                                <StatArrow type={(Math.sign((totalIncome - totalSpend || 0)) >= 0) ? "increase" : "decrease"}  />
                                9.05%
                                </StatHelpText>
                            </Stat>
                        </GridItem>
                        <GridItem>
                            <Stat>
                                <BsGraphUp style={{fontSize: "2.5em", color: "rgb(31,180,226)", margin: "1rem auto"}} />
                                <StatLabel>Avg Mo. Income</StatLabel>
                                <StatNumber fontSize={{ base: '20px', sm: '24px'}}>${Math.round(totalIncome / 12).toFixed(0) || 0}</StatNumber>
                                <StatHelpText>
                                <StatArrow type="decrease" />
                                9.05%
                                </StatHelpText>
                            </Stat>
                        </GridItem>
                        <GridItem>
                            <Stat>
                                <BsGraphDown style={{fontSize: "2.5em", color: "rgb(31,180,226)", margin: "1rem auto"}} />
                                <StatLabel>Avg Mo. Spend</StatLabel>
                                <StatNumber fontSize={{ base: '20px', sm: '24px'}}>${Math.round(totalSpend / 12).toFixed(0) || 0}</StatNumber>
                                <StatHelpText>
                                <StatArrow type="increase" />
                                23.36%
                                </StatHelpText>
                            </Stat>
                        </GridItem>
                        <GridItem>
                            <Stat>
                                <BiDollarCircle style={{fontSize: "2.5em", color: "rgb(31,180,226)", margin: "1rem auto"}} />
                                <StatLabel>Avg Net Income</StatLabel>
                                <StatNumber fontSize={{ base: '20px', sm: '24px'}}>${((Math.round(totalIncome / 12) - Math.round(totalSpend / 12))).toFixed(0) || 0}</StatNumber>
                                <StatHelpText>
                                <StatArrow type="decrease" />
                                9.05%
                                </StatHelpText>
                            </Stat>
                        </GridItem>
                    </Grid>
                </StatGroup>

                <Grid
                    gap="6"
                    templateColumns={{
                        base: "repeat(1, 1fr)",
                        sm: "repeat(1, 1fr)",
                        md: "repeat(1, 1fr)",
                        lg: "repeat(2, 1fr)"
                    }}
                >
                    <GridItem
                        boxShadow="lg"
                        m="0 auto"
                        w={{ base: "90vw", sm: "90vw", md: "90vw", lg: "45vw"}}
                        class="chart-container"
                        p="1rem"
                        border={{ base: '1px solid lightgray', sm: 'none' }}
                    >
                        <Heading lineHeight={1.1}>
                            <Text textAlign="center" pt="1rem" pb="3rem" fontSize={{ base: '20px', sm: '24px', md: '30px', lg: "32px", xl: '36px' }}>Spending vs. Budget</Text>
                        </Heading>
                        <ComparisonChart />
                    </GridItem>
                    <GridItem
                        m="0 auto"
                        w={{ base: "90vw", sm: "90vw", md: "90vw", lg: "45vw"}}
                        class="chart-container"
                        p="1rem"
                        border={{ base: '1px solid lightgray', sm: 'none' }}
                        boxShadow="lg"
                    >
                        <Heading lineHeight={1.1}>
                            <Text textAlign="center" pt="1rem" pb="3rem" fontSize={{ base: '20px', sm: '24px', md: '30px', lg: "32px", xl: '36px' }}>Income vs. Expenses</Text>
                        </Heading>
                        <IncomeChart/>
                    </GridItem>
                </Grid>
                <Grid
                    pt="1rem"
                    gap="6"
                    templateColumns={{
                        base: "repeat(1, 1fr)",
                        sm: "repeat(1, 1fr)",
                        md: "repeat(1, 1fr)",
                        lg: "repeat(2, 1fr)"
                    }}
                >
                    <GridItem
                        m="0 auto"
                        w={{ base: "90vw", sm: "90vw", md: "90vw", lg: "45vw"}}
                        class="chart-container"
                        p="1rem"
                        border={{ base: '1px solid lightgray', sm: 'none' }}
                        boxShadow="lg"
                    >
                        <Heading lineHeight={1.1}>
                            <Text textAlign="center" pt="1rem" pb="3rem" fontSize={{ base: '20px', sm: '24px', md: '30px', lg: "32px", xl: '36px' }}>Spending by Category</Text>
                        </Heading>
                        <Doughnut/>
                    </GridItem>
                    <GridItem
                        m="0 auto"
                        w={{ base: "90vw", sm: "90vw", md: "90vw", lg: "45vw"}}
                        class="chart-container"
                        p="1rem"
                        boxShadow="lg"
                    >
                        <Box
                            className="transactions-table-container"
                            w="100%"
                            m="0"
                            p="0"
                        >
                            <Heading lineHeight={1.1}>
                                <Text textAlign="center" pt="1rem" pb="3rem" fontSize={{ base: '20px', sm: '24px', md: '30px', lg: "32px", xl: '36px' }}>Financial Snapshot</Text>
                            </Heading>
                            <SummaryTable/>
                        </Box>
                    </GridItem>
                </Grid>
            </Box>
        </div>
    )
}

export default Dashboard;
