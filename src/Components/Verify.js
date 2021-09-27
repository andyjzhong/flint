import React from 'react';
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
                            }}>
                        Submit
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </div>
    )
}

export default Verify;
