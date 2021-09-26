import React, { useContext, useEffect } from 'react';
import { Table, Thead, Tr, Th, Td, Tbody } from '@chakra-ui/react';
import { DataContext } from './DataContext';

const SummaryTable = (props) => {

    const { budgetsList, summaryData } = useContext(DataContext);

    console.log(budgetsList);
    console.log("The Summary Data: ", summaryData);

    let summaryTableRow = summaryData.map((item, index) => {
        return (
            <Tr key={index}>
                <Td>{item[0]}</Td>
                <Td isNumeric>${item[1].totalBudget || 0}</Td>
                <Td isNumeric>${item[1].totalSpend}</Td>
                <Td isNumeric>${(item[1].totalBudget || 0) - item[1].totalSpend}</Td>
                <Td isNumeric>
                {
                    (Math.sign((item[1].totalBudget || 0) - item[1].totalSpend) > 0) ? "Under" : "Over"
                }
                </Td>
            </Tr>
        )
    })

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
                    {summaryTableRow}
                </Tbody>
            </Table>
        </div>
    )
}

export default SummaryTable;
