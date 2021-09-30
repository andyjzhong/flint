import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Box, Grid, GridItem, Center, Heading, Text, VStack } from "@chakra-ui/react"
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import BudgetTableComponent from './BudgetTable.js'
import CreateBudgetModal from './CreateBudgetModal.js'
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
            <Center bg={"rgb(247,250,252)"}>
                <Box w={"80vw"} minH={'100vh'} p={4} pt={24}>
                    <Center>
                        <VStack mt={10} mb={20}>
                        <Heading mb={10} size="xl">Budgets</Heading>
                        <Text fontSize={20}>Add and manage your budgets</Text>
                        </VStack>
                    </Center>
                    <Grid
                        gap="6"
                        templateColumns={{
                            base: "repeat(1, 1fr)",
                            sm: "repeat(1, 1fr)",
                            md: "repeat(1, 1fr)",
                            lg: "repeat(2, 1fr)"
                        }}>
                        <GridItem
                            m="0 auto"
                            w={{ base: "90%", sm: "90%", md: "90%", lg: "75%"}}
                            class="chart-container"
                            p="1rem"
                            boxShadow="lg" rounded="md" bg="white">
                            <BudgetChart />
                        </GridItem>
                        <GridItem
                            m="0 auto"
                            w={{ base: "90%", sm: "90%", md: "90%", lg: "90%"}}
                            class="chart-container">
                            <Box
                                className="transactions-table-container"
                                w="100%"
                                m="0"
                                p="0">
                                <Button
                                    className="btn-add-transaction"
                                    colorScheme="green"
                                    onClick={onOpen}>
                                    Add Budgets
                                </Button>
                                <BudgetTableComponent/>
                            </Box>
                        </GridItem>
                    </Grid>
                    <CreateBudgetModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
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
