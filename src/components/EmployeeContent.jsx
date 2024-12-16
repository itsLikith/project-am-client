import { Search } from 'lucide-react';
import { useState } from 'react';

const EmployeeContent = () => {
  const employees = useState({});
  return (
    <div className="employee-content">
      <p className="d-block justify-content-between">
        <span className="h5 text-danger">Employee Content</span>
        <span className="input-group mt-4">
          <span className="input-group-text">
            <Search size={21} />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search Employee"
          />
        </span>
      </p>
      <table className="table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>AEP</th>
            <th>ADP</th>
            <th>AVP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>3432</td>
            <td>32433</td>
            <td>2443</td>
            <td>234</td>
            <td>234</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeContent;
