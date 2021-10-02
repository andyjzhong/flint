import React, { useState, useContext } from 'react';
import { DataContext } from './DataContext';
import DatePicker from "react-datepicker";
import categoryOptionsRaw from "../categories"
import axios from 'axios';
import moment from 'moment';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    Button,
    RadioGroup,
    Radio,
    Stack,
    SimpleGrid
} from "@chakra-ui/react"

const EditModal = (props) => {

    const userId = localStorage.getItem('fuid');

    const { txDate, transactionId, setUserAction, matchingTransactionData, accessToken,
        editTxDesc,
        editTxDate,
        editTxType,
        editTxCat,
        editTxSubcat,
        editTxAmt,
        setEditTxDesc,
        setEditTxDate,
        setEditTxType,
        setEditTxCat,
        setEditTxSubcat,
        setEditTxAmt,
        txDescription,
        txType,
        txCategory,
        txSubcategory,
        txAmount,
        setTxDescription,
        setTxType,
        setTxCategory,
        setTxSubcategory,
        setTxAmount,
        setTxDate
    } = useContext(DataContext);

    let categoryOptions = categoryOptionsRaw.map((item, index) => {
        return (
            <option key={item.id} value={item.major}>{item.major}</option>
        )
    })

    let subcategoryOptions = ""

    if (txCategory) {
        let selectedCategory = categoryOptionsRaw.filter((item, index) => {
            return item.major === txCategory
        })

        subcategoryOptions = selectedCategory[0].minor.map((item, index) => {
            if (selectedCategory.length > 0) {
                return (
                    <option key={index} value={item}>{item}</option>
                )
            } else {
                return (
                    <option>No Category Selected</option>
                )
            }
        })
    }

    const editTransaction = async () => {
        console.log(`Attempting to edit a transaction with id of ${transactionId}...`)

        const url =
            process.env.REACT_APP_NODE_ENV === 'production'
                ? `https://flint-server.herokuapp.com/users/${userId}/edittransaction/${transactionId}`
                : `https://flint-server.herokuapp.com/users/${userId}/edittransaction/${transactionId}`

        axios.put(url, {
            "description": txDescription,
            "date": txDate,
            "type": txType,
            "category": txCategory,
            "subcategory": txSubcategory,
            "amount": txAmount
        },{
            headers: {"authorization": `Bearer ${accessToken}`}
        })
        .then((res) => {
            console.log("Success!")
            setUserAction("edit")
            props.onEditClose()
        })
        .catch(console.error)
    }

    const storeDescription = ((e) => {
        setTxDescription(e.target.value)
        setEditTxDesc(e.target.value)
    })

    let [isIncome, setIsIncome] = useState();

    const storeType = ((e) => {
        setTxType(e.target.value)
        setEditTxType(e.target.value)

        if (isIncome === true) {
            setIsIncome(false)
            setTxType("Income")
            setEditTxType("Income")
        } else {
            setIsIncome(true)
        }
    })

    const storeCategory = ((e) => {
        setTxCategory(e.target.value)
        setEditTxCat(e.target.value)
    })

    const storeSubcategory = ((e) => {
        setTxSubcategory(e.target.value)
        setEditTxSubcat(e.target.value)
    })

    const storeTxAmount = ((e) => {
        setTxAmount(e.target.value)
        setEditTxAmt(e.target.value)
    })

    const handleDateChange = (date) => {
        console.log("Handle Date Change", date)
        setEditTxDate(date)
        setTxDate(date)
    }

    return (
        <>
            <Modal isCentered isOpen={props.isEditOpen} onClose={props.onEditClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Transaction</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl mb={6}>
                            <FormLabel>Type</FormLabel>
                            <RadioGroup value={editTxType} defaultValue="2">
                                <Stack spacing={5} direction="row">
                                    <Radio name="input-type" onChange={storeType} value="Income">Income</Radio>
                                    <Radio name="input-type" onChange={storeType} value="Expense">Expense</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>
                        <FormControl mb={6}>
                            <FormLabel>Description</FormLabel>
                            <Input value={editTxDesc} name="input-description" onChange={storeDescription} placeholder="i.e. Starbucks" />
                        </FormControl>
                        <SimpleGrid mb={6} columns={2} spacing={2}>
                            <FormControl>
                                <FormLabel>Category</FormLabel>
                                <Select isDisabled={isIncome ? true : false} value={isIncome ? "Income" : editTxCat} name="input-category" onChange={storeCategory} placeholder="Select category">
                                    {categoryOptions}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Subcategory</FormLabel>
                                <Select value={editTxSubcat} name="input-subcategory" onChange={storeSubcategory} placeholder="Select category">
                                    {subcategoryOptions}
                                </Select>
                            </FormControl>
                        </SimpleGrid>
                        <SimpleGrid mb={6} columns={2} spacing={2}>
                            <FormControl>
                                <FormLabel>Date</FormLabel>
                                <DatePicker
                                    startDate={moment(editTxDate).format("MM/DD/YYYY")}
                                    value={moment(editTxDate).format("MM/DD/YYYY")}
                                    onChange={handleDateChange}
                                    className="transaction-date-picker"/>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Amount</FormLabel>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.300"
                                        fontSize="1.2em"
                                        children="$"
                                    />
                                    <Input value={editTxAmt} name="input-amount" onChange={storeTxAmount} placeholder="Enter amount" />
                                </InputGroup>
                            </FormControl>
                        </SimpleGrid>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={editTransaction} type="submit">Save</Button>
                        <Button onClick={props.onEditClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditModal;
