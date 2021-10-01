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
  Button,
} from '@chakra-ui/react';
import axios from 'axios';

function AddPhoneModal(props) {


  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneNumberSubmitted, setIsCodeSubmitted] = useState(false);
  const [isSMSCodeSubmitted, setIsSMSCodeSubmitted] = useState(false);
  const [smsCode, setSmsCode] = useState('')
  const [verifyId, setVerifyId] = useState(null);

  const userId = localStorage.getItem('fuid')

  async function sendCode() {
    const res = await axios.post('https://flint-server.herokuapp.com/users/sendsmscode', {
      phone: `1${phoneNumber}`,
    });
    setVerifyId(res.data.verifyId);
  }

  async function verifyCode(){
    const res = await axios.put(`https://flint-server.herokuapp.com/users/checksmscode/${userId}`, {
        "code": smsCode,
        "verifyId": verifyId,
        "phone": parseInt(phoneNumber)
    })
    if(res.data.status === 200){
        // open alert here
        props.setUserInfo(res.data.user)
        props.onAddPhoneClose()

    } else if(res.data.status === 400){
        setIsCodeSubmitted(false)
        // open fail alert here
    } else if(res.data.status === 404){
        setIsCodeSubmitted(false)
        // open fail alert here
    }
}

  if (!isPhoneNumberSubmitted) {
    return (
      <>
        <Modal
          isOpen={props.isAddPhoneOpen}
          onClose={props.onAddPhoneClose}
          motionPreset="scale"
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Phone Verification</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Phone Number:</FormLabel>
                <Input

                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
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
                Send code
              </Button>
              <Button onClick={props.onAddPhoneClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <Modal
          isOpen={props.isAddPhoneOpen}
          onClose={props.onAddPhoneClose}
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
                  onChange={e => setSmsCode(e.target.value)}
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
                  verifyCode()
                }}
              >
                Submit code
              </Button>
              <Button onClick={props.onAddPhoneClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
}

export default AddPhoneModal;
