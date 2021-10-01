import { Box, Stack, useColorModeValue } from '@chakra-ui/react';
import React, { useState, useEffect, useContext } from 'react'
import { AccountSettings } from './AccountSettings';
import { DangerZone } from './DangerZone';
import { SocialAccountSettings } from './SocialAccountSettings';
import VerificationComponent from '../Verification/VerificationComponent';
import AddPhoneModal from './AddPhoneModal.jsx'
import RemovePhoneModal from './RemovePhoneModal.jsx'
import RemoveAuthModal from './RemoveAuthModal'
import ChangeNameModal from './ChangeNameModal.jsx';
import ChangeEmailModal from './ChangeEmailModal.jsx';
import AuthModal from './AuthModal.jsx'
import { useDisclosure } from "@chakra-ui/react";
import { useHistory } from 'react-router';
import jwt_decode from 'jwt-decode';
import axios from 'axios'
import { DataContext } from '../DataContext';

const AccountPage = () => {

  const history = useHistory()
  const userId = localStorage.getItem('fuid')

  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(DataContext);

  const { isOpen: isNameChangeOpen, onOpen: onNameChangeOpen, onClose: onNameChangeClose } = useDisclosure()
  const { isOpen: isEmailChangeOpen, onOpen: onEmailChangeOpen, onClose: onEmailChangeClose } = useDisclosure()
  const { isOpen: isAuthOpen, onOpen: onAuthOpen, onClose: onAuthClose} = useDisclosure()
  const { isOpen: isRemoveAuthOpen, onOpen: onRemoveAuthOpen, onClose: onRemoveAuthClose} = useDisclosure()
  const { isOpen: isAddPhoneOpen, onOpen: onAddPhoneOpen, onClose: onAddPhoneClose} = useDisclosure()
  const { isOpen: isRemovePhoneOpen, onOpen: onRemovePhoneOpen, onClose: onRemovePhoneClose} = useDisclosure()
  const { isOpen: isDeleteAccountOpen, onOpen: onDeleteAccountOpen, onClose: onDeleteAccountClose} = useDisclosure()

  const [isTokenValid, setIsTokenValid] = useState(false)
  const [accessToken, setAccessToken] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const [userLoaded, setUserLoaded] = useState(false)
  const [tempSecret, setTempSecret] = useState(null)


  const refreshToken = async () => {
    try{
        setIsUserLoggedIn(true)
        const decoded = jwt_decode(localStorage.getItem('refreshToken'))

        const res = await axios.post('https://flint-server.herokuapp.com/users/refreshtoken', {
            email: decoded.email,
            token: localStorage.getItem('refreshToken')
        }).catch((err) => {
            console.log(err)
        })

        localStorage.setItem('refreshToken', res.data.refreshToken)
        setIsTokenValid(true)
        setAccessToken(res.data.accessToken)
    } catch {
      setIsUserLoggedIn(false)
        history.push('/login')
    }
  }

  async function getUserData(){
    try {
      const url =
          process.env.REACT_APP_NODE_ENV === 'production'
              ? `https://flint-server.herokuapp.com/users/${userId}`
              : `https://flint-server.herokuapp.com/users/${userId}`

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
    // console.log(userInfo)
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
              mt='2'
            />

            <VerificationComponent
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              onAuthOpen={onAuthOpen}
              onRemoveAuthOpen={onRemoveAuthOpen}
              isAuthOpen={isAuthOpen}
              onAddPhoneOpen={onAddPhoneOpen}
              onAddPhoneClose={onAddPhoneClose}
              isAddPhoneOpen={isAddPhoneOpen}
              onRemovePhoneOpen={onRemovePhoneOpen}
              onRemovePhoneClose={onRemovePhoneClose}
              isRemovePhoneOpen={isRemovePhoneOpen}
              setTempSecret={setTempSecret}
              accessToken={accessToken}
            />
            {/* <SocialAccountSettings /> */}
            <DangerZone
              accessToken={accessToken}
              onDeleteAccountOpen={onDeleteAccountOpen}
              isDeleteAccountOpen={isDeleteAccountOpen}
              onDeleteAccountClose={onDeleteAccountClose}
            />

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

            <AuthModal
              tempSecret={tempSecret}
              isAuthOpen={isAuthOpen}
              onAuthOpen={onAuthOpen}
              onAuthClose={onAuthClose}
              accessToken={accessToken}
              setUserInfo={setUserInfo}
            />

            <RemoveAuthModal
              tempSecret={tempSecret}
              isRemoveAuthOpen={isRemoveAuthOpen}
              onRemoveAuthOpen={onRemoveAuthOpen}
              onRemoveAuthClose={onRemoveAuthClose}
              accessToken={accessToken}
              setUserInfo={setUserInfo}
            />

            <AddPhoneModal
              isAddPhoneOpen={isAddPhoneOpen}
              onAddPhoneOpen={onAddPhoneOpen}
              onAddPhoneClose={onAddPhoneClose}
              accessToken={accessToken}
              setUserInfo={setUserInfo}
            />

            <RemovePhoneModal
              isRemovePhoneOpen={isRemovePhoneOpen}
              onRemovePhoneOpen={onRemovePhoneOpen}
              onRemovePhoneClose={onRemovePhoneClose}
              accessToken={accessToken}
              setUserInfo={setUserInfo}
              userInfo={userInfo}
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
