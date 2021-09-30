import React, { useContext, useEffect } from 'react';
import { DataContext } from './DataContext';
import DeleteBudgetModal from './DeleteBudgetModal';
import EditBudgetModal from './EditBudgetModal';
import { Table, Thead, Tr, Th, Td, Tbody, IconButton, Box, HStack, useColorModeValue as mode } from '@chakra-ui/react';
import { AiFillEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { useDisclosure } from "@chakra-ui/react"
import axios from 'axios';

const BudgetTableComponent = () => {

    const { setUserAction, budgetsList, setBudgetsList, setBudgetId, accessToken } = useContext(DataContext);
    const userId = localStorage.getItem('fuid');

    const { isOpen: isEditOpen , onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
    const { isOpen: isDeleteOpen , onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()

    const getAllBudgets = async () => {
        try {
            const url =
                process.env.NODE_ENV === 'production'
                    ? `http://flint-server.herokuapp.com/users/${userId}`
                    : `http://localhost:8000/users/${userId}`

            const response = await axios.get(url,{
                headers: {"authorization": `Bearer ${accessToken}`}
            })
            setBudgetsList(response.data.budgets)
            setUserAction("")
        } catch (error) {
            console.warn("Error when retrieving all budgets.")
        }
    }

    useEffect(() => {
        if(!accessToken){
            return
        } else {
            getAllBudgets()
        }
    }, [accessToken])

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
            <Tr bg={"white"} key={item._id} >
                <Td>{item.category}</Td>
                <Td>{item.subcategory}</Td>
                <Td isNumeric >{item.amount.toFixed(2)}</Td>
                <Td whiteSpace="nowrap" >
                    <HStack>
                        <IconButton
                            _hover={{bgGradient: 'linear(to-r, orange.400,orange.400)', boxShadow: 'xl'}}
                            bgGradient="linear(to-r, orange.400,orange.400)"
                            className="btn-edit-budget"
                            color={'white'}
                            colorScheme="orange"
                            icon={<AiFillEdit />}
                            name={item._id}
                            onClick={handleEdit}
                            size="sm"
                        />
                        <IconButton
                            _hover={{bgGradient: 'linear(to-r, red.500,red.500)', boxShadow: 'xl'}}
                            bgGradient="linear(to-r, red.500,red.500)"
                            className="btn-delete-budget"
                            color={'white'}
                            colorScheme="red"
                            icon={<BsFillTrashFill />}
                            name={item._id}
                            onClick={handleDelete}
                            size="sm"
                            variant="outline"
                        />
                    </HStack>
                </Td>
            </Tr>
        )
    })

    return (
        <Box
            className="table"
            overflowX="auto"
            w={{ base: "90%", sm: "90%", md: "90%", lg: "75%"}}
        >
            <Table borderWidth="1px">
                <Thead bg={mode('gray.50', 'gray.800')} >
                    <Tr>
                    <Th whiteSpace="nowrap" scope="col">Category</Th>
                    <Th whiteSpace="nowrap" scope="col">Subcategory</Th>
                    <Th whiteSpace="nowrap" scope="col" textAlign="center">Amount</Th>
                    <Th whiteSpace="nowrap" scope="col" textAlign="center">Actions</Th>
                    </Tr>
                </Thead>
                <Tbody >{budgetRow}</Tbody>
            </Table>
            <EditBudgetModal isEditOpen={isEditOpen} onEditOpen={onEditOpen} onEditClose={onEditClose}/>
            <DeleteBudgetModal isOpen={isDeleteOpen} onOpen={onDeleteOpen} onClose={onDeleteClose}/>
        </Box>
    )
}

export default BudgetTableComponent;
