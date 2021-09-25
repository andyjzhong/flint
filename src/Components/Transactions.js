import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from './DataContext';
import { Button, Input, Grid } from "@chakra-ui/react"
import TableComponent from './Table.js'
import CreateModal from './CreateModal.js'
import EditModal from './CreateModal.js'
import { useDisclosure } from "@chakra-ui/react"
import './Transactions.css';

const Transactions = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { transactionsList, setFilteredTransactionsList, searchValue, setSearchValue } = useContext(DataContext);

    useEffect(() => {
        getUser()
}, [])

    const getUser = () => {
        console.log("Inside getUser");
    }

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
    }

    const filterTransactions = () => {
        let filtered = transactionsList.filter((item) => {
            return item.description.toLowerCase().includes(searchValue.toLowerCase())
        })

        console.log("filtered transactions", filtered)
        setFilteredTransactionsList(filtered)
    }

    return (
        <div className="transactions">
            <h1>Transactions Page</h1>
            <div className="transactions-table-container">
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <Input w="100%" h="10" variant="outline" placeholder="Search by keyword" onChange={handleSearchChange}/>
                    <Button w="100%" h="10" colorScheme="blue" onClick={filterTransactions}>Search</Button>
                </Grid>
                <Button className="btn-add-transaction" colorScheme="green" onClick={onOpen}>
                    Add Transaction
                </Button>
                <TableComponent />
                <CreateModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
                <EditModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
            </div>
        </div>
    )
}

export default Transactions;
