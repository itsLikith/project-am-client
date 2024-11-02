import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import AdminHome from "../pages/AdminHome";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage userType="security" />} />
                <Route path="/login" element={<LoginPage userType="security" />} />
                <Route path="/admin" element={<LoginPage userType="admin" />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/adminHome" element={<AdminHome />} />

                <Route path="/emp" element={<AdminHome viewContent="employee" />} />
                <Route path="/val" element={<AdminHome viewContent="validity" />} />
                <Route path="/iss" element={<AdminHome viewContent="issue" />} />
                <Route path="/rec" element={<AdminHome viewContent="logrecord" />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes;