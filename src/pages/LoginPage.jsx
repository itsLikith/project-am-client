import '../styles/LoginPage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const LoginPage = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginButton = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(''); // Clear previous messages

    try {
      const packet = {
        employeeId: username,
        password: password,
      };
      const response = await axios.post(
        process.env.REACT_APP_API_URL+'/users/login',
        packet
      );

      // Check for success response
      if (response.data.success) {
        const { accessToken, refreshToken } = response.data.data;
        Cookies.set('access-matrix-accessToken', accessToken);
        Cookies.set('access-matrix-refreshToken', refreshToken);

        const role = response.data.data.user.role;
        if (role === 'Security') {
          navigate('/security/home');
        } else if (role === 'Admin') {
          navigate('/admin/home');
        } else {
          setMessage('Invalid role detected.');
        }
      } else {
        // Handle error responses from the server
        setMessage(response.data.message || 'An unexpected error occurred.');
      }
    } catch (error) {
      // Handle network or other errors
      if (error.response) {
        // Server responded with a status outside of the 2xx range
        setMessage(
          error.response.data.message || 'An error occurred during login.'
        );
      } else {
        // Network error or other unexpected error
        setMessage('Network error. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page bg-dark text-light">
      <form className="border border-2 p-4" onSubmit={handleLoginButton}>
        {props.userType === 'security' ? (
          <p className="h6 text-center m-4">Login</p>
        ) : props.userType === 'admin' ? (
          <p className="h6 text-center m-4">Admin Login</p>
        ) : null}

        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Enter Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            className="form-control"
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="passkey" className="form-label">
            Enter Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="passkey"
            value={password}
            className="form-control"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            id="showPwd"
            className="form-check-input"
            checked={showPassword}
            onChange={handleShowPasswordChange}
          />
          <label htmlFor="showPwd" className="form-check-label">
            Show Password
          </label>
        </div>

        {isLoading ? (
          <button className="btn btn-success mt-2 p-2 w-100" disabled>
            <span className="spinner-border spinner-border-sm"></span> Loading..
          </button>
        ) : (
          <button type="submit" className="btn btn-success mt-2 p-2 w-100">
            Login
          </button>
        )}

        {message && <p className="text-danger text-center mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
