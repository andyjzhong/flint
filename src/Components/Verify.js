import React, { useState, useContext, useEffect } from 'react';
import { IoMdCheckmarkCircle } from "react-icons/io";
import { BsLightningFill } from "react-icons/bs";
import { DataContext } from './DataContext';
import { useHistory } from 'react-router';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

import { useDisclosure } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Text,
    Box,
    Icon,
    Progress,
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

    const { isOpen: isSuccessOpen, onOpen: onSuccessOpen, onClose: onSuccessClose } = useDisclosure()
    const { isOpen: isFailedOpen, onOpen: onFailedOpen, onClose: onFailedClose } = useDisclosure()

    const { accessToken, setAccessToken } = useContext(DataContext);
    const [isNumSubmitted, setIsNumSubmitted] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [textCode, setTextCode] = useState("");

    const [isPhoneNumLoading, setIsPhoneNumLoading] = useState(false) // Disables Phone number button
    const [isCodeSubmitted, setIsCodeSubmitted] = useState(false) // Disables text code button

    const [verifyId, setVerifyId] = useState(null)

    // bg colors
    const gray50gray800 = useColorModeValue('gray.50', 'gray.800')
    const whitegray700 = useColorModeValue('white', 'gray.700')
    const whitegray800 = useColorModeValue('white', 'gray.800')
    const green500green400 = useColorModeValue("green.500", "green.400")
    const gray600gray200 = useColorModeValue("gray.600", "gray.200")
    const red500red400 = useColorModeValue("red.500", "red.400")

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

    async function sendCode(){
        const res = await axios.post('http://localhost:8000/users/sendsmscode', {
            "phone": `1${phoneNumber}`
        })
        setVerifyId(res.data.verifyId)
    }

    async function verifyCode(){
        const res = await axios.put('http://localhost:8000/users/checksmscode', {
            "code": textCode,
            "verifyId": verifyId
        })
        if(res.data.status === 200){
            onSuccessOpen()

            // add phone number to database
            setTimeout(() => {
                history.push('/account')
            }, 3000)
        } else if(res.data.status === 400){
            setIsCodeSubmitted(false)
            onFailedOpen()
        } else if(res.data.status === 404){
            setIsCodeSubmitted(false)
            onFailedOpen()
        }
    }

    useEffect(() => {
        if(!accessToken){
            refreshToken()
        }

    },[accessToken])


    if(!isNumSubmitted){
        return (
            <div className="verify" h={'93vh'}>
                <Flex
                    minH={'93vh'}
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
                                id="phoneInput"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </FormControl>


                        <Stack spacing={6}>

                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    isLoading={isPhoneNumLoading}
                                    onClick={() => {
                                        sendCode()
                                        setIsPhoneNumLoading(true)
                                        setIsNumSubmitted(true)
                                    }}
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
            <div className="verify" h={'93vh'}>

                <Modal motionPreset="scale" onClose={onSuccessClose} isOpen={isSuccessOpen}>
                    <ModalContent shadow={false} bg={gray50gray800}>
                        <ModalBody>
                            <Flex
                                maxW="sm"
                                w="full"
                                mx="auto"
                                my='10'
                                bg={whitegray800}
                                shadow="md"
                                rounded="lg"
                                overflow="hidden"
                            >
                                <Flex justifyContent="center" alignItems="center" w={12} bg="green.500">
                                    <Icon as={IoMdCheckmarkCircle} color="white" boxSize={6} />
                                </Flex>

                                <Box mx={-3} py={2} px={4}>
                                    <Box mx={3}>
                                        <Text
                                            color={green500green400}
                                            fontWeight="bold"
                                        >
                                            Success
                                        </Text>
                                        <Text
                                            color={gray600gray200}
                                            fontSize="sm"
                                        >
                                            Verification Successful!
                                        </Text>
                                    </Box>
                                </Box>
                            </Flex>
                        </ModalBody>
                    </ModalContent>
                </Modal>

                <Modal motionPreset="slideInBottom" onClose={onFailedClose} isOpen={isFailedOpen}>
                    <ModalContent shadow={false} bg={gray50gray800}>
                        <ModalBody>
                            <Flex
                                maxW="sm"
                                w="full"
                                mx="auto"
                                bg={whitegray800}
                                shadow="md"
                                rounded="lg"
                                overflow="hidden"
                            >
                                <Flex justifyContent="center" alignItems="center" w={12} bg="red.500">
                                <Icon as={BsLightningFill} color="white" boxSize={6} />
                                </Flex>

                                <Box mx={-3} py={2} px={4}>
                                    <Box mx={3}>
                                    <Text
                                    color={red500red400}
                                    fontWeight="bold"
                                    >
                                    Error
                                    </Text>
                                    <Text
                                    color={gray600gray200}
                                    fontSize="sm"
                                    >
                                    Your code is not valid!
                                    </Text>
                                    </Box>
                                </Box>
                            </Flex>
                        </ModalBody>
                    </ModalContent>
                </Modal>

                <Flex
                    minH={'93vh'}
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
                            <Input
                                id="textCode"
                                value={textCode}
                                onChange={(e) => setTextCode(e.target.value)}
                                />
                        </FormControl>

                        <Stack spacing={6}>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                isLoading={isCodeSubmitted}
                                loadingText="Verifying..."
                                onClick={() => {
                                    verifyCode()
                                    setTextCode('')
                                    setIsCodeSubmitted(true) // changes button to loading text
                                }}
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
