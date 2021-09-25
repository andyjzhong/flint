import React, { useContext, useEffect } from 'react';
import { DataContext } from './DataContext';
import DeleteBudgetModal from './DeleteBudgetModal';
import EditBudgetModal from './EditBudgetModal';
import { Table, Thead, Tr, Th, Td, Tbody, Button } from '@chakra-ui/react';
import { useDisclosure } from "@chakra-ui/react"
import './Table.css';
import axios from 'axios';

const BudgetTableComponent = () => {

    const { userAction, setUserAction, budgetsList, setBudgetsList, setBudgetId, currentUserId } = useContext(DataContext);
    const userId = currentUserId._id;

    const { isOpen: isEditOpen , onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
    const { isOpen: isDeleteOpen , onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()

    const getAllBudgets = async () => {
        console.log("Attempting to retrieve all budgets...")

        try {
            const url =
                process.env.NODE_ENV === 'production'
                    ? `http://flint-server.herokuapp.com/users/${userId}`
                    : `http://localhost:8000/users/${userId}`

            const response = await axios(url)
            console.log("Response data: ", response.data.budgets);
            setBudgetsList(response.data.budgets)
            setUserAction("")
        } catch (error) {
            console.warn("Error when retrieving all budgets.")
        }
    }

    useEffect(() => {
        getAllBudgets()
    }, [userAction])

    const selectedBudget = (e) => {
        let key = e.currentTarget.name;
        setBudgetId(key);
        console.log("The selected transaction's id is:", key);
    }

    const handleDelete = (e) => {
        selectedBudget(e)
        console.log("Clicked Delete");
        onDeleteOpen()
    }

    const handleEdit = (e) => {
        selectedBudget(e)
        console.log("Clicked Edit");
        onEditOpen()
    }

    let budgetRow = budgetsList.map((item, index) => {
        return (
            <Tr key={item._id}>
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

    return (
        <div className="table">
            <Table size="sm">
                <Thead>
                    <Tr>
                        <Th>Category</Th>
                        <Th>Subcategory</Th>
                        <Th isNumeric>Amount</Th>
                        <Th>Edit</Th>
                        <Th>Delete</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {budgetRow}
                </Tbody>
            </Table>

            <EditBudgetModal isEditOpen={isEditOpen} onEditOpen={onEditOpen} onEditClose={onEditClose}/>
            <DeleteBudgetModal isOpen={isDeleteOpen} onOpen={onDeleteOpen} onClose={onDeleteClose}/>
        </div>
    )
}

export default BudgetTableComponent;