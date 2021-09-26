import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button } from "@chakra-ui/react"
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import BudgetTableComponent from './BudgetTable.js'
import CreateBudgetModal from './CreateBudgetModal.js'
import EditBudgetModal from './EditBudgetModal.js'
import { useDisclosure } from "@chakra-ui/react"
import BudgetChart from './BudgetChart.js';
import { DataContext } from './DataContext';
import './Transactions.css';

const Budgets = () => {
    let history = useHistory()
    const { accessToken, setAccessToken } = useContext(DataContext);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isTokenValid, setIsTokenValid] = useState(false)

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
        refreshToken()
    },[])

    if(isTokenValid){
        return (
            <div className="transactions">
                <h1>Budgets Page</h1>
                <div class="page-container" style={{display: 'flex'}}>
                    <div class="chart-container" style={{margin: '1rem', border: '1px solid lightgray', padding: '1rem', borderRadius: '1rem'}}>
                        <BudgetChart />
                    </div>
                    <div className="transactions-table-container">
                        <Button className="btn-add-transaction" colorScheme="green" onClick={onOpen}>
                            Add Budgets
                        </Button>
                        <BudgetTableComponent />
                        <CreateBudgetModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
                        <EditBudgetModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="transactions">
                <h1>Budgets Page</h1>
                
            </div>
        )
    }
}

export default Budgets;