import React, { useEffect } from 'react';
import { Button } from "@chakra-ui/react"
import TableComponent from './Table.js'
import ModalComponent from './Modal.js'
import { useDisclosure } from "@chakra-ui/react"
import './Transactions.css';

const Transactions = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        getUser()
}, [])

    const getUser = () => {
        console.log("Inside getUser");
    }

    return (
        <div className="transactions">
            <h1>Transactions Page</h1>
            <div className="transactions-table-container">
                <Button className="btn-add-transaction" colorScheme="green" onClick={onOpen}>
                    Add Transaction
                </Button>
                <TableComponent />
                <ModalComponent isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
            </div>
        </div>
    )
}

export default Transactions;
