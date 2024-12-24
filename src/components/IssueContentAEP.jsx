import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';
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
    locations: '',
    adpAvailable: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const packet = {
      AEPId: formData.aepNumber,
      Locations: [formData.locations], // Ensure this is an array
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
        locations: '',
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
              <select
                className="form-control"
                name="locations"
                required
                value={formData.locations}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Location
                </option>
                <option value="A">Arrival Hall</option>
                <option value="D">Departure Hall</option>
                <option value="T">Terminal Building</option>
                <option value="S">Terminal Building</option>
                <option value="P">Apron Area</option>
                <option value="B">Baggage Handling</option>
                <option value="F">Air Traffic Control except ATC tower</option>
                <option value="Ft">ATC tower</option>
                <option value="C">
                  Cargo Terminal without Cargo SHA-Domestic & International
                </option>
                <option value="Ci">
                  Cargo Terminal without Cargo SHA-Intl
                </option>
                <option value="Cs">
                  Cargo SHA pertaining to C or Cd or Ci
                </option>
                <option value="I">Boarding Gates to Immigration</option>
              </select>
            </div>
            <div className="form-check mb-3">
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
