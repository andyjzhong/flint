import React, { useContext, useEffect } from 'react';
import { DataContext } from './DataContext';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import { Table, Thead, Tr, Th, Td, Tbody, Button } from '@chakra-ui/react';
import { useDisclosure } from "@chakra-ui/react"
import './Table.css';
import axios from 'axios';

const TableComponent = () => {

    const userId = "614dd60e29fe32ab9541683b";
    const { userAction, setUserAction, transactionsList, setTransactionsList, transactionId, setTransactionId, matchingTransactionData, setMatchingTransactionData, filteredTransactionsList, setFilteredTransactionsList, searchValue } = useContext(DataContext);

    const { isOpen: isEditOpen , onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
    const { isOpen: isDeleteOpen , onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()

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
            setUserAction("")
        } catch (error) {
            console.warn("Error when retrieving all transactions.")
        }
    }

    useEffect(() => {
        getAllTransactions()
    }, [userAction])

    const selectedTransaction = (e) => {
        let key = e.currentTarget.name;
        setTransactionId(key);
        console.log("The selected transaction's id is:", key);
    }

    const handleDelete = (e) => {
        selectedTransaction(e)
        console.log("Clicked Delete");
        onDeleteOpen()
    }

    const handleEdit = (e) => {
        selectedTransaction(e)
        console.log("Clicked Edit");
        console.log("transactionsList is", transactionsList)
        let matchingTransaction = transactionsList.filter((item) => {
            return item._id === transactionId
        })

        setMatchingTransactionData(matchingTransaction[0])

        onEditOpen()
    }

    let transactionRows = transactionsList.map((item, index) => {
        return (
            <Tr key={item._id}>
                <Td>{item.description}</Td>
                <Td>{item.date}</Td>
                <Td>{item.type}</Td>
                <Td>{item.category}</Td>
                <Td>{item.subcategory}</Td>
                <Td isNumeric>{item.amount}</Td>
                <Td>
                    <Button
                        name={item._id}
                        className="btn-edit-transaction"
                        colorScheme="orange"
                        onClick={handleEdit}
                    >Edit</Button>
                </Td>
                <Td>
                    <Button
                        name={item._id}
                        className="btn-edit-transaction"
                        onClick={handleDelete}
                        colorScheme="red">Delete</Button>
                </Td>
            </Tr>
        )
    })

    let displayedRows = transactionRows;

    if (filteredTransactionsList) {
        let filteredTransactionRows = filteredTransactionsList.map((item, index) => {
            return (
                <Tr key={item._id}>
                    <Td>{item.description}</Td>
                    <Td>{item.date}</Td>
                    <Td>{item.type}</Td>
                    <Td>{item.category}</Td>
                    <Td>{item.subcategory}</Td>
                    <Td isNumeric>{item.amount}</Td>
                    <Td>
                        <Button
                            name={item._id}
                            className="btn-edit-transaction"
                            colorScheme="orange"
                            onClick={handleEdit}
                        >Edit</Button>
                    </Td>
                    <Td>
                        <Button
                            name={item._id}
                            className="btn-edit-transaction"
                            onClick={handleDelete}
                            colorScheme="red">Delete</Button>
                    </Td>
                </Tr>
            )
        })

        console.log("filteredTransactionRow", filteredTransactionRows);

        if (searchValue) {
            displayedRows = filteredTransactionRows;
        } else {
            displayedRows = transactionRows;
            setFilteredTransactionsList("")
        }
    }

    useEffect(() => {
        console.log("filteredTransactionsList changed");
        console.log("searchValue is", searchValue);
}, [filteredTransactionsList])

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
                    {displayedRows}
                </Tbody>
            </Table>

            <EditModal isEditOpen={isEditOpen} onEditOpen={onEditOpen} onEditClose={onEditClose}/>
            <DeleteModal isOpen={isDeleteOpen} onOpen={onDeleteOpen} onClose={onDeleteClose}/>
        </div>
    )
}

export default TableComponent;
