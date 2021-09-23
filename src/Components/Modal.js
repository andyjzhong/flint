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

const ModalComponent = (props) => {

    const { transactionDate } = useContext(DataContext);
    const [description, setDescription] = useState("")
    const [type, setType] = useState("")
    const [category, setCategory] = useState("")
    const [subcategory, setSubcategory] = useState("")
    const [amount, setAmount] = useState("")

    const createTransaction = async () => {
        console.log("Attempting to create a new transaction...")

        const url =
            process.env.NODE_ENV === 'production'
                ? `http://flint-server.herokuapp.com/transactions`
                : `http://localhost:8000/transactions`

        axios.post(url, {
            "description": description,
            "date": transactionDate,
            "type": type,
            "category": category,
            "subcategory": subcategory,
            "amount": amount
        })
        .then((res) => {
            console.log("Success!")
            props.onClose()
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
            <Modal isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New Transaction</ModalHeader>
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
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Subcategory</FormLabel>
                            <Select name="input-subcategory" onChange={storeSubcategory} placeholder="Select category">
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
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
                        <Button colorScheme="blue" mr={3} onClick={createTransaction} type="submit">Save</Button>
                        <Button onClick={props.onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalComponent;
