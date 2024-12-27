import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Locate, Import } from 'lucide-react';
import Cookies from 'js-cookie';
import axios from 'axios';
import SuccessAlert from './SuccessAlert'; // Import SuccessAlert component
import FailureAlert from './FailureAlert'; // Import FailureAlert component

const IssueContentAEP = (props) => {
  const navigate = useNavigate();
  const [aepNumber, setAEPNumber] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [dateOfIssue, setDateOfIssue] = useState('');
  const [dateOfExpiry, setDateOfExpiry] = useState('');
  const [issuedBy, setIssuedBy] = useState('');
  const [status, setStatus] = useState('');
  const [locations, setLocations] = useState([]);
  const [adpAvailable, setAdpAvailable] = useState(false);

  // Alert state variables
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'locations') {
      if (checked) {
        setLocations((prevLocations) => [...prevLocations, value]);
      } else {
        setLocations((prevLocations) =>
          prevLocations.filter((location) => location !== value)
        );
      }
    } else {
      switch (name) {
        case 'aepNumber':
          setAEPNumber(value);
          break;
        case 'employeeName':
          setEmployeeName(value);
          break;
        case 'dateOfIssue':
          setDateOfIssue(value);
          break;
        case 'dateOfExpiry':
          setDateOfExpiry(value);
          break;
        case 'issuedBy':
          setIssuedBy(value);
          break;
        case 'status':
          setStatus(value);
          break;
        case 'adpAvailable':
          setAdpAvailable(checked);
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const packet = {
      AEPId: aepNumber,
      Locations: locations,
      EmployeeName: employeeName,
      DateofIssue: dateOfIssue,
      DateofExpiry: dateOfExpiry,
      IssuedBy: issuedBy,
      status: status,
      AdpAvailable: adpAvailable,
    };

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL+'/admin/AEP/',
        packet,
        {
          headers: {
              "authorization": Cookies.get('accessToken') ? `Bearer ${Cookies.get('accessToken')}` : "",
              "sessionData": Cookies.get('')
          }
      }
      );

      if (response.data.success) {
        setAlertType('success');
        setAlertMessage('AEP created successfully!');
        navigate('/admin/home/issue/aep');
      }
      if (response.data.error) {
        setAlertType('failure');
        setAlertMessage(response.data.message);
        navigate('/admin/home/issue/aep');
      }
    } catch (error) {
      console.error(error);
      setAlertType('failure');
      setAlertMessage(error.message);
    }
  };

  return (
    <div>
      {props.selected === 'aep' && (
        <>
          <h6 className="text-info">Issue AEP</h6>
          <form onSubmit={handleSubmit} className="container-fluid p-4">
            <div className="row mb-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  id="aepNumber"
                  name="aepNumber"
                  value={aepNumber}
                  onChange={handleChange}
                  placeholder="Enter AEP Number"
                  required
                  autoComplete
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  id="employeeName"
                  name="employeeName"
                  value={employeeName}
                  onChange={handleChange}
                  placeholder="Enter Employee Name"
                  required
                  autoComplete
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="form-control">
                  <label htmlFor="dateOfIssue">Date of Issue</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateOfIssue"
                    name="dateOfIssue"
                    value={dateOfIssue}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-control">
                  <label htmlFor="dateOfExpiry">Date of Expiry</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateOfExpiry"
                    name="dateOfExpiry"
                    value={dateOfExpiry}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  id="issuedBy"
                  name="issuedBy"
                  value={issuedBy}
                  onChange={handleChange}
                  placeholder="Issued By"
                  required
                />
              </div>
              <div className="col-md-6">
                <select
                  className="form-control"
                  id="status"
                  name="status"
                  value={status}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label className="text-warning mb-2">
                Select Locations:
                <Locate size={18} />
              </label>
              <div>
                {[
                  { value: 'A', label: 'Arrival Hall' },
                  { value: 'D', label: 'Departure Hall' },
                  { value: 'T', label: 'Terminal Building' },
                  { value: 'S', label: 'Terminal Building' },
                  { value: 'P', label: 'Apron Area' },
                  { value: 'B', label: 'Baggage Handling' },
                  { value: 'F', label: 'Air Traffic Control except ATC tower' },
                  { value: 'Ft', label: 'ATC tower' },
                  {
                    value: 'C',
                    label:
                      'Cargo Terminal without Cargo SHA-Domestic & International',
                  },
                  {
                    value: 'Ci',
                    label: 'Cargo Terminal without Cargo SHA-Intl',
                  },
                  {
                    value: 'Cs',
                    label: 'Cargo SHA pertaining to C or Cd or Ci',
                  },
                  { value: 'I', label: 'Boarding Gates to Immigration' },
                ].map((location) => (
                  <div key={location.value} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={location.value}
                      name="locations"
                      value={location.value}
                      checked={locations.includes(location.value)}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={location.value}
                    >
                      {location.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-check mb-3 d-flex justify-content-center gap-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="adpAvailable"
                name="adpAvailable"
                checked={adpAvailable}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="adpAvailable">
                ADP Available
              </label>
            </div>
            <div className="d-flex justify-content-center mt-2">
              <button
                type="submit"
                className="btn btn-success d-flex align-items-center gap-1"
              >
                Submit <Save size={18} />
              </button>
            </div>
          </form>

          {/* Alert rendering */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%,-50%)',
            }}
          >
            {alertType && (
              <>
                {alertType === 'success' && (
                  <SuccessAlert message={alertMessage} />
                )}
                {alertType === 'failure' && (
                  <FailureAlert message={alertMessage} />
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default IssueContentAEP;
