import { UsersRound, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import EmployeeContentRadio from './EmployeeContentRadio';
import axios from 'axios';
import Cookies from 'js-cookie';

const EmployeeContent = (props) => {
  const [employees, setEmployees] = useState([]);
  const [aeps, setAEPs] = useState([]);
  const [avps, setAVPs] = useState([]); // State for AVPs
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling

  // Function to fetch employee, AEP, and AVP details from the API
  const fetchEmployeesAndAEPs = async () => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/employees/all`,
        {
          headers: {
            authorization: Cookies.get('accessToken')
              ? `Bearer ${Cookies.get('accessToken')}`
              : '',
            sessionData: Cookies.get(''), // This should have a key value
          },
        }
      );

      if (response.data.success) {
        setEmployees(response.data.data.users);
        setAEPs(response.data.data.aeps);
        setAVPs(response.data.data.avps); // Set AVP data
      } else {
        setError('Failed to fetch data.'); // Handle unsuccessful response
      }
    } catch (error) {
      setError(error.message); // Set error message
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeesAndAEPs();
  }, []);

  // Get current date for comparison
  const currentDate = new Date();

  // Filter AEPs based on the search term, including ADP IDs
  const filteredAEPs = aeps
    .map((aep) => {
      const employeeName = aep.EmployeeName || 'Unknown';
      const isExpired = new Date(aep.DateofExpiry) < currentDate;

      return {
        AEPId: aep.AEPId,
        employeeName: employeeName,
        ADPs: aep.ADP || [],
        AEPStatus: isExpired ? 'INACTIVE' : aep.status || 'N/A', // AEP Status
      };
    })
    .filter((item) => {
      const nameMatch = item.employeeName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const aepMatch = item.AEPId.toLowerCase().includes(
        searchTerm.toLowerCase()
      );
      const adpMatch = item.ADPs.some((adp) =>
        adp.ADPId.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return nameMatch || aepMatch || adpMatch; // Include ADP ID match
    });

  // Map ADP statuses and check for expiration
  const adpStatuses = {};
  aeps.forEach((aep) => {
    aep.ADP.forEach((adp) => {
      const isAdpExpired = new Date(adp.ADPValidity) < currentDate;
      adpStatuses[adp.ADPId] = isAdpExpired ? 'INACTIVE' : adp.status;
    });
  });

  // Filter AVPs based on the search term, including AVP IDs
  const filteredAVPs = avps.filter((avp) => {
    const nameMatch = avp.Name.toLowerCase().includes(searchTerm.toLowerCase());
    const avpIdMatch = avp.AVPId.toLowerCase().includes(
      searchTerm.toLowerCase()
    );
    return nameMatch || avpIdMatch; // Include AVP ID match
  });

  const filteredEmps = employees.filter((emp) => {
    const empIdMatch = emp.employeeId
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const empNameMatch = emp.employeeName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return empIdMatch || empNameMatch;
  });

  return (
    <div className="employee-content">
      <p className="d-block justify-content-between">
        <span className="h5 text-danger d-flex align-items-center gap-1">
          Employee <UsersRound size={22} />
        </span>
        <span className="d-flex justify-content-center">
          <EmployeeContentRadio />
        </span>
      </p>

      {props.employeeView === 'adp&aep' && (
        <>
          <span className="input-group mt-4 mb-3">
            <span className="input-group-text">
              <Search size={21} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search AEPs, Employee Names, or ADP IDs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </span>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border m-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="text-danger text-center">{error}</div> // Display error message
          ) : (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>AEP ID</th>
                    <th>ADP IDs</th>
                    <th>ADP Status</th>
                    <th>AEP Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAEPs.length > 0 ? (
                    filteredAEPs.map((item) => (
                      <tr key={item.AEPId}>
                        <td>{item.employeeName}</td>
                        <td>{item.AEPId}</td>
                        <td>
                          {item.ADPs.length > 0
                            ? item.ADPs.map((adp) => adp.ADPId).join(', ')
                            : 'N/A'}
                        </td>
                        <td>
                          {item.ADPs.length > 0
                            ? item.ADPs.map(
                                (adp) => adpStatuses[adp.ADPId] || 'N/A'
                              ).join(', ')
                            : 'N/A'}
                        </td>
                        <td>{item.AEPStatus}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No AEP/ADP data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          )}
        </>
      )}

      {props.employeeView === 'avp' && (
        <>
          <span className="input-group mt-4 mb-3">
            <span className="input-group-text">
              <Search size={21} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search AVPs by ID or Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </span>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border m-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="text-danger text-center">{error}</div> // Display error message
          ) : (
            <table className="table mt-3">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>AVP ID</th>
                  <th>AVP Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAVPs.length > 0 ? (
                  filteredAVPs.map((avp) => (
                    <tr key={avp.AVPId}>
                      <td>{avp.Name}</td>
                      <td>{avp.AVPId}</td>
                      <td>{avp.status || 'N/A'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No AVP data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </>
      )}

      {props.employeeView === 'security' && (
        <>
          <span className="input-group mt-4 mb-3">
            <span className="input-group-text">
              <Search size={21} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search Security Employees"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </span>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border m-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="text-danger text-center">{error}</div> // Display error message
          ) : (
            <table className="table mt-3">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmps.length > 0 ? (
                  filteredEmps.map((emp) => (
                    <tr key={emp.employeeId}>
                      <td>{emp.employeeId}</td>
                      <td>{emp.employeeName}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2">No Security Employee data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default EmployeeContent;
