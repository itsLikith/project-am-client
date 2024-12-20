import { TicketCheck, Search } from 'lucide-react';
import { useState, useEffect } from 'react';

const ValidityContent = () => {
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

  // Filter AEPs based on the search term
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
      return nameMatch || aepMatch;
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

  return (
    <div className="employee-content">
      <p className="d-block justify-content-between">
        <span className="h5 text-danger d-flex align-items-center gap-1">
          Validity <TicketCheck size={22} />
        </span>
        <span className="input-group mt-4">
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
      </p>

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
                    ? 'table-danger'
                    : 'table-success';
                  return (
                    <tr key={`${item.AEPId}-${adp.ADPId}`} className={rowClass}>
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
                      ? 'table-danger'
                      : 'table-success'
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
    </div>
  );
};

export default ValidityContent;
