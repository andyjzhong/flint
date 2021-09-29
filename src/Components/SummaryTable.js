import React, { useContext, useEffect } from 'react';
import { Box, Table, Thead, Tr, Th, Td, Tbody } from '@chakra-ui/react';
import { DataContext } from './DataContext';

const SummaryTable = (props) => {

    const { summaryData } = useContext(DataContext);
    let summaryTableRow = []

    if (summaryData) {
        summaryTableRow = summaryData.map((item, index) => {
            return (
                <Tr key={index}>
                    <Td>{item[0]}</Td>
                    <Td isNumeric>${(item[1].totalBudget || 0).toFixed(0)}</Td>
                    <Td isNumeric>${(item[1].totalSpend || 0).toFixed(0)}</Td>
                    <Td isNumeric>${((item[1].totalBudget || 0) - (item[1].totalSpend || 0)).toFixed(0)}</Td>
                    <Td style={{ color: "black", textAlign: "center" }}>
                        {
                            (Math.sign((item[1].totalBudget || 0) - item[1].totalSpend) >= 0)
                                ? "Under"
                                : "Over"
                        }
                    </Td>
                </Tr>
            )
        })
    }

    return (
        <Box className="table" overflowX="auto">
            <Table size="sm">
                <Thead>
                    <Tr>
                        <Th style={{ color: "black" }}>Budget Category</Th>
                        <Th style={{ color: "black" }} isNumeric>Total Budget</Th>
                        <Th style={{ color: "black" }} isNumeric>Total Spend</Th>
                        <Th style={{ color: "black" }} isNumeric>Variance</Th>
                        <Th style={{ color: "black", textAlign: "center" }}>+ / -</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {summaryTableRow}
                </Tbody>
            </Table>
        </Box>
    )
}

export default SummaryTable;
