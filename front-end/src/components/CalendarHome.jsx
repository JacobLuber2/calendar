import Calendar from "react-calendar"
import { useState } from "react";
import 'react-calendar/dist/Calendar.css';
import { BrowserRouter, useNavigate } from "react-router-dom";
export default function CalendarHome(props) {
    const [value, setValue] = useState(new Date());
    const navigate = useNavigate();
    function handleChange(value) {
        const year = value.getFullYear();
        console.log(year);
        let month = value.getMonth() + 1;
        month = month.toString().length === 1 ? '0' + month.toString() : month.toString()

        let day = value.getDate();
        day = day.toString().length === 1 ? '0' + day.toString() : day.toString()

        navigate(`/date/${year}-${month}-${day}/todo`)
    }
    return (
        <Calendar onChange={handleChange} value={value} />
    )
}