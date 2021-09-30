import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Navigation from './Components/Navigation/Navigation.jsx';
import { DataContext } from './Components/DataContext.js'
import Home from './Components/Home.js';
import Dashboard from './Components/Dashboard.js';
import Transactions from './Components/Transactions.js';
import Budgets from './Components/Budgets.js';
import About from './Components/About.js';
import Signup from './Components/Signup.js';
import Login from './Components/Login.js';
import AccountPage from './Components/AccountPage/AccountPage.jsx'

// for testing purposes only
import TableComponent from './Components/TableUI/TableComponent.jsx';

function App() {

    const [userAction, setUserAction] = useState();
    const [matchingTransactionData, setMatchingTransactionData] = useState();
    const [transactionDate, setTransactionDate] = useState();
    const [transactionId, setTransactionId] = useState();
    const [transactionsList, setTransactionsList] = useState([]);
    const [budgetId, setBudgetId] = useState();
    const [budgetsList, setBudgetsList] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [filteredTransactionsList, setFilteredTransactionsList] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [searchStartDate, setSearchStartDate] = useState(new Date("January 1, 2021"));
    const [searchEndDate, setSearchEndDate] = useState(new Date());
    const [summaryData, setSummaryData] = useState();
    const [summaryDateData, setSummaryDateData] = useState();
    const [refreshToken, setRefreshToken] = useState(null)
    const [accessToken, setAccessToken] = useState(null)
    const [editModalCategory, setEditModalCategory] = useState("")
    const [editModalSubcategory, setEditModalSubcategory] = useState("")
    const [editModalAmount, setEditModalAmount] = useState(0)
    const [category, setCategory] = useState("")
    const [subcategory, setSubcategory] = useState("")
    const [amount, setAmount] = useState("")

    return (
        <ChakraProvider theme={theme}>
            <DataContext.Provider
                value = {{
                    category,
                    subcategory,
                    amount,
                    editModalCategory,
                    editModalSubcategory,
                    editModalAmount,
                    userAction,
                    setUserAction,
                    transactionDate,
                    setTransactionDate,
                    isLoggedIn,
                    setIsLoggedIn,
                    currentUserId,
                    setCurrentUserId,
                    transactionsList,
                    setTransactionsList,
                    transactionId,
                    setTransactionId,
                    budgetsList,
                    setBudgetsList,
                    budgetId,
                    setBudgetId,
                    matchingTransactionData,
                    setMatchingTransactionData,
                    filteredTransactionsList,
                    setFilteredTransactionsList,
                    searchValue,
                    setSearchValue,
                    searchCategory,
                    setSearchCategory,
                    searchStartDate,
                    setSearchStartDate,
                    searchEndDate,
                    setSearchEndDate,
                    summaryData,
                    setSummaryData,
                    refreshToken,
                    setRefreshToken,
                    accessToken,
                    setAccessToken,
                    summaryDateData,
                    setSummaryDateData,
                    setEditModalCategory,
                    setEditModalSubcategory,
                    setEditModalAmount,
                    setCategory,
                    setSubcategory,
                    setAmount
                }}
            >
                <Navigation />
                <Route exact path="/" component={Home} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/transactions" component={Transactions} />
                <Route exact path="/budgets" component={Budgets} />
                <Route exact path="/about" component={About} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/account" component={AccountPage} />

                <Route exact path="/table" component={TableComponent} />
            </DataContext.Provider>
        </ChakraProvider>
    );
}

export default App;
