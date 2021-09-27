import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
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

const SendCode = () => {
    return (
        <div className="verify">
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}
            >
                <Stack
                    spacing={4}
                    w={'full'}
                    maxW={'md'}
                    bg={useColorModeValue('white', 'gray.700')}
                    rounded={'xl'}
                    boxShadow={'lg'}
                    p={6}
                    my={12}
                >
                    <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                        Two Factor Authentication
                    </Heading>
                    <FormControl id="email" isRequired>
                        <FormLabel>Phone Number</FormLabel>
                        <Input
                            placeholder="555-555-5555"
                        />
                    </FormControl>
                    <Stack spacing={6}>
                        <RouterLink to="/verify">
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Send Code
                            </Button>
                        </RouterLink>
                    </Stack>
                </Stack>
            </Flex>
        </div>
    )
}

export default SendCode;
