import { Search, LibraryBig, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import * as XLSX from 'xlsx';

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
    const today = new Date();
    const startDate = today.toISOString().split('T')[0]; // Start date is today

    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 1); // Add one day
    const formattedEndDate = endDate.toISOString().split('T')[0]; // Format end date

    setStartDate(startDate);
    setEndDate(formattedEndDate);
  }, []);

  // Function to apply filters based on date range and search term
  const applyFilters = () => {
    // First filter by date range
    const dateFilteredLogs = logs.filter((log) => {
      const logEntryTime = new Date(log.entryTime);
      const isWithinDateRange =
        (!startDate || logEntryTime >= new Date(startDate)) &&
        (!endDate || logEntryTime <= new Date(endDate));

      return isWithinDateRange;
    });

    // Then filter by search term
    return dateFilteredLogs.filter((log) => {
      if (!searchTerm) return true; // If no search term, include all from date filter

      return (
        log.EntryId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (log.location &&
          log.location.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
  };

  // Update the filteredLogs variable
  const filteredLogs = applyFilters();

  // Function to download logs as Excel
  const downloadLogs = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredLogs.map((log) => ({
        'Validated ID': log.validatedId || 'N/A',
        'Log ID': log.EntryId || 'N/A',
        Name: log.name || 'N/A',
        Location: log.location || 'N/A',
        'Entry Time': new Date(log.entryTime).toLocaleString() || 'N/A',
        'Exit Time': new Date(log.exitTime).toLocaleString() || 'N/A',
      }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Logs');

    XLSX.writeFile(wb, 'logs.xlsx'); // This will generate an .xlsx file
  };

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
              <th>Name</th>
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
                <td>{log.name}</td>
                <td>{log.location || 'N/A'}</td>
                <td>{new Date(log.entryTime).toLocaleString() || 'N/A'}</td>
                <td>{new Date(log.exitTime).toLocaleString() || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p className="d-flex justify-content-end">
        <button className="btn btn-success" onClick={downloadLogs}>
          Download <Download size={20} />
        </button>
      </p>
    </RecordsContainer>
  );
};

export default RecordsContent;
