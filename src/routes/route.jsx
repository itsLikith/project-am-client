import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/SecurityHomePage';
import AdminHome from '../pages/AdminHome';
import AdminSettings from '../pages/AdminSettingsPage';
import DevPage from '../pages/DevPage';

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

        {/* Admin Employee Configuration Routes */}
        <Route
          path="/admin/employee"
          element={<AdminHome viewContent="employee" />}
        />
        <Route
          path="/admin/employee/aep&adp"
          element={<AdminHome viewContent="employee" employeeView="adp&aep" />}
        />
        <Route
          path="/admin/employee/avp"
          element={<AdminHome viewContent="employee" employeeView="avp" />}
        />
        <Route
          path="/admin/employee/security"
          element={<AdminHome viewContent="employee" employeeView="security" />}
        />

        {/* Admin Validity Configuration Routes */}
        <Route
          path="/admin/validity"
          element={<AdminHome viewContent="validity" />}
        />
        <Route
          path="/admin/validity/aep&adp"
          element={<AdminHome viewContent="validity" validityView="aep&adp" />}
        />
        <Route
          path="/admin/validity/avp"
          element={<AdminHome viewContent="validity" validityView="avp" />}
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
        <Route
          path="/admin/settings/authorize/renew"
          element={<AdminSettings selected="authorize" task="renew" />}
        />
        <Route
          path="/admin/settings/authorize/block"
          element={<AdminSettings selected="authorize" task="block" />}
        />
        <Route
          path="/admin/settings/authorize/unblock"
          element={<AdminSettings selected="authorize" task="unblock" />}
        />
        <Route
          path="/admin/settings/authorize/"
          element={<AdminSettings selected="" task="" />}
        />
        <Route
          path="/admin/settings/generateQR/aep"
          element={<AdminSettings selected="generateQR" task="aep" />}
        />
        <Route
          path="/admin/settings/generateQR/avp"
          element={<AdminSettings selected="generateQR" task="avp" />}
        />
        <Route
          path="/admin/settings/generateQR/adp"
          element={<AdminSettings selected="generateQR" task="adp" />}
        />
        <Route path="/developers" element={<DevPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
