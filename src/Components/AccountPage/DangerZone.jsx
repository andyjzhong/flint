import { 
  Input,
  Button,
  Stack, 
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  StackDivider
} from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios';
import { Card } from './Card'
import { HeadingGroup } from './HeadingGroup'
import { useHistory } from 'react-router';

export const DangerZone = (props) => {

  const history = useHistory()
  const userId = localStorage.getItem('fuid')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState('')
  const [errorMessageDisplay, setErrorMessageDisplay] = useState('block')
  const [isButtonLoading, setIsButtonLoading] = useState(false)

  async function deleteAccount(){
    const res = await axios.delete(`https://flint-server.herokuapp.com/users/${userId}`,{
      headers: {
        'authorization': `Bearer ${props.accessToken}`
      },
      data: {
        password: password
      }
    })
    if(res.data.message === 'User Deleted'){
      localStorage.removeItem('fuid')
      localStorage.removeItem('refreshToken')
      history.push('/')
    } else if(res.data.message === 'Incorrect Password'){
      setErrorMessage(res.data.message)
      setErrorMessageDisplay('block')
      setIsButtonLoading(false)
    } else if(res.data.message === 'You are not allowed to delete this user'){
      setErrorMessage(res.data.message)
      setErrorMessageDisplay('block')
      setIsButtonLoading(false)
    }
  }

  return (
    <div>
      <Stack as="section" spacing="6" {...props}>
        <HeadingGroup title="Danger zone" description="Irreversible and destructive actions" />
        <Card>
          <Text fontWeight="bold">Delete account and data</Text>
          <Text fontSize="sm" mt="1" mb="3">
            Once you delete your user, there is no going back. Please be certain.
          </Text>
          <Button size="sm" colorScheme="red" onClick={props.onDeleteAccountOpen}>
            Delete account
          </Button>
        </Card>
      </Stack>

      <Modal isCentered isOpen={props.isDeleteAccountOpen} onClose={props.onDeleteAccountClose}>
      <ModalOverlay />
      <ModalContent>
          <ModalHeader>Delete Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete your account? This action is irreversible and your data will be lost.</Text>
            <StackDivider />
            <Input 
              my='6'
              type='password'
              placeholder='Type your password to confirm'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Text color='red.400' pl='3'>{errorMessage}</Text>
          </ModalBody>
          <ModalFooter>
              <Button variant="ghost" onClick={props.onDeleteAccountClose}>Cancel</Button>
              <Button 
                isLoading={isButtonLoading} 
                loadingText='Verifying...'
                colorScheme="red" 
                mr={3} 
                onClick={() => {
                setIsButtonLoading(true)
                deleteAccount()
              }}>
                  Yes I'm sure
              </Button>
          </ModalFooter>
      </ModalContent>
      </Modal>
    </div>
  )
}