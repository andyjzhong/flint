import { Badge, Box, Button, Stack, useColorModeValue as mode } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Description = (props) => {
  const { title, children, icon, isRecommended, onAuthOpen, isAuthOpen } = props

  const [authColorScheme, setAuthColorScheme] = useState(props.userInfo.isAuthEnabled ? 'red' : 'blue')
  const [smsColorScheme, setSmsColorScheme] = useState(props.userInfo.isSmsVerified ? 'red' : 'blue')
  const userId = localStorage.getItem('fuid')

  useEffect(()=>{
    setAuthColorScheme(props.userInfo.isAuthEnabled ? 'red' : 'blue')
    setSmsColorScheme(props.userInfo.isSmsVerified ? 'red' : 'blue')
  }, [props.userInfo])

  async function getTempSecret(){
    const res = await axios.put(`https://flint-server.herokuapp.com/users/gettempsecret/${userId}`,{}, {
      headers: { 'authorization': `Bearer ${props.accessToken}`}
    })
    props.setTempSecret(res.data)
  }

  return (
    <Stack
      direction={{
        base: 'column',
        sm: 'row',
      }}
      spacing="5"
      justify="space-between"
      pos="relative"
    >
      <Stack
        direction={{
          base: 'column',
          sm: 'row',
        }}
        spacing="4"
        align="flex-start"
        flex="1"
      >
        <Box aria-hidden fontSize="2xl" pt="1" color="gray.500">
          {icon}
        </Box>
        <Box flex="1">
          <Box as="h4" fontWeight="bold" maxW="xl">
            <span>{title}</span> {isRecommended && <Badge marginStart="1">Recommended</Badge>}
          </Box>
          <Box
            maxW={{
              base: 'xs',
              md: 'unset',
            }}
            color={mode('gray.600', 'gray.400')}
            fontSize="sm"
          >
            {children}
          </Box>
        </Box>
      </Stack>
      <Button colorScheme={title == "Authenticator" ? authColorScheme : smsColorScheme}  onClick={() => {
        if(title == "Authenticator" && props.userInfo.isAuthEnabled == false){
          getTempSecret()
          onAuthOpen()
        } else if(title == "Authenticator" && props.userInfo.isAuthEnabled == true){
          props.onRemoveAuthOpen()
        } else if(title == "Phone verification" && props.userInfo.isSmsVerified == false){
          props.onAddPhoneOpen()
        } else if(title == "Phone verification" && props.userInfo.isSmsVerified == true){
          props.onRemovePhoneOpen()
        }
      }}>
        {title == "Authenticator"
          ? (props.userInfo.isAuthEnabled ? 'Disable' : 'Enable')
          : (props.userInfo.isSmsVerified ? 'Disable' : 'Enable')
        }
      </Button>
    </Stack>
  )
}