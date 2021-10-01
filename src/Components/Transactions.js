import React, { useState, useEffect, useContext } from 'react';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router';
import axios from 'axios';
import DatePicker from "react-datepicker";
import { DataContext } from './DataContext';
import { Center, InputLeftElement, FormLabel, HStack, InputGroup, Heading, Button, VStack, Input, FormControl, Box, Select, Text, Stack, useColorModeValue } from "@chakra-ui/react";
import TableComponent from './Table.js';
import { TableActions } from './TableUI/TableActions'
import CreateModal from './CreateModal.js';
import EditModal from './CreateModal.js';
import { useDisclosure } from "@chakra-ui/react";
import moment from 'moment';
import { BsSearch } from 'react-icons/bs'
import { RiAddFill, RiArrowRightUpLine } from 'react-icons/ri'
import './Transactions.css';
import categoryOptionsRaw from "../categories"

const Transactions = () => {

    const [isTokenValid, setIsTokenValid] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
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

        console.log("filtered transactions", filtered)
        setFilteredTransactionsList(filtered)
    }

    return (
        <Center>
            <Box minH={'100vh'} p={4} pt={24} bg={useColorModeValue('gray.50', 'gray.800')}>
                <Center>
                    <VStack mt={{ base: "6", sm: "6", md: "8", lg: "8"}} mb={{ base: "10", sm: "10", md: "20", lg: "14"}}>
                        <Heading mb={6} size="xl">Transactions</Heading>
                        <Text p={2} fontSize={20}>Add and review transactional data</Text>
                    </VStack>
                </Center>

                <Box className="transactions-table-container">
                    <Stack
                        spacing="4"
                        direction={{ base: 'column', md: 'row' }}
                        justify="space-between">
                        <HStack>
                            <FormControl minW={{ md: '320px' }} id="search">
                                <InputGroup size="sm">
                                    <FormLabel srOnly>Filter by name or email</FormLabel>
                                    <InputLeftElement pointerEvents="none" color="gray.400">
                                        <BsSearch />
                                    </InputLeftElement>
                                    <Input
                                        w="100%"
                                        h="10"
                                        variant="outline"
                                        rounded="base"
                                        type="search"
                                        placeholder="Search by keyword"
                                        onChange={handleSearchChange}/>
                                </InputGroup>
                            </FormControl>
                            <Select
                                h="10"
                                variant="outline"
                                name="input-category"
                                onChange={handleSearchCategory}
                                w="200%"
                                rounded="base"
                                size="sm"
                                placeholder="All Categories">
                                {categoryOptions}
                            </Select>
                            <HStack>
                                Begin:
                                <DatePicker
                                    name="input-date"
                                    className="begin-date-picker"
                                    selected={searchStartDate}
                                    onChange={(date) => setSearchStartDate(date)} />
                                End:
                                <DatePicker
                                    name="input-date"
                                    className="begin-date-picker"
                                    selected={searchEndDate}
                                    onChange={(date) => setSearchEndDate(date)} />
                            </HStack>
                            <Button
                                w="100%"
                                h="10"
                                colorScheme="blue"
                                onClick={filterTransactions}>
                                Search
                            </Button>
                        </HStack>
                    </Stack>
                    <TableComponent />
                </Box>
            </Box>
        </Center>
    )
}

export default Transactions;
