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

  .date-filter {
    display: flex;
    gap: 10px;
    margin-top: 1rem;
  }
`;

const RecordsContent = () => {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Function to fetch logs from the API
  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + '/log');
      setLogs(response.data.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // Filter logs based on entry time and search term
  const filteredLogs = logs.filter((log) => {
    const logEntryTime = new Date(log.entryTime);
    const logExitTime = new Date(log.exitTime);

    // Check if log entry time is within the selected date range
    const isWithinDateRange =
      (!startDate || logEntryTime >= new Date(startDate)) &&
      (!endDate || logEntryTime <= new Date(endDate));

    // Show all logs if searchTerm is empty
    if (!searchTerm) {
      return isWithinDateRange;
    }

    return (
      isWithinDateRange &&
      (log.EntryId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (log.location &&
          log.location.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  });

  return (
    <RecordsContainer>
      <span className="h5 text-danger d-flex align-items-center gap-1">
        Logs
        <LibraryBig size={21} />
      </span>

      <div className="row">
        <div className="col-md-6">
          <label htmlFor="">Start Date:</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="">End Date:</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <span className="input-group mt-2">
        <span className="input-group-text">
          <Search size={21} />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search Validated ID, Log ID, or Location"
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
              <th>Validated ID</th>
              <th>Log ID</th>
              <th>Location</th>
              <th>Entry Time</th>
              <th>Exit Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log._id}>
                <td>{log.validatedId || 'N/A'}</td>
                <td>{log.EntryId || 'N/A'}</td>
                <td>{log.location || 'N/A'}</td>
                <td>{new Date(log.entryTime).toLocaleString() || 'N/A'}</td>
                <td>{new Date(log.exitTime).toLocaleString() || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </RecordsContainer>
  );
};

export default RecordsContent;
