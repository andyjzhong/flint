import {
    Box,
    Center,
    Heading,
    Img,
    SimpleGrid,
    Stack,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  import * as React from 'react'
  import { FaLock, FaChartPie } from 'react-icons/fa'
  import { Feature } from './Feature'
  import { BiDollarCircle } from 'react-icons/bi';

  function AboutDetails(){
    return (
      <Box as="section" bg={mode('gray.50', 'gray.800')} pt="32" pb="32" h='100vh'>
        <Box
          maxW={{
            base: 'xl',
            md: '7xl',
          }}
          mx="auto"
          px={{
            base: '6',
            md: '8',
          }}
        >
          <Heading textAlign="center" letterSpacing="tight" fontWeight="bold">
            Flint provides you with more control over your finances.
          </Heading>
          <Box mt="24">
            <SimpleGrid
              columns={{
                base: 1,
                md: 2,
              }}
              spacing={{
                base: '16',
                md: '8',
              }}
            >
              <Stack spacing="12" maxW="lg">
                <Feature icon={<Box as={BiDollarCircle} w="6" h="6" />} title="Add Transactions">
                  Add, Edit, and Sort your transactions easily. Filter your income and expenses by category and make changes to them in real time.
                </Feature>
                <Feature icon={<Box as={FaChartPie} w="6" h="6" />} title="Manage Budgets">
                  Easily manage your finances by creating budgets. Our visual aids, charts and graphs are easy to understand and customizable.
                </Feature>
                <Feature icon={<Box as={FaLock} w="6" h="6" />} title="Security & Privacy">
                  Always know your privacy is protected with multiple ways to enable 2-Factor-Authentication on your account. Choose one that fits you best.
                </Feature>
              </Stack>
              <Center shadow="lg" minH="26rem">
                <Img
                  objectFit="cover"
                  w="full"
                  h="full"
                  src="https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Holding phone with app installed"
                />
              </Center>
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
    )
  }

  export default AboutDetails
