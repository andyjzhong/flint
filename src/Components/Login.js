import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from './DataContext';
import { useHistory } from 'react-router';
import axios from 'axios';
import { useDisclosure } from "@chakra-ui/react";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Badge,
    ModalFooter,
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
    InputRightElement,
    InputGroup,
    useColorModeValue,
} from '@chakra-ui/react';

export default function Login() {

    const { isLoggedIn, setIsLoggedIn } = useContext(DataContext);
    const { currentUserId, setCurrentUserId } = useContext(DataContext);
    const { isOpen: isAuthOpen, onOpen: onAuthOpen, onClose: onAuthClose} = useDisclosure()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)
    const [loginMethod, setLoginMethod] = useState('default')
    const [signInButtonText, setSignInButtonText] = useState('Sign in')
    const [isButtonLocked, setIsButtonLocked] = useState(false)
    const [loginErrorText, setLoginErrorText] = useState('')
    const [loginErrorDisplay, setLoginErrorDisplay] = useState('none')
    const [authToken, setAuthToken] = useState('')
    const [authInputDisplay, setAuthInputDisplay] = useState('none')
    const [smsCode, setSmsCode] = useState('')
    const [smsInputDisplay, setSmsInputDisplay] = useState('none')
    const [phoneLast4, setPhoneLast4] = useState('')
    const [verifyId, setVerifyId] = useState(null)
    const handleClick = () => setShow(!show)
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
            // do conditionals here for response
            if(response.data.message === 'Authenticator required'){
                setLoginMethod('auth')
                setAuthInputDisplay('block')
                setSignInButtonText('Submit code')
                setIsButtonLocked(false)
            } else if(response.data.message === 'SMS required'){
                setVerifyId(response.data.smsData.verifyId)
                setLoginMethod('sms')
                setSignInButtonText('Submit code')
                setSmsInputDisplay('block')
                setPhoneLast4(response.data.endingIn)
                setIsButtonLocked(false)
            } else if(response.data.message === 'OK'){
                localStorage.setItem('refreshToken', response.data.refreshToken)
                localStorage.setItem('fuid', response.data.userobj._id)
                setCurrentUserId(response.data)
            } else {
                setLoginErrorDisplay('block')
                setLoginErrorText('Invalid credentials')
                setIsButtonLocked(false)
            }
        } catch (error) {
            setLoginErrorDisplay('block')
            setLoginErrorText('Invalid credentials')
            setIsButtonLocked(false)
        }
    }

    async function authenticatorLogin(){
        const url =
        process.env.NODE_ENV === 'production'
            ? `http://flint-server.herokuapp.com/users/login`
            : `http://localhost:8000/users/verifyauthlogin`

        const response = await axios.post(url, {
            email: email,
            password: password,
            token: authToken
        })
        if(response.data.message === 'Token is valid'){
            localStorage.setItem('refreshToken', response.data.refreshToken)
            localStorage.setItem('fuid', response.data.userobj._id)
            setCurrentUserId(response.data)
        } else if(response.data.message === 'Passwords do not match'){
            setLoginErrorDisplay('block')
            setLoginErrorText(response.data.message)
            setIsButtonLocked(false)
        } else if(response.data.message === 'Token not valid'){
            setLoginErrorDisplay('block')
            setLoginErrorText(response.data.message)
            setIsButtonLocked(false)
        }
    }

    async function smsLogin(){
        const url =
        process.env.NODE_ENV === 'production'
            ? `http://flint-server.herokuapp.com/users/verifysmslogin`
            : `http://localhost:8000/users/verifysmslogin`

        const response = await axios.post(url, {
            email: email,
            password: password,
            code: smsCode,
            verifyId: verifyId
        })
        if(response.data.message === 'Code is valid'){
            localStorage.setItem('refreshToken', response.data.refreshToken)
            localStorage.setItem('fuid', response.data.userobj._id)
            setCurrentUserId(response.data)
        } else if(response.data.message === 'Passwords do not match'){
            setLoginErrorDisplay('block')
            setLoginErrorText(response.data.message)
            setIsButtonLocked(false)
        } else if(response.data.message === 'Code is not valid'){
            setLoginErrorDisplay('block')
            setLoginErrorText(response.data.message)
            setIsButtonLocked(false)
        }
    }

    function loginButton(){
        if(loginMethod === 'default'){
            setLoginErrorDisplay('none')
            setIsButtonLocked(true)
            getAccountDetail()
        } else if (loginMethod === 'auth'){
            setLoginErrorDisplay('none')
            setIsButtonLocked(true)
            authenticatorLogin()
        } else if(loginMethod === 'sms'){
            setLoginErrorDisplay('none')
            setIsButtonLocked(true)
            smsLogin()
        }
    }

    // Effective usage of useEffect
    useEffect(() => {
        if(currentUserId === null){
            return
        } else {
            if(currentUserId == 'Not Allowed'){
                return
            } else {
                history.push('/dashboard')
            }
        }
    }, [currentUserId])


    return (
        <div>
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
                                <InputGroup>
                                    <Input
                                    type={show ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                                            {show ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <FormControl id="authenticator" display={authInputDisplay}>
                                <FormLabel>Authenticator code</FormLabel>
                                <Input
                                    type="text"
                                    value={authToken}
                                    onChange={(e) => setAuthToken(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id="sms" display={smsInputDisplay}>
                                <FormLabel>Texted code number ending in {phoneLast4}</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="6-digit code"
                                    value={smsCode}
                                    onChange={(e) => setSmsCode(e.target.value)}
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
                                <Text color='red.400' display={loginErrorDisplay}>{loginErrorText}</Text>
                                <Button
                                    onClick={() => loginButton()}
                                    isLoading={isButtonLocked}
                                    loadingText='Verifying...'
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    {signInButtonText}
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </div>
    );
}
