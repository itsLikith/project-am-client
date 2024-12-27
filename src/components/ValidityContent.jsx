import { TicketCheck, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import ValidityContentRadio from './ValidityContentRadio';
import Cookies from 'js-cookie';

const ValidityContent = (props) => {
  const [employees, setEmployees] = useState([]);
  const [aeps, setAEPs] = useState([]);
  const [avps, setAVPs] = useState([]); // State for AVPs
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Function to fetch employee, AEP, and AVP details from the API
  const fetchEmployeesAndAEPs = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + '/users/employees/all',
        {
          headers: {
            "authorization": Cookies.get('accessToken') ? `Bearer ${Cookies.get('accessToken')}` : "",
            "sessionData": Cookies.get('')
          }
        }
      );
      const data = await response.json();
      if (data.success) {
        setEmployees(data.data.users);
        setAEPs(data.data.aeps);
        setAVPs(data.data.avps); // Set AVP data
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

  // Function to format date to YYYY-MM-DD
  const formatDate = (dateString) => {
    return dateString ? dateString.split('T')[0] : 'N/A';
  };

  // Function to check if the expiry date is within 10 days
  const isExpiringSoon = (expiryDate) => {
    const currentDate = new Date();
    const expiry = new Date(expiryDate);
    const timeDiff = expiry - currentDate;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff < 10;
  };

  // Filter AEPs based on the search term, including ADP IDs
  const filteredData = aeps
    .map((aep) => {
      const employeeName = aep.EmployeeName || 'Unknown'; // Get EmployeeName directly from AEP
      return {
        AEPId: aep.AEPId,
        employeeName: employeeName,
        ADPs: aep.ADP || [],
        aepExpiry: formatDate(aep.DateofExpiry), // Format AEP expiry date
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
      ); // Check for ADP ID match
      return nameMatch || aepMatch || adpMatch; // Include ADP ID match
    });

  // Separate into expiring soon and not expiring soon
  const expiringSoonItems = [];
  const notExpiringSoonItems = [];

  filteredData.forEach((item) => {
    if (isExpiringSoon(item.aepExpiry)) {
      expiringSoonItems.push(item);
    } else {
      notExpiringSoonItems.push(item);
    }
  });

  // Combine the arrays, with expiring soon items first
  const sortedData = [...expiringSoonItems, ...notExpiringSoonItems];

  // Filter AVPs based on the search term, including names
  const filteredAVPs = avps.filter((avp) => {
    const idMatch = avp.AVPId.toLowerCase().includes(searchTerm.toLowerCase());
    const nameMatch = avp.Name.toLowerCase().includes(searchTerm.toLowerCase());
    return idMatch || nameMatch; // Include name match
  });

  return (
    <div className="employee-content">
      <p className="d-block justify-content-between">
        <span className="h5 text-danger d-flex align-items-center gap-1">
          Validity <TicketCheck size={22} />
        </span>
      </p>
      <span className="d-flex justify-content-center">
        <ValidityContentRadio />
      </span>

      {props.validityView === 'aep&adp' ? (
        <>
          <span className="input-group mt-4">
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
          ) : sortedData.length === 0 ? ( // Check if sortedData is empty
            <div className="text-center">
              <table className='table'>
              <td>No data available Try logging again </td>
              </table>
            </div>
          ) : (
            <table className="table mt-3">
              <thead>
                <tr>
                  <th>AEP ID</th>
                  <th>Employee Name</th>
                  <th>ADP ID</th>
                  <th>AEP Expiry Date</th>
                  <th>ADP Expiry Date</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.flatMap((item) =>
                  item.ADPs.length > 0 ? (
                    item.ADPs.map((adp) => {
                      const adpExpiry = formatDate(adp.ADPValidity);
                      const rowClass = isExpiringSoon(adpExpiry)
                        ? 'text-danger'
                        : 'text-success';
                      return (
                        <tr
                          key={`${item.AEPId}-${adp.ADPId}`}
                          className={rowClass}
                        >
                          <td>{item.AEPId}</td>
                          <td>{item.employeeName}</td>
                          <td>{adp.ADPId}</td>
                          <td
                            className={
                              isExpiringSoon(item.aepExpiry)
                                ? 'text-danger'
                                : 'text-success'
                            }
                          >
                            {item.aepExpiry}
                          </td>
                          <td
                            className={
                              isExpiringSoon(adpExpiry)
                                ? 'text-danger'
                                : 'text-success'
                            }
                          >
                            {adpExpiry}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr
                      key={item.AEPId}
                      className={
                        isExpiringSoon(item.aepExpiry)
                          ? 'text-danger'
                          : 'text-success'
                      }
                    >
                      <td>{item.AEPId}</td>
                      <td>{item.employeeName}</td>
                      <td>N/A</td>
                      <td
                        className={
                          isExpiringSoon(item.aepExpiry)
                            ? 'text-danger'
                            : 'text-success'
                        }
                      >
                        {item.aepExpiry}
                      </td>
                      <td>N/A</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </>
      ) : props.validityView === 'avp' ? (
        <>
          <span className="input-group mt-4">
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
          <table className="table mt-3">
            <thead>
              <tr>
                <th>AVP ID</th>
                <th>Name</th>
                <th>AVP Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredAVPs.length > 0 ? (
                filteredAVPs.map((avp) => {
                  const expiryClass = isExpiringSoon(avp.AVPValidity)
                    ? 'text-danger'
                    : 'text-success';
                  return (
                    <tr key={avp.AVPId}>
                      <td>{avp.AVPId}</td>
                      <td>{avp.Name}</td>
                      <td className={expiryClass}>
                        {formatDate(avp.AVPValidity)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No AVP data available. Try logging in again
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      ) : null}
    </div>
  );
};

export default ValidityContent;
