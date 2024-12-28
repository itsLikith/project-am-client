import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ManageEmployee = () => {
  const [selected, setSelected] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Security');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setSelected(event.target.value);
    setMessage(''); // Clear message when action changes
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const packet = {
      employeeId,
      employeeName,
      email,
      password,
      role,
      location,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/register`,
        packet,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
          },
        }
      );

      // Handle successful response
      console.log(response.data);
      setMessage('Employee added successfully!');
      // Clear form fields after successful submission
      setEmployeeId('');
      setEmployeeName('');
      setEmail('');
      setPassword('');
      setLocation('');
    } catch (error) {
      // Handle error response
      if (error.response) {
        // Server responded with a status other than 200 range
        setMessage(
          `Error: ${error.response.data.message || 'Something went wrong.'}`
        );
      } else if (error.request) {
        // Request was made but no response was received
        setMessage('Error: No response from server. Please try again later.');
      } else {
        // Something happened in setting up the request
        setMessage(`Error: ${error.message}`);
      }
      console.error(error);
    }
  };

  return (
    <div className="container-fluid mt-3">
      <span className="h6 text-info">Manage Employees</span>
      <div className="form-group mt-2">
        <select
          id="actionSelect"
          className="form-control"
          value={selected}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select Action
          </option>
          <option value="add">Add Employee</option>
          <option value="delete">Delete Employee</option>
        </select>
      </div>
      <div className="mt-4 d-flex">
        {selected === 'add' ? (
          <form
            onSubmit={handleSubmit}
            className="container-fluid p-3 border border-2"
          >
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  placeholder="Enter Employee ID"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="form-control"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  placeholder="Enter Employee Name"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="password"
                  placeholder="Create Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="form-group mb-3">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="form-control"
                required
              >
                <option value="" disabled>
                  Select Location
                </option>
                <option value="Location 1">Location 1</option>
                <option value="Location 2">Location 2</option>
              </select>
            </div>
            <p className="text-warning text-center">{message}</p>
            <span className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">
                Add Employee
              </button>
            </span>
          </form>
        ) : selected === 'delete' ? (
          <div className="alert alert-warning mt-4">
            Will be available later
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ManageEmployee;
