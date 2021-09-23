import React, { useState, useContext } from "react";
import { DataContext } from './DataContext';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = () => {
    const { setTransactionDate } = useContext(DataContext);
    const [startDate, setStartDate] = useState(new Date());

    const handleChange = date => {
        setTransactionDate(date)
        setStartDate(date)
    }

    return (
        <DatePicker selected={startDate} onChange={handleChange} />
    );
};

export default DatePickerComponent;
