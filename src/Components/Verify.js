import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from './DataContext';
import { useHistory } from 'react-router';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react';

const Verify = () => {

    const history = useHistory()
    const [isNumSubmitted, setIsNumSubmitted] = useState(false)
    const { accessToken, setAccessToken } = useContext(DataContext);

    // bg colors
    const gray50gray800 = useColorModeValue('gray.50', 'gray.800')
    const whitegray700 = useColorModeValue('white', 'gray.700')

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
            setAccessToken(res.data.accessToken)
        } catch {
            history.push('/login')
        }
    }

    useEffect(() => {
        if(!accessToken){
            refreshToken()
        } else {
            return
        }
    },[accessToken])

    if(!isNumSubmitted){
        return (
            <div className="verify">
                <Flex
                    minH={'100vh'}
                    align={'center'}
                    justify={'center'}
                    bg={gray50gray800}
                >
                    <Stack
                        spacing={4}
                        w={'full'}
                        maxW={'md'}
                        bg={whitegray700}
                        rounded={'xl'}
                        boxShadow={'lg'}
                        p={6}
                        my={12}
                    >
                        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                            Two Factor Authentication
                        </Heading>
                        <FormControl id="phone-number" isRequired>
                            <FormLabel>Phone Number</FormLabel>
                            <Input
                                placeholder="555-555-5555"
                            />
                        </FormControl>
                        <Stack spacing={6}>
                            
                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    onClick={() => setIsNumSubmitted(true)}
                                    // still needs to submit the number to TextMagic
                                    >
                                    Send Code
                                </Button>
                            
                        </Stack>
                    </Stack>
                </Flex>
            </div>
        )
    } else{

        return (
            <div className="verify">
                <Flex
                    minH={'100vh'}
                    align={'center'}
                    justify={'center'}
                    bg={gray50gray800}
                >
                    <Stack
                        spacing={4}
                        w={'full'}
                        maxW={'md'}
                        bg={whitegray700}
                        rounded={'xl'}
                        boxShadow={'lg'}
                        p={6}
                        my={12}
                    >
                        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                            Two Factor Authentication
                        </Heading>
                        <FormControl id="password" isRequired>
                            <FormLabel>Confirmation Code</FormLabel>
                            <Input type="password" />
                        </FormControl>
    
                        <Stack spacing={6}>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                // on click to submit code
                                >
                            Submit Code
                            </Button>
                        </Stack>
                    </Stack>
                </Flex>
            </div>
        )
    }
}

export default Verify;
