import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    FormControl,
    FormLabel,
    Button
  } from "@chakra-ui/react"
  import axios from 'axios';

function ChangeNameModal(props) {

  const userId = localStorage.getItem('fuid')

  const [firstName, setFirstName] = useState(props.userInfo.firstName)
  const [lastName, setLastName] = useState(props.userInfo.lastName)

  async function submitNameChange(){

    const url =
            process.env.REACT_APP_NODE_ENV === 'production'
                ? `https://flint-server.herokuapp.com/users/changename/${userId}`
                : `https://flint-server.herokuapp.com/users/changename/${userId}`
    axios.put(url, {
      firstName: firstName,
      lastName: lastName
    },{
      headers: {'authorization': `Bearer ${props.accessToken}`}
    })
      .then((user) => {
        console.log('updated user:', user)
        props.setUserInfo(user.data)
      })

  }


    return (
        <>
          <Modal
            isOpen={props.isNameChangeOpen}
            onClose={props.onNameChangeClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>First name</FormLabel>
                  <Input
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Last name</FormLabel>
                  <Input
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={() => {
                  submitNameChange()
                  props.onNameChangeClose()
                }}>
                  Save
                </Button>
                <Button onClick={props.onNameChangeClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default ChangeNameModal;
