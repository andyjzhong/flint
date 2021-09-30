import React, { useState, useContext } from 'react';
import { DataContext } from './DataContext';
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
    Button
} from "@chakra-ui/react"

const EditBudgetModal = (props) => {

    const userId = localStorage.getItem('fuid');

    const { budgetId, setUserAction, accessToken, setBudgetsList, editModalCategory, editModalSubcategory, editModalAmount, setEditModalSubcategory, setEditModalAmount, setEditModalCategory } = useContext(DataContext);
    const [category, setCategory] = useState("")
    const [subcategory, setSubcategory] = useState("")
    const [amount, setAmount] = useState("")

    let categoryOptions = categoryOptionsRaw.map((item, index) => {
        return (
            <option key={item.id} value={item.major}>{item.major}</option>
        )
    })

    // TODO: Currently hardcoded.
    let selectedCategory = "Entertainment"

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

    const editBudget = async () => {
        console.log(`Attempting to edit a transaction with id of ${budgetId}...`)

        const url =
            process.env.NODE_ENV === 'production'
                ? `http://flint-server.herokuapp.com/users/${userId}/editbudget/${budgetId}`
                : `http://localhost:8000/users/${userId}/editbudget/${budgetId}`


        axios.put(url, {
            "category": category,
            "subcategory": subcategory,
            "amount": amount
        },{
            headers: {"authorization": `Bearer ${accessToken}`}
        })
        .then((res)=>{
            setBudgetsList(res.data.budgets)
            console.log("Success!")
            setUserAction("edit")
            props.onEditClose()
        })
    }

    const storeCategory = ((e) => {
        setCategory(e.target.value)
        setEditModalCategory(e.target.value)
    })

    const storeSubcategory = ((e) => {
        setSubcategory(e.target.value)
        setEditModalSubcategory(e.target.value)
    })

    const storeAmount = ((e) => {
        setAmount(e.target.value)
        setEditModalAmount(e.target.value)
    })

    return (
        <>
            <Modal isOpen={props.isEditOpen} onClose={props.onEditClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Budget</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                        <FormControl>
                            <FormLabel>Category</FormLabel>
                            <Select value={editModalCategory} name="input-category" onChange={storeCategory} placeholder="Select category">
                                {categoryOptions}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Subcategory</FormLabel>
                            <Select value={editModalSubcategory} name="input-subcategory" onChange={storeSubcategory} placeholder="Select subcategory">
                                {subcategoryOptions}
                            </Select>
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
                                <Input
                                    value={editModalAmount}
                                    name="input-amount"
                                    onChange={storeAmount}
                                    placeholder="Enter amount" />
                            </InputGroup>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={editBudget} type="submit">Save</Button>
                        <Button onClick={props.onEditClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditBudgetModal;
