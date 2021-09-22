import React from 'react';
import { Table, Thead, Tr, Th, Td, Tbody } from '@chakra-ui/react';
import './Table.css';

const TableComponent = () => {
    return (
        <div className="table">
            <Table size="sm">
                <Thead>
                    <Tr>
                        <Th>Description</Th>
                        <Th>Date</Th>
                        <Th>Type</Th>
                        <Th>Category</Th>
                        <Th>Subcategory</Th>
                        <Th isNumeric>Amount</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>Starbucks</Td>
                        <Td>September 21, 2021</Td>
                        <Td>Expense</Td>
                        <Td>Food</Td>
                        <Td>Coffee Shops</Td>
                        <Td isNumeric>8.25</Td>
                    </Tr>
                    <Tr>
                        <Td>McDonalds</Td>
                        <Td>September 12, 2021</Td>
                        <Td>Expense</Td>
                        <Td>Food</Td>
                        <Td>Fast Food</Td>
                        <Td isNumeric>14.75</Td>
                    </Tr>
                    <Tr>
                        <Td>Wal-Mart</Td>
                        <Td>September 6, 2021</Td>
                        <Td>Expense</Td>
                        <Td>Food</Td>
                        <Td>Groceries</Td>
                        <Td isNumeric>38.33</Td>
                    </Tr>
                </Tbody>
            </Table>
        </div>
    )
}

export default TableComponent;
