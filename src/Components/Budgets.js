import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Box, Grid, GridItem, Center, Heading, Text, VStack } from "@chakra-ui/react"
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import BudgetTableComponent from './BudgetTable.js'
import EditBudgetModal from './EditBudgetModal.js'
import { useDisclosure } from "@chakra-ui/react"
import BudgetChart from './BudgetChart.js';
import { DataContext } from './DataContext';
import './Transactions.css';

const Budgets = () => {
    let history = useHistory()
    const { setAccessToken } = useContext(DataContext);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isTokenValid, setIsTokenValid] = useState(false)

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
            setIsTokenValid(true)
            setAccessToken(res.data.accessToken)
        } catch {
            history.push('/login')
        }
    }

    useEffect(() => {
        refreshToken()
    },[])

    if(isTokenValid){
        return (
            <Center w={"100%"} bg={"rgb(247,250,252)"}>
                <Box w={"100vw"} minH={'100vh'} p={4} pt={24}>
                    <Center>
                        <VStack mt={{ base: "6", sm: "6", md: "8", lg: "8"}} mb={{ base: "10", sm: "10", md: "20", lg: "14"}}>
                            <Heading mb={6} size="xl">Budgets</Heading>
                            <Text p={2} fontSize={20}>Track and manage your expenses by category</Text>
                        </VStack>
                    </Center>
                    <Center>
                    <Grid
                        w={"93vw"}
                        gap="6"
                        templateColumns={{
                            base: "repeat(1, 1fr)",
                            sm: "repeat(1, 1fr)",
                            md: "repeat(1, 1fr)",
                            lg: "repeat(2, 1fr)"
                        }}>
                        <GridItem
                            mx={{ base: "0", sm: "auto", md: "auto", lg: "auto"}}
                            w={{ base: "70%", sm: "80%", md: "85%", lg: "85%"}}
                            p="1rem"
                            boxShadow="lg"
                            rounded="md"
                            bg="white">
                            <BudgetChart/>
                        </GridItem>
                        <GridItem
                            mx={{ base: "0", sm: "auto", md: "auto", lg: "auto"}}
                            w={{ base: "70%", sm: "80%", md: "85%", lg: "85%"}}>
                            <BudgetTableComponent/>
                        </GridItem>

                    </Grid>
                    </Center>
                    <EditBudgetModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
                </Box>
            </Center>
        )
    } else {
        return (
            <div className="budgets" pt={24}>
                <h1>Budgets Page</h1>
            </div>
        )
    }
}

export default Budgets;
