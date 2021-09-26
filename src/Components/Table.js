import React, { useContext, useEffect } from 'react';
import { DataContext } from './DataContext';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import { Table, Thead, Tr, Th, Td, Tbody, Button } from '@chakra-ui/react';
import { useDisclosure } from "@chakra-ui/react"
import './Table.css';
import moment from 'moment';
import axios from 'axios';

const TableComponent = () => {

    const userId = localStorage.getItem('fuid');
    const { userAction, setUserAction, transactionsList, setTransactionsList, transactionId, setTransactionId, matchingTransactionData, setMatchingTransactionData, filteredTransactionsList, setFilteredTransactionsList, searchValue, searchCategory, searchStartDate, searchEndDate, accessToken } = useContext(DataContext);

    const { isOpen: isEditOpen , onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
    const { isOpen: isDeleteOpen , onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()

    const getAllTransactions = async () => {
        console.log("Attempting to retrieve all transactions...")

        try {
            const url =
                process.env.NODE_ENV === 'production'
                    ? `http://flint-server.herokuapp.com/users/${userId}`
                    : `http://localhost:8000/users/${userId}`

            const response = await axios(url,{
                headers: {'authorization': `Bearer ${accessToken}`}
            })
            console.log("Response data: ", response.data.transactions);

            let transactionsArray = response.data.transactions.sort(function(a, b){
                return moment(a.date).format("YYYYMMDD") - moment(b.date).format("YYYYMMDD")
            })

            setTransactionsList(transactionsArray)
            setUserAction("")
        } catch (error) {
            console.warn("Error when retrieving all transactions.")
        }
    }

    useEffect(() => {
        if(!accessToken){
            return
        } else {
            getAllTransactions()
        }
    }, [userAction, accessToken])

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
                <Td>{moment(item.date).format('MMM D, YYYY')}</Td>
                <Td>{item.type}</Td>
                <Td>{item.category}</Td>
                <Td>{item.subcategory}</Td>
                <Td isNumeric>${item.amount}</Td>
                <Td>
                    <Button
                        size="sm"
                        name={item._id}
                        className="btn-edit-transaction"
                        color={'white'}
                        bgGradient="linear(to-r, orange.400,orange.400)"
                        _hover={{bgGradient: 'linear(to-r, orange.400,orange.400)', boxShadow: 'xl'}}
                        onClick={handleEdit}
                    >Edit</Button>
                </Td>
                <Td>
                    <Button
                        size="sm"
                        name={item._id}
                        className="btn-edit-transaction"
                        color={'white'}
                        bgGradient="linear(to-r, red.500,red.500)"
                        _hover={{bgGradient: 'linear(to-r, red.500,red.500)', boxShadow: 'xl'}}
                        onClick={handleDelete}
                    >Delete</Button>
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
                    <Td>{moment(item.date).format('MMM D, YYYY')}</Td>
                    <Td>{item.type}</Td>
                    <Td>{item.category}</Td>
                    <Td>{item.subcategory}</Td>
                    <Td isNumeric>${item.amount}</Td>
                    <Td>
                        <Button
                            size="sm"
                            name={item._id}
                            className="btn-edit-transaction"
                            color={'white'}
                            bgGradient="linear(to-r, orange.400,orange.400)"
                            _hover={{bgGradient: 'linear(to-r, orange.400,orange.400)', boxShadow: 'xl'}}
                            onClick={handleEdit}
                        >Edit</Button>
                    </Td>
                    <Td>
                        <Button
                            size="sm"
                            name={item._id}
                            className="btn-edit-transaction"
                            color={'white'}
                            bgGradient="linear(to-r, red.500,red.500)"
                            _hover={{bgGradient: 'linear(to-r, red.500,red.500)', boxShadow: 'xl'}}
                            onClick={handleDelete}
                            >Delete</Button>
                    </Td>
                </Tr>
            )
        })

        console.log("filteredTransactionRow", filteredTransactionRows);

        // if (searchValue === "" && searchCategory === "") {
        //     displayedRows = filteredTransactionRows;
        //     setFilteredTransactionsList("")
        // } else {
            displayedRows = filteredTransactionRows;
        // }
    }

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
