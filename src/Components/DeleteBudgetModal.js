import React, { useContext } from 'react';
import { DataContext } from './DataContext';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import axios from 'axios';

const userId = localStorage.getItem('fuid');

const DeleteModal = (props) => {
    const { budgetId, setUserAction } = useContext(DataContext);

    const handleDelete = async (props) => {
        console.log("Attempting to delete one budget...")

        try {
            const url =
                process.env.NODE_ENV === 'production'
                    ? `http://porto-app-server.herokuapp.com/users/${userId}/deletebudget/${budgetId}`
                    : `http://localhost:8000/users/${userId}/deletebudget/${budgetId}`

            axios.put(url);
            console.log("Delete successful!");
            setUserAction("delete")
        } catch (error) {
            console.warn("Error when deleting one budget.")
        }
    }

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Delete Budget</ModalHeader>
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