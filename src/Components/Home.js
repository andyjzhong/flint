import React, { useEffect, useContext} from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Link as RouterLink } from 'react-router-dom';
import { DataContext } from './DataContext';
import {
    Stack,
    Flex,
    Button,
    Text,
    VStack,
    Heading,
    useBreakpointValue,
} from '@chakra-ui/react';
import './Home.css'

const Home = () => {

    const {
        setIsUserLoggedIn,
        setAccessToken,
    } = useContext(DataContext);

      const refreshToken = async () => {
        try{
            setIsUserLoggedIn(true)
            const decoded = jwt_decode(localStorage.getItem('refreshToken'))

            const res = await axios.post('https://flint-server.herokuapp.com/users/refreshtoken', {
                email: decoded.email,
                token: localStorage.getItem('refreshToken')
            }).catch((err) => {
                console.log(err)
            })

            localStorage.setItem('refreshToken', res.data.refreshToken)
            setAccessToken(res.data.accessToken)
        } catch {
            setIsUserLoggedIn(false)
        }
      }

      useEffect(()=>{
        refreshToken()
      },[])
    return (
        <Flex
            w={'full'}
            h={'100vh'}
            backgroundImage={
            'url(https://image.cnbcfm.com/api/v1/image/106435772-1583893683724gettyimages-1162855475.jpeg?v=1604611798&w=1600&h=900)'
            }
            backgroundSize={'cover'}
            backgroundPosition={'center center'}
        >
            <VStack
                w={'full'}
                justify={'center'}
                px={useBreakpointValue({ base: 4, md: 8 })}
                bgGradient={'linear(to-r, blackAlpha.600, transparent)'}
            >
                <Stack spacing={{ base: 10, md: 20 }}>
                    <Heading lineHeight={2.1} color={'white'} fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '7xl' }}>
                        <Text as={'span'} className="text-focus-in" bgGradient="linear(to-r, green.100,green.400)" bgClip="text">Flint Personal Finance</Text>{' '}
                    </Heading>
                </Stack>
                <Stack mt={8} maxW={'2xl'} align={'flex-start'} spacing={6}>
                    <Text
                        color={'white'}
                        fontWeight={700}
                        lineHeight={1.2}
                        fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}
                    >   A personal finance application to help track income and expense transactions
                    </Text>
                    <Stack direction={'row'}>
                        <RouterLink to="/signup">
                            <Button
                                fontFamily={'heading'}
                                w={'full'}
                                bgGradient="linear(to-r, purple.400,red.400)"
                                color={'white'}
                                _hover={{
                                    bgGradient: 'linear(to-r, purple.400,red.400)',
                                    boxShadow: 'xl',
                                }}
                            >Sign Up
                            </Button>
                        </RouterLink>
                        <RouterLink to="/about">
                            <Button
                                fontFamily={'heading'}
                                w={'full'}
                                bg={'whiteAlpha.300'}
                                color={'white'}
                                _hover={{ bg: 'whiteAlpha.500' }}
                            >Learn more
                            </Button>
                        </RouterLink>
                    </Stack>
                </Stack>
            </VStack>
        </Flex>
  );
}

export default Home;
