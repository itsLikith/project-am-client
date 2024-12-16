import { Search } from 'lucide-react';
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
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Function to fetch records from the API
  const fetchRecords = async () => {
    try {
      const response = await axios.get(
        'https://accessmatrix.vercel.app/api/users/employees/all'
      );
      if (response.data.success) {
        const processedRecords = response.data.data.users.map((user) => ({
          name: user.employeeName,
          aepId: user.employeeId,
          adpId: user.adpId || 'N/A', // Assuming adpId exists in user data
          avpId: user.avpId || 'N/A', // Assuming avpId exists in user data
          entryTime: user.entryTime || 'N/A', // Assuming entryTime exists in user data
          exitTime: user.exitTime || 'N/A', // Assuming exitTime exists in user data
          date: new Date(user.date).toLocaleDateString(), // Assuming date exists in user data
        }));
        setRecords(processedRecords);
      }
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // Handle search functionality
  const filteredRecords = records.filter((record) =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <RecordsContainer>
      <span className="h5 text-danger">Records</span>
      <p className="mt-3">
        From:{' '}
        <input
          type="datetime-local"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="form-control mt-1"
        />
      </p>
      <p className="mt-1">
        To:{' '}
        <input
          type="datetime-local"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="form-control mt-1"
        />
      </p>
      <span className="input-group mt-2">
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
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>AEP ID</th>
            <th>ADP ID</th>
            <th>AVP ID</th>
            <th>Date</th>
            <th>Entry</th>
            <th>Exit</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record, index) => (
            <tr key={index}>
              <td>{record.name}</td>
              <td>{record.aepId}</td>
              <td>{record.adpId}</td>
              <td>{record.avpId}</td>
              <td>{record.date}</td>
              <td>{record.entryTime}</td>
              <td>{record.exitTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </RecordsContainer>
  );
};

export default RecordsContent;
