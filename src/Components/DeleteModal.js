import React, { useContext } from 'react';
import { DataContext } from './DataContext';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { useDisclosure } from "@chakra-ui/react"
import axios from 'axios';

const userId = "614dd60e29fe32ab9541683b";

const DeleteModal = (props) => {
    const { transactionId } = useContext(DataContext);
    // const { onClose } = useDisclosure()

    const handleDelete = async (props) => {
        console.log("Attempting to delete one transaction...")
        console.log("Transaction ID to be deleted: ", transactionId)

        try {
            const url =
                process.env.NODE_ENV === 'production'
                    ? `http://porto-app-server.herokuapp.com/users/${userId}`
                    : `http://localhost:8000/users/${userId}/deletetransaction/${transactionId}`

            axios.put(url);
            console.log("Delete successful!");
        } catch (error) {
            console.warn("Error when deleting one transaction.")
        }
    }

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Delete Transaction</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Are you sure you want to delete?
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" onClick={props.onClose}>Cancel</Button>
                    <Button colorScheme="blue" mr={3} onClick={() => {
                        handleDelete()
                        props.onClose()
                    }}>
                        Confirm
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default DeleteModal;
