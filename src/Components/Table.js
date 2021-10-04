import React, { useContext, useEffect } from 'react';
import { DataContext } from './DataContext';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import CreateModal from './CreateModal';
import { Box, Table, Thead, Tr, Th, Td, Tbody, Button, IconButton, ButtonGroup, HStack, Flex, Text, useColorModeValue as mode } from '@chakra-ui/react';
import { AiFillEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { useDisclosure } from "@chakra-ui/react"
import moment from 'moment';
import axios from 'axios';
import { RiAddFill } from 'react-icons/ri'

const TableComponent = () => {

    const userId = localStorage.getItem('fuid');
    const { userAction,
        setUserAction,
        transactionsList,
        setTransactionsList,
        transactionId,
        setTransactionId,
        setMatchingTransactionData,
        filteredTransactionsList,
        accessToken,
        setEditTxDesc,
        setEditTxDate,
        setEditTxType,
        setEditTxCat,
        setEditTxSubcat,
        setEditTxAmt,
        setTxDescription,
        setTxDate,
        setTxType,
        setTxCategory,
        setTxSubcategory,
        setTxAmount,
    } = useContext(DataContext);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isEditOpen , onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
    const { isOpen: isDeleteOpen , onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()

    const getAllTransactions = async () => {
        console.log("Attempting to retrieve all transactions...")

        try {
            const url =
                process.env.REACT_APP_NODE_ENV === 'production'
                    ? `https://flint-server.herokuapp.com/users/${userId}`
                    : `https://flint-server.herokuapp.com/users/${userId}`

            const response = await axios(url,{
                headers: {'authorization': `Bearer ${accessToken}`}
            })

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

        if (transactionsList) {
            let selectedTx = transactionsList.filter((item) => {
                return item._id === key
            })

            setEditTxDesc(selectedTx[0].description)
            setEditTxDate(selectedTx[0].date)
            setEditTxType(selectedTx[0].type)
            setEditTxCat(selectedTx[0].category)
            setEditTxSubcat(selectedTx[0].subcategory)
            setEditTxAmt(selectedTx[0].amount)


            setTxDescription(selectedTx[0].description)
            setTxDate(selectedTx[0].date)
            setTxType(selectedTx[0].type)
            setTxCategory(selectedTx[0].category)
            setTxSubcategory(selectedTx[0].subcategory)
            setTxAmount(selectedTx[0].amount)
        }
    }

    const handleDelete = (e) => {
        selectedTransaction(e)
        onDeleteOpen()
    }

    const handleEdit = (e) => {
        selectedTransaction(e)
        let matchingTransaction = transactionsList.filter((item) => {
            return item._id === transactionId
        })

        setMatchingTransactionData(matchingTransaction[0])

        onEditOpen()
    }

    let transactionRows = transactionsList.map((item, index) => {
        return (
            <Tr bg="white" key={item._id}>
                <Td>{item.description}</Td>
                <Td>{moment(item.date).format('MMM D, YYYY')}</Td>
                <Td>{item.type}</Td>
                <Td>{item.category}</Td>
                <Td>{item.subcategory}</Td>
                <Td isNumeric>${item.amount.toFixed(2)}</Td>
                <Td style={{textAlign: "center"}}>
                    <ButtonGroup variant="solid" size="sm" spacing={2}>
                        <IconButton
                            colorScheme="orange"
                            icon={<AiFillEdit />}
                            size="sm"
                            name={item._id}
                            className="btn-edit-transaction"
                            color={'white'}
                            bgGradient="linear(to-r, orange.400,orange.400)"
                            _hover={{bgGradient: 'linear(to-r, orange.400,orange.400)', boxShadow: 'xl'}}
                            onClick={handleEdit}
                        />
                        <IconButton
                            colorScheme="red"
                            variant="outline"
                            icon={<BsFillTrashFill />}
                            size="sm"
                            name={item._id}
                            className="btn-edit-transaction"
                            color={'white'}
                            bgGradient="linear(to-r, red.500,red.500)"
                            _hover={{bgGradient: 'linear(to-r, red.500,red.500)', boxShadow: 'xl'}}
                            onClick={handleDelete}
                        />
                    </ButtonGroup>
                </Td>
            </Tr>
        )
    })

    let displayedRows = transactionRows;

    if (filteredTransactionsList) {
        let filteredTransactionRows = filteredTransactionsList.map((item, index) => {
            return (
                <Tr bg="white" key={item._id}>
                    <Td>{item.description}</Td>
                    <Td>{moment(item.date).format('MMM D, YYYY')}</Td>
                    <Td>{item.type}</Td>
                    <Td>{item.category}</Td>
                    <Td>{item.subcategory}</Td>
                    <Td isNumeric>${item.amount}</Td>
                    <Td style={{textAlign: "center"}}>
                        <ButtonGroup variant="solid" size="sm" spacing={2}>
                            <IconButton
                                colorScheme="orange"
                                icon={<AiFillEdit />}
                                size="sm"
                                name={item._id}
                                className="btn-edit-transaction"
                                color={'white'}
                                bgGradient="linear(to-r, orange.400,orange.400)"
                                _hover={{bgGradient: 'linear(to-r, orange.400,orange.400)', boxShadow: 'xl'}}
                                onClick={handleEdit}
                            />
                            <IconButton
                                colorScheme="red"
                                variant="outline"
                                icon={<BsFillTrashFill />}
                                size="sm"
                                name={item._id}
                                className="btn-edit-transaction"
                                color={'white'}
                                bgGradient="linear(to-r, red.500,red.500)"
                                _hover={{bgGradient: 'linear(to-r, red.500,red.500)', boxShadow: 'xl'}}
                                onClick={handleDelete}
                            />
                        </ButtonGroup>
                    </Td>
                </Tr>
            )
        })

        displayedRows = filteredTransactionRows;
    }

    return (
        <>
            <Box as="section" py="12">
                <Box
                    maxW={{
                        base: 'xl',
                        md: '7xl',
                    }}
                    mx="auto"
                    px={{
                        base: '6',
                        md: '8',
                    }}
                >
                <Box overflowX="auto">
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
                            New Transaction
                        </Button>
                        </ButtonGroup>
                    </HStack>
                        <Table my="8" borderWidth="1px" fontSize="sm">
                          <Thead bg={mode('gray.50', 'gray.800')}>
                            <Tr>
                                <Th whiteSpace="nowrap" scope="col">Description</Th>
                                <Th whiteSpace="nowrap" scope="col">Date</Th>
                                <Th whiteSpace="nowrap" scope="col">Type</Th>
                                <Th whiteSpace="nowrap" scope="col">Category</Th>
                                <Th whiteSpace="nowrap" scope="col">Subcategory</Th>
                                <Th whiteSpace="nowrap" scope="col" textAlign="center">Amount</Th>
                                <Th whiteSpace="nowrap" scope="col" textAlign="center">Actions</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {displayedRows}
                          </Tbody>
                        </Table>
                    </Box>
                    <Flex align="center" justify="space-between">
                        <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
                            {transactionsList.length} transactions
                        </Text>
                    </Flex>
                </Box>
            </Box>

            <CreateModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
            <EditModal isEditOpen={isEditOpen} onEditOpen={onEditOpen} onEditClose={onEditClose}/>
            <DeleteModal isOpen={isDeleteOpen} onOpen={onDeleteOpen} onClose={onDeleteClose}/>
        </>
    )
}

export default TableComponent;
