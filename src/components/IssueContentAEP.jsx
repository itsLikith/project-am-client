import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Locate } from 'lucide-react';
import axios from 'axios';

const IssueContentAEP = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    aepNumber: '',
    employeeName: '',
    dateOfIssue: '',
    dateOfExpiry: '',
    issuedBy: '',
    status: '',
    locations: [], // Change to an array
    adpAvailable: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'locations') {
      // Handle checkbox group for locations
      if (checked) {
        setFormData((prevData) => ({
          ...prevData,
          locations: [...prevData.locations, value], // Add selected location
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          locations: prevData.locations.filter(
            (location) => location !== value
          ), // Remove unselected location
        }));
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const packet = {
      AEPId: formData.aepNumber,
      Locations: formData.locations, // Directly use the array
      EmployeeName: formData.employeeName,
      DateofIssue: formData.dateOfIssue,
      DateofExpiry: formData.dateOfExpiry,
      IssuedBy: formData.issuedBy,
      status: formData.status,
      AdpAvailable: formData.adpAvailable,
    };

    try {
      const response = await axios.post(
        'https://accessmatrix.vercel.app/api/admin/AEP/',
        packet
      );
      console.log(response.data);
      if (response.data.success) {
        navigate('/admin/home/issue/aep');
        alert('AEP created');
      } else {
        console.error('Error:', response.data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setFormData({
        aepNumber: '',
        employeeName: '',
        dateOfIssue: '',
        dateOfExpiry: '',
        issuedBy: '',
        status: '',
        locations: [], // Reset to an empty array
        adpAvailable: false,
      });
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
                  value={formData.aepNumber}
                  onChange={handleChange}
                  placeholder="Enter AEP Number"
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  id="employeeName"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleChange}
                  placeholder="Enter Employee Name"
                  required
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
                    value={formData.dateOfIssue}
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
                    value={formData.dateOfExpiry}
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
                  value={formData.issuedBy}
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
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
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
                      checked={formData.locations.includes(location.value)} // Check if selected
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
                checked={formData.adpAvailable}
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
        </>
      )}
    </div>
  );
};

export default IssueContentAEP;
