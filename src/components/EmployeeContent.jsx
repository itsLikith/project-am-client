import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

const EmployeeContent = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to fetch employee details from the API
  const fetchEmployees = async () => {
    try {
      const response = await fetch(
        'https://accessmatrix.vercel.app/api/users/employees/all'
      );
      const data = await response.json();
      if (data.success) {
        setEmployees(fetchEmployeeDetails(data));
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  // Function to process the API response
  const fetchEmployeeDetails = (response) => {
    return response.data.users.map((user) => {
      // Find associated AEPs
      const associatedAEPs = response.data.aeps.filter(
        (aep) => aep.AEPId === user.employeeId
      );

      // Find associated AVPs
      const associatedAVPs = response.data.avps.filter(
        (avp) => avp.AVPId === user.employeeId
      );

      return {
        employeeId: user.employeeId,
        employeeName: user.employeeName,
        AEPs: associatedAEPs,
        AVPs: associatedAVPs,
      };
    });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Filter employees based on the search term
  const filteredEmployees = employees.filter((employee) =>
    employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="employee-content">
      <p className="d-block justify-content-between">
        <span className="h5 text-danger">Employee</span>
        <span className="input-group mt-4">
          <span className="input-group-text">
            <Search size={21} />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search Employee"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </span>
      </p>
      <table className="table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>AEP</th>
            <th>ADP</th>
            <th>AVP</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.employeeId}>
              <td>{employee.employeeId}</td>
              <td>{employee.employeeName}</td>
              <td>
                {employee.AEPs.length > 0 ? employee.AEPs[0].AEPId : 'N/A'}
              </td>
              <td>
                {employee.AEPs.length > 0 && employee.AEPs[0].ADP.length > 0
                  ? employee.AEPs[0].ADP[0].ADPId
                  : 'N/A'}
              </td>
              <td>
                {employee.AVPs.length > 0 ? employee.AVPs[0].AVPId : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeContent;
