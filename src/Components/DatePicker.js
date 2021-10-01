import React, { useState, useContext } from "react";
import { DataContext } from './DataContext';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = () => {
    const { setTxDate } = useContext(DataContext);
    const [startDate, setStartDate] = useState(new Date());

    const handleChange = date => {
        setTxDate(date)
        setStartDate(date)
    }

    return (
        <DatePicker selected={startDate} onChange={handleChange} />
    );
};

export default DatePickerComponent;
