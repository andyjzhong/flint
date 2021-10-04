import React, { useEffect, useContext } from 'react';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router';
import axios from 'axios';
import DatePicker from "react-datepicker";
import { DataContext } from './DataContext';
import { Center, InputLeftElement, HStack, InputGroup, Heading, Button, VStack, Input, FormControl, Box, Select, Text, Grid, GridItem } from "@chakra-ui/react";
import TableComponent from './Table.js';
import moment from 'moment';
import { BsSearch } from 'react-icons/bs'
import categoryOptionsRaw from "../categories"

const Transactions = () => {

    const {
        transactionsList,
        setFilteredTransactionsList,
        searchValue,
        setSearchValue,
        searchCategory,
        setSearchCategory,
        searchStartDate,
        setSearchStartDate,
        searchEndDate,
        setSearchEndDate,
        setAccessToken,
        setIsUserLoggedIn
    } = useContext(DataContext);

    const history = useHistory()
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
            history.push('/login')
        }
    }

    useEffect(() => {
        refreshToken()
    }, [])

    let categoryOptions = categoryOptionsRaw.map((item, index) => {
        return (
            <option key={item.id} value={item.major}>{item.major}</option>
        )
    })

    // TODO: Currently hardcoded.
    let selectedCategory = "Entertainment"

    const matchingCategory = categoryOptionsRaw.filter((item, index) => {
        return item.major === selectedCategory;
    })

    let subcategoryOptions = matchingCategory[0].minor.map((item, index) => {

        if (selectedCategory.length > 0) {
            return (
                <option key={item} value={item}>{item}</option>
            )
        } else {
            return (
                <option>No Category Selected</option>
            )
        }
    })

    const handleSearchChange = e => setSearchValue(e.target.value)
    const handleSearchCategory = e => setSearchCategory(e.target.value)

    const filterTransactions = () => {
        let filtered = transactionsList.filter((item) => {
            if (searchCategory) {
                return (
                    (item.category === searchCategory)
                    && (moment(item.date).isBetween(searchStartDate, searchEndDate))
                    && (item.description.toLowerCase().includes(searchValue.toLowerCase()))
                )
            } else {
                return (
                    item.description.toLowerCase().includes(searchValue.toLowerCase())
                    && (moment(item.date).isBetween(searchStartDate, searchEndDate))
                )
            }
        })

        setFilteredTransactionsList(filtered)
    }

    return (
        <Center w={"100%"} bg={"rgb(247,250,252)"}>
            <Box w={"90vw"} minH={'100vh'} p={4} pt={24}>
                <Center>
                    <VStack mt={{ base: "6", sm: "6", md: "8", lg: "8"}} mb={{ base: "10", sm: "10", md: "20", lg: "14"}}>
                        <Heading mb={6} size="xl">Transactions</Heading>
                        <Text p={2} fontSize={20} textAlign="center">Add and review transactional data</Text>
                    </VStack>
                </Center>
                <Grid
                    m={"0 auto"}
                    w={"95%"}
                    gap={4}
                    templateColumns={{
                        base: "repeat(2, 1fr)",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(2, 1fr)",
                        lg: "repeat(20, 1fr)"
                    }}>
                    <GridItem id="vBar" colSpan={{
                        base: 2,
                        sm: 2,
                        md: 2,
                        lg: 7
                    }}>
                        <FormControl id="search">
                            <InputGroup>
                                <InputLeftElement pointerEvents="none" color="gray.400">
                                    <BsSearch />
                                </InputLeftElement>
                                <Input
                                    bg="white"
                                    w="100%"
                                    variant="outline"
                                    rounded="base"
                                    type="search"
                                    placeholder="Search by keyword"
                                    onChange={handleSearchChange}/>
                            </InputGroup>
                        </FormControl>
                    </GridItem>
                    <GridItem id="vSelect" colSpan={{
                        base: 2,
                        sm: 2,
                        md: 2,
                        lg: 3
                    }}>
                        <Select
                            bg="white"
                            variant="outline"
                            name="input-category"
                            onChange={handleSearchCategory}
                            rounded="base"
                            placeholder="All Categories">
                            {categoryOptions}
                        </Select>
                    </GridItem>
                    <GridItem id="vDateStart" aligh="right" colSpan={{
                        base: 2,
                        sm: 1,
                        md: 1,
                        lg: 4
                    }}>
                        <HStack>
                            <Text w="40%" textAlign="right" pr={2}>Begin: </Text>
                            <DatePicker
                                wrapperClassName="datePicker"
                                name="input-date"
                                selected={searchStartDate}
                                onChange={(date) => setSearchStartDate(date)} />
                        </HStack>
                    </GridItem>
                    <GridItem id="vDateEnd" colSpan={{
                        base: 2,
                        sm: 1,
                        md: 1,
                        lg: 4
                    }}>
                        <HStack>
                            <Text w="40%" textAlign="right" pr={2}>End: </Text>
                            <DatePicker
                                wrapperClassName="datePicker"
                                name="input-date"
                                selected={searchEndDate}
                                onChange={(date) => setSearchEndDate(date)} />
                        </HStack>
                    </GridItem>
                    <GridItem id="vButton" colSpan={{
                        base: 2,
                        sm: 2,
                        md: 2,
                        lg: 2
                    }}>
                        <Button
                            w="100%"
                            colorScheme="blue"
                            variant="outline"
                            onClick={filterTransactions}>
                            Search
                        </Button>
                    </GridItem>
                </Grid>
                <TableComponent />
            </Box>
        </Center>
    )
}

export default Transactions;

// 35 || 15 || 40 || 10 = 100
