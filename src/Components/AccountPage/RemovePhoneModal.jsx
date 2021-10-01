import React, { useState } from 'react';
import {
  Text,
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
  Button,
} from '@chakra-ui/react';
import axios from 'axios';

function RemovePhoneModal(props) {


  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneNumberSubmitted, setIsCodeSubmitted] = useState(false);
  const [isSMSCodeSubmitted, setIsSMSCodeSubmitted] = useState(false);
  const [smsCode, setSmsCode] = useState('')
  const [verifyId, setVerifyId] = useState(null);

  const userId = localStorage.getItem('fuid')

  async function sendCode() {
    const res = await axios.post('https://flint-server.herokuapp.com/users/sendsmscode', {
      phone: `1${props.userInfo.phone}`,
    });
    setVerifyId(res.data.verifyId);
    console.log(verifyId)
  }

  async function verifyRemoveCode(){
    const res = await axios.put(`https://flint-server.herokuapp.com/users/removephone/${userId}`, {
        "code": smsCode,
        "verifyId": verifyId,
    })
    if(res.data.status === 200){
        // open alert here
        props.setUserInfo(res.data.user)
        props.onRemovePhoneClose()

    } else if(res.data.status === 400){
        setIsCodeSubmitted(false)
        // open fail alert here
    } else if(res.data.status === 404){
        setIsCodeSubmitted(false)
        // open fail alert here
    } else {
        console.log(res)
    }
}

  if (!isPhoneNumberSubmitted) {
    return (
      <>
        <Modal
          isOpen={props.isRemovePhoneOpen}
          onClose={props.onRemovePhoneClose}
          motionPreset="scale"
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Phone Verification</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>

                <Text>Are you sure you want to remove SMS authentication?</Text>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                isLoading={isPhoneNumberSubmitted}
                loadingText="Sending code..."
                onClick={() => {
                  setIsCodeSubmitted(true);
                  sendCode()
                }}
              >
                Yes, I'm sure
              </Button>
              <Button onClick={props.onRemovePhoneClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <Modal
          isOpen={props.isRemovePhoneOpen}
          onClose={props.onRemovePhoneClose}
          motionPreset="scale"
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Phone Verification</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Enter code:</FormLabel>
                <Input
                  placeholder="6-digit code"
                  value={smsCode}
                  onChange={(e) => setSmsCode(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                isLoading={isSMSCodeSubmitted}
                loadingText="Verifying..."
                onClick={() => {
                    setIsSMSCodeSubmitted(true);
                    verifyRemoveCode()
                }}
              >
                Submit code
              </Button>
              <Button onClick={props.onRemovePhoneClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
}

export default RemovePhoneModal;
