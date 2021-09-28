import { Box, Stack, useColorModeValue } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react'
import { AccountSettings } from './AccountSettings';
import { DangerZone } from './DangerZone';
import { SocialAccountSettings } from './SocialAccountSettings';
import VerificationComponent from '../Verification/VerificationComponent';
import ChangeNameModal from './ChangeNameModal.jsx';
import ChangeEmailModal from './ChangeEmailModal.jsx';
import { useDisclosure } from "@chakra-ui/react";
import { useHistory } from 'react-router';
import jwt_decode from 'jwt-decode';
import axios from 'axios'

const AccountPage = () => {

  const history = useHistory()
  const userId = localStorage.getItem('fuid')

  const { isOpen: isNameChangeOpen, onOpen: onNameChangeOpen, onClose: onNameChangeClose } = useDisclosure()
  const { isOpen: isEmailChangeOpen, onOpen: onEmailChangeOpen, onClose: onEmailChangeClose } = useDisclosure()

  const [isTokenValid, setIsTokenValid] = useState(false)
  const [accessToken, setAccessToken] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const [userLoaded, setUserLoaded] = useState(false)


  const refreshToken = async () => {
    try{
        const decoded = jwt_decode(localStorage.getItem('refreshToken'))

        const res = await axios.post('http://localhost:8000/users/refreshtoken', {
            email: decoded.email,
            token: localStorage.getItem('refreshToken')
        }).catch((err) => {
            console.log(err)
        })

        localStorage.setItem('refreshToken', res.data.refreshToken)
        setIsTokenValid(true)
        setAccessToken(res.data.accessToken)
    } catch {
        history.push('/login')
    }
  }

  async function getUserData(){
    try {
      const url =
          process.env.NODE_ENV === 'production'
              ? `http://flint-server.herokuapp.com/users/${userId}`
              : `http://localhost:8000/users/${userId}`

      const response = await axios.get(url,{
          headers: {'authorization': `Bearer ${accessToken}`}
      })
      setUserInfo(response.data)
      setUserLoaded(true)
      
    } catch (error) {
      console.warn("Error when retrieving users.")
    }
  }

  useEffect(()=>{
    if(!accessToken){
      refreshToken()
    } else {
      getUserData()
    }
  },[accessToken])

  // remove before deploy
  useEffect(()=>{
    console.log(userInfo)
  },[userInfo])

  if(userLoaded){
    return (
      <Box
        // bg={useColorModeValue('gray.50', 'gray.800')}
        px={{
          base: '4',
          md: '10',
        }}
        py="16"
      >
        <Box maxW="xl" mx="auto">
          <Stack spacing="12">
  
            <AccountSettings 
              setUserInfo={setUserInfo}
              accessToken={accessToken}
              isNameChangeOpen={isNameChangeOpen}
              onNameChangeOpen={onNameChangeOpen}
              isEmailChangeOpen={isEmailChangeOpen}
              onEmailChangeOpen={onEmailChangeOpen}
              userInfo={userInfo}
            />
  
            <VerificationComponent />
            <SocialAccountSettings />
            <DangerZone />
            
            <ChangeNameModal 
              isNameChangeOpen={isNameChangeOpen}
              onNameChangeOpen={onNameChangeOpen}
              onNameChangeClose={onNameChangeClose}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              accessToken={accessToken}
            />

            <ChangeEmailModal 
              isEmailChangeOpen={isEmailChangeOpen}
              onEmailChangeOpen={onEmailChangeOpen}
              onEmailChangeClose={onEmailChangeClose}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              accessToken={accessToken}
            />
  
          </Stack>
        </Box>
      </Box>
    )
  } else {
    return (
      <div>

      </div>
    )
  }
}

export default AccountPage;