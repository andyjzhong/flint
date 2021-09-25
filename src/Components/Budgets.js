import React, { useEffect } from 'react';
import { Button } from "@chakra-ui/react"
import BudgetTableComponent from './BudgetTable.js'
import CreateBudgetModal from './CreateBudgetModal.js'
import EditBudgetModal from './EditBudgetModal.js'
import { useDisclosure } from "@chakra-ui/react"
import BudgetChart from './BudgetChart.js';
import './Transactions.css';

const Budgets = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        getUser()
}, [])

    const getUser = () => {
        console.log("Inside getUser");
    }

    return (
        <div className="transactions">
            <h1>Budgets Page</h1>
            <BudgetChart />
            <div className="transactions-table-container">
                <Button className="btn-add-transaction" colorScheme="green" onClick={onOpen}>
                    Add Budgets
                </Button>
                <BudgetTableComponent />
                <CreateBudgetModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
                <EditBudgetModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
            </div>
        </div>
    )
}

export default Budgets;