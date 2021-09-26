import React, { useContext, useEffect } from 'react';
import { DataContext } from './DataContext';
import { useHistory } from 'react-router';
import axios from 'axios';

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

export default function Login() {

    const { isLoggedIn, setIsLoggedIn } = useContext(DataContext);
    const { currentUserId, setCurrentUserId } = useContext(DataContext);
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    let history = useHistory()

    const login = () => {
        console.log("Just tried to log in.");
        getAccountDetail()
    }


    const getAccountDetail = async () => {
        console.log("Attempting to retrieve one user...")
        try {
            const url =
                process.env.NODE_ENV === 'production'
                    ? `http://flint-server.herokuapp.com/users/login`
                    : `http://localhost:8000/users/login`
            
            const response = await axios.post(url, {
                "email": `${email.toLowerCase()}`,
                "password": `${password}`
            })
            localStorage.setItem('refreshToken', response.data.refreshToken)
            localStorage.setItem('fuid', response.data.userobj._id)
            setCurrentUserId(response.data)
            console.log("Response data: ", response);
            console.log("Current User is:", currentUserId);
        } catch (error) {
            console.warn("Error when retrieving one user.")
        }
    }

    // Effective usage of useEffect
    useEffect(() => {
        if(currentUserId === null){
            return
        } else {
            if(currentUserId == 'Not Allowed'){
                console.log(currentUserId)
            } else {
                history.push('/dashboard')
            }
        }
    }, [currentUserId])


    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>

                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}
                            >
                                <Checkbox>Remember me</Checkbox>
                                <Link color={'blue.400'}>Forgot password?</Link>
                            </Stack>
                            <Button
                                onClick={login}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
