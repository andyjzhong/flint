import React, { useContext, useEffect } from 'react';
import { Table, Thead, Tr, Th, Td, Tbody } from '@chakra-ui/react';
import { DataContext } from './DataContext';

const SummaryTable = () => {

    const { budgetsList } = useContext(DataContext);

    console.log(budgetsList);

    return (
        <div className="table">
            <Table size="sm">
                <Thead>
                    <Tr>
                        <Th>Budget Category</Th>
                        <Th isNumeric>Budget Amount</Th>
                        <Th isNumeric>Total Spending</Th>
                        <Th isNumeric>Variance</Th>
                        <Th>Icon (+ / -)</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>Food</Td>
                        <Td isNumeric>100</Td>
                        <Td isNumeric>80</Td>
                        <Td isNumeric>20</Td>
                        <Td isNumeric>^</Td>
                    </Tr>
                    <Tr>
                        <Td>Travel</Td>
                        <Td isNumeric>200</Td>
                        <Td isNumeric>80</Td>
                        <Td isNumeric>20</Td>
                        <Td isNumeric>^</Td>
                    </Tr>
                    <Tr>
                        <Td>Utilities</Td>
                        <Td isNumeric>300</Td>
                        <Td isNumeric>80</Td>
                        <Td isNumeric>20</Td>
                        <Td isNumeric>^</Td>
                    </Tr>
                </Tbody>
            </Table>
        </div>
    )
}

export default SummaryTable;
