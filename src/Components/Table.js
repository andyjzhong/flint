import React, { useContext, useEffect } from 'react';
import { DataContext } from './DataContext';
import { Table, Thead, Tr, Th, Td, Tbody, Button } from '@chakra-ui/react';
import './Table.css';
import axios from 'axios';

const TableComponent = () => {

    const userId = "614dd60e29fe32ab9541683b";
    const { transactionsList, setTransactionsList } = useContext(DataContext);

    const getAllTransactions = async () => {
        console.log("Attempting to retrieve all transactions...")

        try {
            const url =
                process.env.NODE_ENV === 'production'
                    ? `http://flint-server.herokuapp.com/users/${userId}`
                    : `http://localhost:8000/users/${userId}`

            const response = await axios(url)
            console.log("Response data: ", response.data.transactions);
            setTransactionsList(response.data.transactions)

        } catch (error) {
            console.warn("Error when retrieving all transactions.")
        }
    }

    useEffect(() => {
        getAllTransactions()
    }, [])

    let transactionItem = {}

    let transactionRow = transactionsList.map((item, index) => {
        return (
            <Tr>
                <Td>Starbucks</Td>
                <Td>September 21, 2021</Td>
                <Td>Expense</Td>
                <Td>Food</Td>
                <Td>Coffee Shops</Td>
                <Td isNumeric>8.25</Td>
                <Td><Button className="btn-edit-transaction" colorScheme="orange">Edit</Button></Td>
                <Td><Button className="btn-edit-transaction" colorScheme="red">Delete</Button></Td>
            </Tr>
        )
    })

    return (
        <div className="table">
            <Table size="sm">
                <Thead>
                    <Tr>
                        <Th>Description</Th>
                        <Th>Date</Th>
                        <Th>Type</Th>
                        <Th>Category</Th>
                        <Th>Subcategory</Th>
                        <Th isNumeric>Amount</Th>
                        <Th>Edit</Th>
                        <Th>Delete</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {transactionRow}
                </Tbody>
            </Table>
        </div>
    )
}

export default TableComponent;
