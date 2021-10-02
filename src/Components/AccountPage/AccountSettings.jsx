import {
  HStack,
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Switch,
  Text,
  Stack,
  StackDivider,
  Center,
  VStack,
  Heading,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { Card } from './Card'
import { FieldGroup } from './FieldGroup'
import { HeadingGroup } from './HeadingGroup'
import axios from 'axios';
import moment from 'moment';

export const AccountSettings = (props) => {

  const userId = localStorage.getItem('fuid')

  const [userLoaded, setUserLoaded] = useState(false)

  function uploadImage(files){
    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('upload_preset', 'ovvjjprn')

    axios.post('https://api.cloudinary.com/v1_1/dah6quajd/image/upload', formData)
      .then((res) => {
        console.log(res.data.secure_url)
        axios.put(`https://flint-server.herokuapp.com/users/uploadimage/${userId}`,{
          image: res.data.secure_url
        },{
          headers: {'authorization': `Bearer ${props.accessToken}`}
        })
          .then((response) => {
            props.setUserInfo(response.data)
            localStorage.setItem('profilePicURL', response.data.profilePicURL)
            window.location.reload(false);
          })
      })
  }


  useEffect(()=>{
    if(props.userInfo){
      setUserLoaded(true)
    }
  },[props.userInfo])

  if(userLoaded){
    return (

    <Stack as="section" spacing="6" {...props}>

          <Stack mt={{ base: "6", sm: "6", md: "8", lg: "8"}} mb={{ base: "2", sm: "2", md: "2", lg: "2"}}>
              <Heading mb={6} size="xl">Account Settings</Heading>
              <Text textAlign="left" fontSize={20}>Update your profile and manage security preferences</Text>
          </Stack>
      <Card>
        <Stack divider={<StackDivider />} spacing="6">
          <FieldGroup title="Name &amp; Avatar" description="Change your name and profile picture">
            <HStack spacing="4">
              <Avatar
                src={props.userInfo.profilePicURL
                      ? props.userInfo.profilePicURL
                      : ""
                }
                name={`${props.userInfo.firstName} ${props.userInfo.lastName}`}
              />
              <Box>
                <Text>{`${props.userInfo.firstName} ${props.userInfo.lastName}`}</Text>
                <Text color="gray.500" fontSize="sm">
                  Joined {moment(props.userInfo.createdAt).format('LL')}
                </Text>
              </Box>
            </HStack>
            <HStack mt="5">
              <Button size="sm" fontWeight="normal" onClick={() => props.onNameChangeOpen()}>
                Change name
              </Button>
              <input
                id="getImage"
                type="file"
                style={{display: 'none'}}
                onChange={(e) => {
                  uploadImage(e.target.files)
                }}/>
              <Button size="sm" fontWeight="normal" onClick={()=> document.getElementById('getImage').click()}>
                Change Avatar
              </Button>
            </HStack>
          </FieldGroup>

          <FieldGroup title="Login details" description="Change your email and password">
            <Text fontSize="sm">{props.userInfo.email}</Text>
            <HStack mt="5">
              <Button size="sm" fontWeight="normal" onClick={() => props.onEmailChangeOpen()}>
                Change email
              </Button>
              <Button size="sm" fontWeight="normal">
                Change password
              </Button>
            </HStack>
          </FieldGroup>

          <FieldGroup title="Language" description="Change your preferred language and currency">
            <Stack
              direction={{
                base: 'column',
                md: 'row',
              }}
              width="full"
              spacing="4"
            >
              <FormControl id="language">
                <FormLabel fontSize="sm">Language</FormLabel>
                <Select size="sm" maxW="2xs">
                  <option>English</option>
                  <option>Hebrew</option>
                  <option>Arabic</option>
                </Select>
              </FormControl>

              <FormControl id="currency">
                <FormLabel fontSize="sm">Currency</FormLabel>
                <Select size="sm" maxW="2xs">
                  <option>USD ($)</option>
                  <option>AED (dh)</option>
                  <option>EUR (€)</option>
                </Select>
              </FormControl>
            </Stack>
            <Button mt="5" size="sm" fontWeight="normal">
              Save Changes
            </Button>
          </FieldGroup>

          <FieldGroup title="Communications" description="Manage your email preference">
            <Stack spacing="3">
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="email-marketing" flex="1" fontSize="sm" mb="0">
                  Product intro, tips, and inspiration
                </FormLabel>
                <Switch id="email-marketing" />
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="email-news" flex="1" fontSize="sm" mb="0">
                  Updates about company news and features
                </FormLabel>
                <Switch id="email-news" />
              </FormControl>
            </Stack>
            <Button mt="5" size="sm" fontWeight="normal">
              Save Changes
            </Button>
          </FieldGroup>
        </Stack>
      </Card>
    </Stack>
    )
  } else {
    return (
      <div>

      </div>
    )
  }

}
