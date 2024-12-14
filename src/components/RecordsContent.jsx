import { Search } from 'lucide-react';

const RecordsContent = () => {
  return (
    <div className="records-content">
      <span className="h5">Records Content</span>
      <p className='mt-3'>
        From:{' '}
        <input
          type="datetime-local"
          name="date"
          id="date"
          className="form-control mt-1"
        />
      </p>
      <p className='mt-1'>
        To:{' '}
        <input
          type="datetime-local"
          name="date"
          id="date"
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
        />
      </span>
      <table className="table mt-3">
        <thead>
          <tr>
            <th rowSpan="2">Employee Name</th>
            <th rowSpan="2">AEP ID</th>
            <th rowSpan="2">ADP ID</th>
            <th rowSpan="2">AVP ID</th>
            <th colspan="2" className="text-center">
              Time
            </th>
          </tr>
          <tr>
            <th>Entry</th>
            <th>Exit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>123</td>
            <td>456</td>
            <td>789</td>
            <td>9:00 AM</td>
            <td>5:00 PM</td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>234</td>
            <td>567</td>
            <td>890</td>
            <td>9:15 AM</td>
            <td>4:45 PM</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RecordsContent;
