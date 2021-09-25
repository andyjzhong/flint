import React from 'react';
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
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const newAccount = {
        username: "username",
        email: "email",
        firstName: "firstName",
        lastName: "lastName",
        password: "password"
    }

    const updateNewAccount = (e) => {
        if (e.target.name === "input-username") {
            newAccount.username = e.target.value
        }

        if (e.target.name === "input-email") {
            newAccount.email = e.target.value
        }

        if (e.target.name === "input-firstName") {
            newAccount.firstName = e.target.value
        }

        if (e.target.name === "input-lastName") {
            newAccount.lastName = e.target.value
        }

        if (e.target.name === "input-password") {
          newAccount.password = e.target.value
        }

        console.log("newAccount is", newAccount)
    }

    const createAccount = async () => {
        console.log("Attempting to create a new account...")

        const url =
            process.env.NODE_ENV === 'production'
                ? `http://flint-server.herokuapp.com/transactions`
                : `http://localhost:8000/users`

        axios.post(url, {
            "username": newAccount.username,
            "email": newAccount.email,
            "firstName": newAccount.firstName,
            "lastName": newAccount.lastName,
            "password": newAccount.password,
            "isAdmin": false
        })
        .then((res) => {
            console.log("Success!")
        })
        .catch(console.error)
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
                    <Stack spacing={{ base: 10, md: 20 }}>
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

                        <Box as={'form'} mt={10}>
                            <Stack spacing={4}>
                                <Input
                                    name="input-username"
                                    onChange={updateNewAccount}
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
                                    onChange={updateNewAccount}
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
                                    onChange={updateNewAccount}
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
                                    onChange={updateNewAccount}
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
                                        onChange={updateNewAccount}
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
