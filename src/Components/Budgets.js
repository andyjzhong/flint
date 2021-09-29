import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Box, Grid, GridItem } from "@chakra-ui/react"
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
            <div className="transactions">
                <h1>Budgets Page</h1>
                <Grid
                    gap="6"
                    templateColumns={{
                        base: "repeat(1, 1fr)",
                        sm: "repeat(1, 1fr)",
                        md: "repeat(1, 1fr)",
                        lg: "repeat(2, 1fr)"
                    }}
                >
                    <GridItem
                        m="0 auto"
                        w={{ base: "90vw", sm: "90vw", md: "90vw", lg: "45vw"}}
                        class="chart-container"
                        p="1rem"
                        border='1px solid lightgray'
                        borderRadius='1rem'
                    >
                        <BudgetChart />
                    </GridItem>
                    <GridItem
                        m="0 auto"
                        w={{ base: "90vw", sm: "90vw", md: "90vw", lg: "45vw"}}
                        class="chart-container"
                    >
                        <Box
                            className="transactions-table-container"
                            w="100%"
                            m="0"
                            p="0"
                        >
                            <Button
                                className="btn-add-transaction"
                                colorScheme="green"
                                onClick={onOpen}
                            >
                                Add Budgets
                            </Button>
                            <BudgetTableComponent/>
                        </Box>
                    </GridItem>
                </Grid>
                <CreateBudgetModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
                <EditBudgetModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
            </div>
        )
    } else {
        return (
            <div className="budgets">
                <h1>Budgets Page</h1>
            </div>
        )
    }
}

export default Budgets;
