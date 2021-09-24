import React, { useContext, useEffect } from 'react';
import { DataContext } from './DataContext';
import { Table, Thead, Tr, Th, Td, Tbody, Button } from '@chakra-ui/react';
import EditModal from './CreateModal.js'
import { useDisclosure } from "@chakra-ui/react"
import './Table.css';
import axios from 'axios';

const TableComponent = () => {

    const userId = "614dd60e29fe32ab9541683b";
    const { transactionsList, setTransactionsList } = useContext(DataContext);
    const { isOpen, onOpen, onClose } = useDisclosure()

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

    let transactionRow = transactionsList.map((item, index) => {
        return (
            <Tr>
                <Td>{item.description}</Td>
                <Td>{item.date}</Td>
                <Td>{item.type}</Td>
                <Td>{item.category}</Td>
                <Td>{item.subcategory}</Td>
                <Td isNumeric>{item.amount}</Td>
                <Td><Button
                    className="btn-edit-transaction"
                    colorScheme="orange"
                    onClick={onOpen}
                >Edit</Button></Td>
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

            <EditModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
        </div>
    )
}

export default TableComponent;
