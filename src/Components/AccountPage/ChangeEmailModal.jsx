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

function ChangeEmailModal(props) {
    const userId = localStorage.getItem('fuid')

    const [email, setEmail] = useState(props.userInfo.email)

    async function submitEmailChange(){

      const url =
              process.env.REACT_APP_NODE_ENV === 'production'
                  ? `https://flint-server.herokuapp.com/users/changeemail/${userId}`
                  : `https://flint-server.herokuapp.com/users/changeemail/${userId}`
      const res = axios.put(url, {
        email: email,
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
              isOpen={props.isEmailChangeOpen}
              onClose={props.onEmailClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      placeholder="First name"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={() => {
                    submitEmailChange()
                    props.onEmailChangeClose()
                  }}>
                    Save
                  </Button>
                  <Button onClick={props.onEmailChangeClose}>
                    Cancel
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )
}

export default ChangeEmailModal;
