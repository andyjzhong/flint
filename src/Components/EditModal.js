import React, { useState, useContext } from 'react';
import { DataContext } from './DataContext';
import DatePickerComponent from './DatePicker.js'
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
    Stack
} from "@chakra-ui/react"

const categoryOptionsRaw = [
    {
        id: 1,
        major: "Food",
        minor: ["Groceries", "Fast Food"]
    },
    {
        id: 2,
        major: "Education",
        minor: ["Books", "Supplies"]
    },
    {
        id: 3,
        major: "Travel",
        minor: ["Tolls", "Hotel"]
    },
    {
        id: 4,
        major: "Utilities",
        minor: ["Phone", "Gas", "Sewage"]
    }
]

const EditModal = (props) => {

    const userId = "614dd60e29fe32ab9541683b";

    const { transactionDate, transactionId, setUserAction, matchingTransactionData } = useContext(DataContext);
    const [description, setDescription] = useState("")
    const [type, setType] = useState("")
    const [category, setCategory] = useState("")
    const [subcategory, setSubcategory] = useState("")
    const [amount, setAmount] = useState("")

    console.log("matchingTransactionData is", matchingTransactionData);

    let categoryOptions = categoryOptionsRaw.map((item, index) => {
        return (
            <option key={item.id} value={item.major}>{item.major}</option>
        )
    })

    // TODO: Currently hardcoded.
    let selectedCategory = "Utilities"

    const matchingCategory = categoryOptionsRaw.filter((item, index) => {
        return item.major === selectedCategory;
    })

    let subcategoryOptions = matchingCategory[0].minor.map((item, index) => {

        if (selectedCategory.length > 0) {
            return (
                <option key={item} value={item}>{item}</option>
            )
        } else {
            return (
                <option>No Category Selected</option>
            )
        }

    })

    const editTransaction = async () => {
        console.log(`Attempting to edit a transaction with id of ${transactionId}...`)

        const url =
            process.env.NODE_ENV === 'production'
                ? `http://flint-server.herokuapp.com/users/${userId}/edittransaction/${transactionId}`
                : `http://localhost:8000/users/${userId}/edittransaction/${transactionId}`


        console.log("url @@@@@", url);
        axios.put(url, {
            "description": description,
            "date": transactionDate,
            "type": type,
            "category": category,
            "subcategory": subcategory,
            "amount": amount
        })
        .then((res) => {
            console.log("Success!")
            setUserAction("edit")
            props.onEditClose()
        })
        .catch(console.error)
    }

    const storeDescription = ((e) => {
        setDescription(e.target.value)
    })

    const storeType = ((e) => {
        setType(e.target.value)
    })

    const storeCategory = ((e) => {
        setCategory(e.target.value)
    })

    const storeSubcategory = ((e) => {
        setSubcategory(e.target.value)
    })

    const storeAmount = ((e) => {
        setAmount(e.target.value)
    })

    return (
        <>
            <Modal isOpen={props.isEditOpen} onClose={props.onEditClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Transaction</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Input name="input-description" onChange={storeDescription} placeholder="i.e. Starbucks" />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Type</FormLabel>
                            <RadioGroup defaultValue="2">
                                <Stack spacing={5} direction="row">
                                    <Radio name="input-type" onChange={storeType} colorScheme="green" value="Income">Income</Radio>
                                    <Radio name="input-type" onChange={storeType} colorScheme="red" value="Expense">Expense</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Category</FormLabel>
                            <Select name="input-category" onChange={storeCategory} placeholder="Select category">
                                {categoryOptions}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Subcategory</FormLabel>
                            <Select name="input-subcategory" onChange={storeSubcategory} placeholder="Select category">
                                {subcategoryOptions}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Date</FormLabel>
                            <DatePickerComponent name="input-date" className="transaction-date-picker"/>
                        </FormControl>

                        <FormControl mt={4}>
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
