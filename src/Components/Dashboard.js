import React, { useEffect } from 'react';
import Doughnut from './Doughnut';
import SummaryTable from './SummaryTable';
import { Grid, GridItem } from '@chakra-ui/react';
import "./Dashboard.css"
import axios from 'axios';

const Dashboard = () => {

    useEffect(() => {
        getUserData()
    }, [])

    const userId = "614dd60e29fe32ab9541683b";

    const getUserData = async () => {
        console.log("Attempting to retrieve user data...")

        try {
            const url =
                process.env.NODE_ENV === 'production'
                    ? `http://flint-server.herokuapp.com/users/${userId}`
                    : `http://localhost:8000/users/${userId}`

            const response = await axios(url)
            console.log("Response data: ", response.data);

        } catch (error) {
            console.warn("Error when retrieving user data.")
        }
    }

    return (
        <div className="dashboard">
            <h1>Dashboard Page</h1>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <GridItem colSpan={1}>
                    <div className="chart-container">
                        <Doughnut/>
                    </div>
                </GridItem>
                <GridItem colSpan={1}>
                    <SummaryTable />
                </GridItem>
            </Grid>
        </div>
    )
}

export default Dashboard;
