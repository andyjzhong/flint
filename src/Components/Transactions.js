import React from 'react';
import { Button } from "@chakra-ui/react"
import TableComponent from './Table.js'
import './Transactions.css';

const Transactions = () => {
    return (
        <div className="transactions">
            <h1>Transactions Page</h1>
            <div className="transactions-table-container">
                <Button className="btn-add-transaction" colorScheme="blue">Add Transaction</Button>
                <TableComponent />
            </div>
        </div>
    )
}

export default Transactions;
