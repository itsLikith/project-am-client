import { UsersRound, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import EmployeeContentRadio from './EmployeeContentRadio';
import axios from 'axios';

const EmployeeContent = (props) => {
  const [employees, setEmployees] = useState([]);
  const [aeps, setAEPs] = useState([]);
  const [avps, setAVPs] = useState([]); // State for AVPs
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Function to fetch employee, AEP, and AVP details from the API
  const fetchEmployeesAndAEPs = async () => {
    setLoading(true);
    try {
      const AllData = await axios.get(
        'https://accessmatrix.vercel.app/api/users/employees/all'
      );
      const response = AllData.data;
      if (response.success) {
        setEmployees(response.data.users);
        setAEPs(response.data.aeps);
        setAVPs(response.data.avps); // Set AVP data
      }
    } catch (error) {
      console.error('Error fetching employee, AEP, and AVP data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeesAndAEPs();
  }, []);

  // Filter AEPs based on the search term, including ADP IDs
  const filteredAEPs = aeps
    .map((aep) => {
      const employeeName = aep.EmployeeName || 'Unknown';
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
      const adpMatch = item.ADPs.some((adp) =>
        adp.ADPId.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return nameMatch || aepMatch || adpMatch; // Include ADP ID match
    });

  // Filter AVPs based on the search term, including AVP IDs
  const filteredAVPs = avps.filter((avp) => {
    const nameMatch = avp.Name.toLowerCase().includes(searchTerm.toLowerCase());
    const avpIdMatch = avp.AVPId.toLowerCase().includes(
      searchTerm.toLowerCase()
    );
    return nameMatch || avpIdMatch; // Include AVP ID match
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
                {filteredAEPs.map((item) => (
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
          ) : (
            <table className="table mt-3">
              <thead>
                <tr>
                  <th>AVP ID</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {filteredAVPs.length > 0 ? (
                  filteredAVPs.map((avp) => (
                    <tr key={avp.AVPId}>
                      <td>{avp.AVPId}</td>
                      <td>{avp.Name}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2">No AVP data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </>
      ) : null}
    </div>
  );
};

export default EmployeeContent;
