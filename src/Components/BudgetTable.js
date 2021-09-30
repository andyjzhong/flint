import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from './DataContext';
import DeleteBudgetModal from './DeleteBudgetModal';
import CreateBudgetModal from './CreateBudgetModal';
import EditBudgetModal from './EditBudgetModal';
import { Table, Thead, Tr, Th, Td, Tbody, IconButton, Box, HStack, ButtonGroup, Button, useColorModeValue as mode } from '@chakra-ui/react';
import { AiFillEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { useDisclosure } from "@chakra-ui/react"
import axios from 'axios';
import { RiAddFill } from 'react-icons/ri'

const BudgetTableComponent = () => {
    const { setUserAction, budgetsList, setBudgetsList, setBudgetId, accessToken, setEditModalSubcategory, setEditModalCategory, setEditModalAmount } = useContext(DataContext);
    const userId = localStorage.getItem('fuid');

    const { isOpen, onOpen, onClose } = useDisclosure()
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
            console.log("A", budgetsList)
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
        console.log("Full List", budgetsList);

        if (budgetsList) {
            let selectedBudget = budgetsList.filter((item) => {
                return item._id === key
            })
            setEditModalCategory(selectedBudget[0].category)
            setEditModalSubcategory(selectedBudget[0].subcategory)
            setEditModalAmount(selectedBudget[0].amount)
        }
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
        <>
        <HStack mb={14} style={{position: "relative"}}>
            <ButtonGroup size="sm" style={{position: "absolute", right: "0", top: "0"}} >
            <Button
                m={1}
                variant="outline"
                onClick={onOpen}
                iconSpacing="1"
                leftIcon={<RiAddFill fontSize="1.25em" />}
                colorScheme="green"
                w="full">
                New Budget
            </Button>
            </ButtonGroup>
        </HStack>

        <Box
            className="table"
            overflowX="auto"
            w={"100%"}
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
            <CreateBudgetModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
            <EditBudgetModal isEditOpen={isEditOpen} onEditOpen={onEditOpen} onEditClose={onEditClose}/>
            <DeleteBudgetModal isOpen={isDeleteOpen} onOpen={onDeleteOpen} onClose={onDeleteClose}/>
        </Box>
        </>
    )
}

export default BudgetTableComponent;
