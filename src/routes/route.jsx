import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/SecurityHomePage';
import AdminHome from '../pages/AdminHome';
import AdminSettings from '../pages/AdminSettingsPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage userType="security" />} />
        <Route
          path="/security/login"
          element={<LoginPage userType="security" />}
        />
        <Route path="/admin/login" element={<LoginPage userType="admin" />} />
        <Route path="/security/home" element={<HomePage />} />
        <Route path="/admin/home" element={<AdminHome />} />

        <Route
          path="/admin/employee"
          element={<AdminHome viewContent="employee" />}
        />
        <Route
          path="/admin/validity"
          element={<AdminHome viewContent="validity" />}
        />
        <Route
          path="/admin/issue"
          element={<AdminHome viewContent="issue" selected="none" />}
        />
        <Route
          path="/admin/record"
          element={<AdminHome viewContent="logrecord" />}
        />
        <Route
          path="/admin/home/issue/aep"
          element={<AdminHome viewContent="issue" selected="aep" />}
        />
        <Route
          path="/admin/home/issue/avp"
          element={<AdminHome viewContent="issue" selected="avp" />}
        />
        <Route
          path="/admin/home/issue/adp"
          element={<AdminHome viewContent="issue" selected="adp" />}
        />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
