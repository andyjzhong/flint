import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from './DataContext';
import DatePickerComponent from './DatePicker.js'
import categoryOptionsRaw from "../categories"
import axios from 'axios';
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

const CreateModal = (props) => {

    const userId = localStorage.getItem('fuid');

    const { txDate, setUserAction, accessToken, isIncome, setIsIncome } = useContext(DataContext);
    const [description, setDescription] = useState("")
    const [type, setType] = useState("Expense")
    const [category, setCategory] = useState("")
    const [subcategory, setSubcategory] = useState("")
    const [amount, setAmount] = useState("")

    let categoryOptions = categoryOptionsRaw.map((item, index) => {
        return (
            <option key={item.id} value={item.major}>{item.major}</option>
        )
    })

    let subcategoryOptions = ""

    if (category) {
        let selectedCategory = categoryOptionsRaw.filter((item, index) => {
            return item.major === category
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

    const createTransaction = async () => {
        console.log("Attempting to create a new transaction...")

        const url =
            process.env.REACT_APP_NODE_ENV === 'production'
                ? `https://flint-server.herokuapp.com/users/${userId}/addtransaction`
                : `https://flint-server.herokuapp.com/users/${userId}/addtransaction`

        axios.put(url, {
            "description": description,
            "date": txDate,
            "type": type,
            "category": category,
            "subcategory": subcategory,
            "amount": amount
        },{headers: {
            authorization: `Bearer ${accessToken}`
        }})
        .then((res) => {
            console.log("Success!")
            props.onClose()
            setUserAction("create")
            setCategory("")
            setType("Expense")
            setIsIncome(false)
        })
        .catch(console.error)
    }

    const storeDescription = ((e) => {
        setDescription(e.target.value)
    })

    const storeType = ((e) => {
        setType(e.target.value)

        if (isIncome === true) {
            setIsIncome(false)
        } else {
            setIsIncome(true)
            setCategory("Income")
        }
    })

    useEffect(() => {
        setIsIncome(false)
    },[])

    const storeCategory = ((e) => {
        if (isIncome === true) {
            setCategory("Income")
        } else {
            setCategory(e.target.value)
        }
    })

    const storeSubcategory = ((e) => {
        setSubcategory(e.target.value)
    })

    const storeAmount = ((e) => {
        setAmount(e.target.value)
    })

    return (
        <>
            <Modal isCentered isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New Transaction</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl mb={6}>
                            <FormLabel>Type</FormLabel>
                            <RadioGroup id="radioType" defaultValue="Expense">
                                <Stack spacing={5} direction="row">
                                    <Radio name="input-type" onChange={storeType} value="Income">Income</Radio>
                                    <Radio name="input-type" onChange={storeType} value="Expense">Expense</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>
                        <FormControl mb={6}>
                            <FormLabel>Description</FormLabel>
                            <Input name="input-description" onChange={storeDescription} placeholder="i.e. Starbucks" />
                        </FormControl>
                        <SimpleGrid mb={6} columns={2} spacing={2}>
                            <FormControl>
                                <FormLabel>Category</FormLabel>
                                <Select
                                    isDisabled={ isIncome ? true : false }
                                    value={ (type === "Income")  ? "Income" : category}
                                    name="input-category" onChange={storeCategory} placeholder="Select category">
                                    {categoryOptions}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Subcategory</FormLabel>
                                <Select name="input-subcategory" onChange={storeSubcategory} placeholder="Select category">
                                    {subcategoryOptions}
                                </Select>
                            </FormControl>
                        </SimpleGrid>

                        <SimpleGrid mb={6} columns={2} spacing={2}>
                            <FormControl>
                                <FormLabel>Date</FormLabel>
                                <DatePickerComponent wrapperClassName="add-transaction-date" name="input-date" className="transaction-date-picker"/>
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
                                    <Input name="input-amount" onChange={storeAmount} placeholder="Enter amount" />
                                </InputGroup>
                            </FormControl>
                        </SimpleGrid>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={createTransaction} type="submit">Save</Button>
                        <Button onClick={props.onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateModal;
