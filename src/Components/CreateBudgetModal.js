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
    Button,
} from "@chakra-ui/react"


const CreateBudgetModal = (props) => {

    const userId = localStorage.getItem('fuid');

    const { setUserAction, accessToken, setBudgetsList, category, setCategory, subcategory, setSubcategory, amount, setAmount } = useContext(DataContext);

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

    const createBudget = async () => {
        console.log("Attempting to create a new budget...")

        const url =
            process.env.REACT_APP_NODE_ENV === 'production'
                ? `https://flint-server.herokuapp.com/users/${userId}/addbudget`
                : `https://flint-server.herokuapp.com/users/${userId}/addbudget`

        const res = await axios.put(url, {

                "category": category,
                "subcategory": subcategory,
                "amount": amount
            },
            {headers: {
                authorization: `Bearer ${accessToken}`
            }}
        )
        setBudgetsList(res.data.budgets)
        props.onClose()
        setUserAction("create")
        console.log(res)
    }

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
                    <ModalHeader>Add New Budget</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

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
                        <Button colorScheme="blue" mr={3} onClick={createBudget} type="submit">Save</Button>
                        <Button onClick={props.onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateBudgetModal;
