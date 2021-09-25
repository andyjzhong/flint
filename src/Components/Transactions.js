import React, { useState, useEffect, useContext } from 'react';
import DatePicker from "react-datepicker";
import { DataContext } from './DataContext';
import { Button, Input, Grid, GridItem, FormControl, FormLabel, Select } from "@chakra-ui/react"
import TableComponent from './Table.js'
import CreateModal from './CreateModal.js'
import EditModal from './CreateModal.js'
import { useDisclosure } from "@chakra-ui/react"
import './Transactions.css';

const Transactions = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const {
        transactionsList,
        setFilteredTransactionsList,
        searchValue,
        setSearchValue,
        searchCategory,
        setSearchCategory,
        searchStartDate,
        setSearchStartDate,
        searchEndDate,
        setSearchEndDate
    } = useContext(DataContext);

    useEffect(() => {
        getUser()
}, [])

    const getUser = () => {
        console.log("Inside getUser");
    }

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
    }

    const handleSearchCategory = (e) => {
        setSearchCategory(e.target.value)
    }

    const filterTransactions = () => {
        let filtered = transactionsList.filter((item) => {
            if (searchCategory) {
                return (
                    (item.category === searchCategory)
                    && (item.description.toLowerCase().includes(searchValue.toLowerCase()))
                )
            } else {
                return item.description.toLowerCase().includes(searchValue.toLowerCase())
            }
        })

        console.log("filtered transactions", filtered)
        setFilteredTransactionsList(filtered)
    }

    return (
        <div className="transactions">
            <h1>Transactions Page</h1>
            <div className="transactions-table-container">
                <Grid templateColumns="repeat(10, 1fr)" gap={6}>
                    <GridItem colSpan={3}>
                        <Input w="100%" h="10" variant="outline" placeholder="Search by keyword" onChange={handleSearchChange}/>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Select name="input-category" onChange={handleSearchCategory}>
                            <option value="">All Categories</option>
                            <option value="Education">Education</option>
                            <option value="Food">Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Utilities">Utilities</option>
                        </Select>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Button w="100%" h="10" colorScheme="blue" onClick={filterTransactions}>Search</Button>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                        Begin:
                        <DatePicker name="input-date" className="begin-date-picker" selected={searchStartDate} onChange={(date) => setSearchStartDate(date)} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                        End:
                        <DatePicker name="input-date" className="begin-date-picker" selected={searchEndDate} onChange={(date) => setSearchEndDate(date)} />
                        </FormControl>
                    </GridItem>
                </Grid>
                <Button
                    className="btn-add-transaction"
                    size="sm"
                    color={'white'}
                    bgGradient="linear(to-r, green.400,green.400)"
                    _hover={{bgGradient: 'linear(to-r, green.400,green.400)', boxShadow: 'xl'}}
                    onClick={onOpen}>
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
