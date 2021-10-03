import React, { useContext } from 'react';
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

    const { budgetId, setUserAction, accessToken, setBudgetsList, editModalCategory, editModalSubcategory, editModalAmount, setEditModalSubcategory, setEditModalAmount, setEditModalCategory, category, subcategory, amount, setCategory, setSubcategory, setAmount } = useContext(DataContext);

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

    const editBudget = async () => {
        console.log(`Attempting to edit a transaction with id of ${budgetId}...`)

        const url =
            process.env.REACT_APP_NODE_ENV === 'production'
                ? `https://flint-server.herokuapp.com/users/${userId}/editbudget/${budgetId}`
                : `https://flint-server.herokuapp.com/users/${userId}/editbudget/${budgetId}`


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
            <Modal isCentered isOpen={props.isEditOpen} onClose={props.onEditClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader mb={6}>Edit Budget</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                        <FormControl mb={6}>
                            <FormLabel>Category</FormLabel>
                            <Select value={editModalCategory} name="input-category" onChange={storeCategory} placeholder="Select category">
                                {categoryOptions}
                            </Select>
                        </FormControl>

                        <FormControl mb={6}>
                            <FormLabel>Subcategory</FormLabel>
                            <Select value={editModalSubcategory} name="input-subcategory" onChange={storeSubcategory} placeholder="Select subcategory">
                                {subcategoryOptions}
                            </Select>
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
