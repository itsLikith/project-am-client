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

    try {
      const packet = {
        employeeId: username,
        password: password,
      };
      console.log(packet);
      const response = await axios.post(
        'https://accessmatrix.vercel.app/api/users/login',
        packet
      );
      const accessToken = response.data.data.accessToken;
      const refreshToken = response.data.data.refreshToken;
      Cookies.set('accessToken', accessToken);
      Cookies.set('refreshToken', refreshToken);
      if (
        response.data.success &&
        response.data.data.user.role === 'Security'
      ) {
        navigate('/security/home');
      } else if (
        response.data.success &&
        response.data.data.user.role === 'Admin'
      ) {
        navigate('/admin/home');
      } else {
        setMessage('Invalid Credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page bg-dark text-light">
      <form className="border border-2 p-4" onSubmit={handleLoginButton}>
        {props.userType === 'security' ? (
          <p className="h6 text-center m-4">Security Personnel Login</p>
        ) : props.userType === 'admin' ? (
          <p className="h6 text-center m-4">Admin Login</p>
        ) : null}
        
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Enter Username</label>
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
          <label htmlFor="passkey" className="form-label">Enter Password</label>
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
        
        {message && <p className="text-danger">{message}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
