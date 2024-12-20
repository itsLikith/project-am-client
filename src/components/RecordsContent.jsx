import { Search, LibraryBig } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled components
const RecordsContainer = styled.div`
  .input-group {
    margin-top: 1rem;
  }

  .table {
    width: 100%;
    margin-top: 1rem;
  }

  .text-danger {
    color: red; /* Adjust color as needed */
  }
`;

const RecordsContent = () => {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // Loading state

  // Function to fetch records from the API
  const fetchRecords = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await axios.get(
        'https://accessmatrix.vercel.app/api/users/employees/all'
      );
      if (response.data.success) {
        const processedRecords = response.data.data.aeps.map((aep) => ({
          AEPId: aep.AEPId,
          EmployeeName: aep.EmployeeName || 'N/A',
          DateofIssue: new Date(aep.DateofIssue).toLocaleDateString(),
          DateofExpiry: new Date(aep.DateofExpiry).toLocaleDateString(),
          ADPs: aep.ADP || [],
        }));
        setRecords(processedRecords);
      }
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // Handle search functionality
  const filteredRecords = records.filter((record) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      record.EmployeeName.toLowerCase().includes(searchLower) ||
      record.AEPId.toString().includes(searchLower)
    );
  });

  return (
    <RecordsContainer>
      <span className="h5 text-danger d-flex align-items-center gap-1">
        Records
        <LibraryBig size={21} />
      </span>
      <span className="input-group mt-2">
        <span className="input-group-text">
          <Search size={21} />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search Employee or AEP ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </span>

      {loading ? ( // Conditional rendering for loading
        <div className="text-center">
          <div className="spinner-border m-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>AEP ID</th>
              <th>Employee Name</th>
              <th>Date of Issue</th>
              <th>Date of Expiry</th>
              <th>ADP ID</th>
              <th>Authorized By</th>
              <th>Designation</th>
              <th>Organization</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.flatMap((record) =>
              record.ADPs.length > 0 ? (
                record.ADPs.map((adp) => (
                  <tr key={adp._id}>
                    <td>{record.AEPId}</td>
                    <td>{record.EmployeeName}</td>
                    <td>{record.DateofIssue}</td>
                    <td>{record.DateofExpiry}</td>
                    <td>{adp.ADPId}</td>
                    <td>{adp.AuthorizedBy}</td>
                    <td>{adp.Designation}</td>
                    <td>{adp.Organization}</td>
                  </tr>
                ))
              ) : (
                <tr key={record.AEPId}>
                  <td>{record.AEPId}</td>
                  <td>{record.EmployeeName}</td>
                  <td>{record.DateofIssue}</td>
                  <td>{record.DateofExpiry}</td>
                  <td colSpan="4">No ADPs available</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </RecordsContainer>
  );
};

export default RecordsContent;
