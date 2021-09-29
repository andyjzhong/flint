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

  async function removeAuth(){
    const res = await axios.put(`http://localhost:8000/users/removeauth/${userId}`, {
      token: `${code}`
    },{
      headers: {'authorization': `Bearer ${props.accessToken}`}
    })
    console.log(res)
    if(res.data.message == 'Authenticator Removed'){
      props.onRemoveAuthClose()
      props.setUserInfo(res.data.user)
    } else {
      setIsCodeSubmitted(false)
    }
  }


  return (
    <>
      <Modal 
        isOpen={props.isRemoveAuthOpen} 
        onClose={props.onRemoveAuthClose} 
        motionPreset='scale'
        isCentered
      >
        <ModalOverlay />
        <ModalContent maxW='35rem'>
          <ModalHeader>Remove Authenticator</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}> 

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
                removeAuth()
              }}
            >
              Submit
            </Button>
            <Button onClick={props.onRemoveAuthClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AuthModal;