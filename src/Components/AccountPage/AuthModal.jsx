import React, { useState } from 'react';
import {
    Badge,
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


function AuthModal(props) {
  const userId = localStorage.getItem('fuid')
  const [code, setCode] = useState("")
  const [isCodeSubmitted, setIsCodeSubmitted] = useState(null)

  async function verifyTempSecret(){
    const res = await axios.put(`https://flint-server.herokuapp.com/users/verifytempsecret/${userId}`, {
      token: `${code}`
    },{
      headers: {'authorization': `Bearer ${props.accessToken}`}
    })
    console.log(res)
    if(res.data.message == 'Token is valid'){
      props.onAuthClose()
      props.setUserInfo(res.data.user)
      setCode('')
      setIsCodeSubmitted(false)
    } else {
      setIsCodeSubmitted(false)
    }
  }


  return (
    <>
      <Modal
        isOpen={props.isAuthOpen}
        onClose={props.onAuthClose}
        motionPreset='scale'
        isCentered
      >
        <ModalOverlay />
        <ModalContent maxW='35rem'>
          <ModalHeader>Enable Authenticator</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

            <FormControl pb={6}>
              <FormLabel>Your secret key:</FormLabel>
              <Badge>{props.tempSecret}</Badge>
            </FormControl>

            <FormControl>
              <FormLabel>Authenticator code</FormLabel>
              <Input
                placeholder="6-digit code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              isLoading={isCodeSubmitted}
              loadingText="Verifying..."
              onClick={() => {
                setIsCodeSubmitted(true)
                verifyTempSecret()
              }}
            >
              Submit
            </Button>
            <Button onClick={props.onAuthClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AuthModal;
