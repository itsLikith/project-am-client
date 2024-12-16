import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

const ValidityContent = () => {
  const [employees, setEmployees] = useState([]);

  // Mock fetching data from backend
  useEffect(() => {
    const fetchData = async () => {
      const data = [
        {
          id: 3432,
          name: 'John Doe',
          aepAdp: 234,
          avp: 234,
          expiryDate: '2024-12-20',
        },
        {
          id: 2443,
          name: 'Jane Smith',
          aepAdp: 150,
          avp: 200,
          expiryDate: '2024-12-14',
        },
      ];
      setEmployees(data);
    };

    fetchData();
  }, []);

  // Set currentDate to midnight to avoid time issues
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set time to 00:00:00

  return (
    <div className="employee-content">
      <p className="d-block justify-content-between">
        <span className="h5 text-danger">Validity Content</span>
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
            <th>AEP/ADP</th>
            <th>AVP</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            const expiryDate = new Date(employee.expiryDate);
            expiryDate.setHours(0, 0, 0, 0); // Set expiry date time to 00:00:00

            const rowClass = expiryDate < currentDate ? 'text-warning' : '';

            return (
              <tr key={employee.id} className={rowClass}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.aepAdp}</td>
                <td>{employee.avp}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ValidityContent;
