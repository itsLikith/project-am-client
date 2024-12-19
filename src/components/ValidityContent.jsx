import { Search, TicketCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled components
const EmployeeContent = styled.div`
  .input-group {
    margin-top: 1rem;
  }

  .table {
    width: 100%;
    margin-top: 1rem;
  }

  .text-warning {
    color: orange; /* Color for expired */
  }

  .text-success {
    color: green; /* Color for valid */
  }
`;

const TableRow = styled.tr`
  &.expired {
    color: orange; /* Expired */
  }

  &.valid {
    color: green; /* More than 10 days remaining */
  }
`;

const ValidityContent = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to fetch employee details from the API
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        'https://accessmatrix.vercel.app/api/users/employees/all'
      );
      if (response.data.success) {
        setEmployees(fetchEmployeeDetails(response.data));
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  // Process the API response to extract employee details
  const fetchEmployeeDetails = (data) => {
    return data.data.users.map((user) => {
      const associatedAEPs = data.data.aeps.filter(
        (aep) => aep.AEPId === user.employeeId
      );
      const associatedAVPs = data.data.avps.filter(
        (avp) => avp.AVPId === user.employeeId
      );

      return {
        id: user.employeeId,
        name: user.employeeName,
        aepAdp: associatedAEPs.length > 0 ? associatedAEPs[0].AEPId : 'N/A',
        avp: associatedAVPs.length > 0 ? associatedAVPs[0].AVPId : 'N/A',
        expiryDate: user.expiryDate, // Assuming expiryDate is part of user data
      };
    });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set time to 00:00:00

  const dateInTenDays = new Date(currentDate);
  dateInTenDays.setDate(currentDate.getDate() + 10);

  // Filter employees based on the search term
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <EmployeeContent>
      <p className="d-block justify-content-between">
        <span className="h5 text-danger d-flex align-items-center gap-1">
          Validity <TicketCheck />
        </span>
        <span className="input-group">
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
            <th>AEP/ADP</th>
            <th>AVP</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => {
            const expiryDate = new Date(employee.expiryDate);
            expiryDate.setHours(0, 0, 0, 0); // Set expiry date time to 00:00:00

            let rowClass = '';
            if (expiryDate < currentDate) {
              rowClass = 'expired'; // Expired
            } else if (expiryDate > dateInTenDays) {
              rowClass = 'valid'; // More than 10 days remaining
            }

            return (
              <TableRow key={employee.id} className={rowClass}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.aepAdp}</td>
                <td>{employee.avp}</td>
              </TableRow>
            );
          })}
        </tbody>
      </table>
    </EmployeeContent>
  );
};

export default ValidityContent;
