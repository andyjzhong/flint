import React, { useState } from 'react';
import axios from 'axios';
import {
    Box,
    Stack,
    Heading,
    Text,
    Container,
    Input,
    Button,
    SimpleGrid,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';

export default function Signup() {
    const [show, setShow] = useState(false)
    const handleClick = (e) => {
        e.preventDefault();
        setShow(!show)
    }

    const [newUsername, setNewUsername] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [newFirstName, setFirstName] = useState("")
    const [newLastName, setNewLastName] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const handleNewUsername = (e) => {
        setNewUsername(e.target.value)
    }

    const handleNewEmail = (e) => {
        setNewEmail(e.target.value)
    }

    const handleNewFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const handleNewLastName = (e) => {
        setNewLastName(e.target.value)
    }

    const handleNewPassword = (e) => {
        setNewPassword(e.target.value)
    }

    const createAccount = async () => {
        console.log("Attempting to create a new account...")

        const url =
            process.env.REACT_APP_NODE_ENV === 'production'
                ? `https://flint-server.herokuapp.com/users`
                : `https://flint-server.herokuapp.com/users`

        axios.put(url, {
            "username": newUsername,
            "email": newEmail,
            "firstName": newFirstName,
            "lastName": newLastName,
            "password": newPassword,
            "isAdmin": false
        })
        .then((res) => {
            console.log("Success!")
        })
        .catch(
            console.log("Email already exists.")
        )
    }

    return (
        <div className="signup">
            <Box position={'relative'}>
                <Container
                    as={SimpleGrid}
                    maxW={'7xl'}
                    columns={{ base: 1, md: 2 }}
                    spacing={{ base: 10, lg: 32 }}
                    py={{ base: 10, sm: 20, lg: 32 }}
                >
                    <Stack pt={{base: 20, lg: 40}} spacing={{ base: 10, md: 20 }}>
                        <Heading lineHeight={1.1} fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
                            Organize your finances with{' '}
                            <Text as={'span'} bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">Flint</Text>{' '}
                        </Heading>
                    </Stack>

                    <Stack
                        bg={'gray.50'}
                        rounded={'xl'}
                        p={{ base: 4, sm: 6, md: 8 }}
                        spacing={{ base: 8 }}
                        maxW={{ lg: 'lg' }}
                    >

                        <Stack spacing={4}>
                            <Heading
                                color={'gray.800'}
                                lineHeight={1.1}
                                fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
                            >
                                Sign up today
                                <Text
                                    as={'span'}
                                    bgGradient="linear(to-r, red.400,pink.400)"
                                    bgClip="text"
                                >
                                !
                                </Text>
                            </Heading>
                            <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                            Some block of text that really makes you want to sign up for an account today.
                            Do it now while you can.
                            </Text>
                        </Stack>

                        <Box mt={10}>
                            <Stack spacing={4}>
                                <Input
                                    name="input-username"
                                    onChange={handleNewUsername}
                                    placeholder="Username"
                                    bg={'gray.100'}
                                    border={0}
                                    color={'gray.500'}
                                    _placeholder={{
                                        color: 'gray.500',
                                    }}
                                />
                                <Input
                                    name="input-email"
                                    onChange={handleNewEmail}
                                    placeholder="Email"
                                    bg={'gray.100'}
                                    border={0}
                                    color={'gray.500'}
                                    _placeholder={{
                                        color: 'gray.500',
                                    }}
                                />
                                <Input
                                    name="input-firstName"
                                    onChange={handleNewFirstName}
                                    placeholder="First Name"
                                    bg={'gray.100'}
                                    border={0}
                                    color={'gray.500'}
                                    _placeholder={{
                                        color: 'gray.500',
                                    }}
                                />
                                <Input
                                    name="input-lastName"
                                    onChange={handleNewLastName}
                                    placeholder="Last Name"
                                    bg={'gray.100'}
                                    border={0}
                                    color={'gray.500'}
                                    _placeholder={{
                                        color: 'gray.500',
                                    }}
                                />
                                <InputGroup size="md">
                                    <Input
                                        pr="4.5rem"
                                        type={show ? "text" : "password"}
                                        name="input-password"
                                        onChange={handleNewPassword}
                                        placeholder="Enter password"
                                        bg={'gray.100'}
                                        border={0}
                                        color={'gray.500'}
                                        _placeholder={{
                                            color: 'gray.500',
                                        }}
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                                        {show ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </Stack>

                            <Button
                                onClick={createAccount}
                                fontFamily={'heading'}
                                mt={8}
                                w={'full'}
                                bgGradient="linear(to-r, red.400,pink.400)"
                                color={'white'}
                                _hover={{
                                    bgGradient: 'linear(to-r, red.400,pink.400)',
                                    boxShadow: 'xl',
                                }}>
                                Create Account
                            </Button>
                        </Box>
                    </Stack>
                </Container>
            </Box>
        </div>
    );
}
