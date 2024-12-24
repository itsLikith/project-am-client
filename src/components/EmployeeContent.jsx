import { UsersRound, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import EmployeeContentRadio from './EmployeeContentRadio';

const EmployeeContent = (props) => {
  const [employees, setEmployees] = useState([]);
  const [aeps, setAEPs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Function to fetch employee and AEP details from the API
  const fetchEmployeesAndAEPs = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://accessmatrix.vercel.app/api/users/employees/all'
      );
      const data = await response.json();
      if (data.success) {
        setEmployees(data.data.users);
        setAEPs(data.data.aeps);
      }
    } catch (error) {
      console.error('Error fetching employee and AEP data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeesAndAEPs();
  }, []);

  // Filter AEPs based on the search term
  const filteredData = aeps
    .map((aep) => {
      const employeeName = aep.EmployeeName || 'Unknown'; // Get EmployeeName directly from AEP
      return {
        AEPId: aep.AEPId,
        employeeName: employeeName,
        ADPs: aep.ADP || [],
      };
    })
    .filter((item) => {
      const nameMatch = item.employeeName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const aepMatch = item.AEPId.toLowerCase().includes(
        searchTerm.toLowerCase()
      );
      return nameMatch || aepMatch;
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

      {props.employeeView === 'adp&aep' ? (
        <>
          <span className="input-group mt-4 mb-3">
            <span className="input-group-text">
              <Search size={21} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search AEPs or Employee Names"
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
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>AEP ID</th>
                  <th>Employee Name</th>
                  <th>ADP IDs</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.AEPId}>
                    <td>{item.AEPId}</td>
                    <td>{item.employeeName}</td>
                    <td>
                      {item.ADPs.length > 0
                        ? item.ADPs.map((adp) => adp.ADPId).join(', ')
                        : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      ) : props.employeeView === 'avp' ? (
        <>
          <span className="input-group mt-4 mb-3">
            <span className="input-group-text">
              <Search size={21} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search AVPs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </span>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>AVP</th>
              </tr>
            </thead>
            <tbody>
              {/* Placeholder for AVP data; replace with actual AVP data handling */}
              <tr>
                <td>No AVP data available</td>
              </tr>
            </tbody>
          </table>
        </>
      ) : null}
    </div>
  );
};

export default EmployeeContent;
