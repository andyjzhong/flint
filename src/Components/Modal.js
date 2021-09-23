import React, { useState } from 'react';
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

const ModalComponent = (props) => {

    const [transactionData, setTransactionData] = useState("")

    const createTransaction = async () => {
        console.log("Attempting to create a new transaction...")

        const url =
            process.env.NODE_ENV === 'production'
                ? `http://flint-server.herokuapp.com/transactions`
                : `http://localhost:8000/transactions`

        axios.post(url, {
            "description": "Taco Bell",
            "date": "July 1, 2021",
            "type": "Expense",
            "category": "Food",
            "subcategory": "Fast Food",
            "amount": 2.00
            // "description": transactionData.description,
            // "date": transactionData.date,
            // "type": transactionData.type,
            // "category": transactionData.category,
            // "subcategory": transactionData.subcategory,
            // "amount": transactionData.amount
        })
        .then((res) => {
            console.log("Success!")
            props.onClose()
        })
        .catch(console.error)
    }

    const setupNewTransaction = () => {
        let inputData
        setTransactionData(inputData);
    }

    return (
        <>
            <Modal isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New Transaction</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Input placeholder="i.e. Starbucks" />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Type</FormLabel>
                            <RadioGroup defaultValue="2">
                                <Stack spacing={5} direction="row">
                                    <Radio colorScheme="green" value="1">Income</Radio>
                                    <Radio colorScheme="red" value="2">Expense</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Category</FormLabel>
                            <Select placeholder="Select category">
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Subcategory</FormLabel>
                            <Select placeholder="Select category">
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Date</FormLabel>
                            <DatePickerComponent className="transaction-date-picker"/>
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
                                <Input placeholder="Enter amount" />
                            </InputGroup>
                        </FormControl>
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

export default ModalComponent;
