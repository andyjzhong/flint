import React, { useContext } from 'react';
import { DataContext } from './DataContext';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import axios from 'axios';

const userId = localStorage.getItem('fuid');

const DeleteModal = (props) => {
    const { transactionId, setUserAction, accessToken } = useContext(DataContext);

    const handleDelete = async (props) => {
        console.log("Attempting to delete one transaction...")

        try {
            const url =
                process.env.REACT_APP_NODE_ENV === 'production'
                    ? `http://porto-app-server.herokuapp.com/users/${userId}`
                    : `https://flint-server.herokuapp.com/users/${userId}/deletetransaction/${transactionId}`

            axios.put(url,{},{
                headers: {"authorization": `Bearer ${accessToken}`}
            });
            console.log("Delete successful!");
            setUserAction("delete")
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
