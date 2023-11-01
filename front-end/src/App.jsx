import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import Calendar from "./components/CalendarHome";
import ToDo from "./components/ToDo";
import "./App.css";
import { SignUp } from "./components/SignUp";
import LoginPage  from "./components/loginPage";

export default function App(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/date/:date/todo" element={<ToDo />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/calendar" element={<Calendar />} />
            </Routes>
        </BrowserRouter>
    )
}