import { useState } from 'react';
import axios from 'axios';

const IssueContentAEP = (props) => {
  const [formData, setFormData] = useState({
    aepNumber: '',
    employeeName: '',
    fromDate: '',
    toDate: '',
    validAreas: '',
    locations: '',
    dateOfIssue: '',
    dateOfExpiry: '',
    issuedBy: '',
    status: '',
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
    try {
      const response = await axios.post('/your-api-endpoint', formData); // Replace with your API endpoint
      console.log('Form submitted successfully:', response.data);
      // Reset the form data after submission
      setFormData({
        aepNumber: '',
        employeeName: '',
        fromDate: '',
        toDate: '',
        validAreas: '',
        locations: '',
        dateOfIssue: '',
        dateOfExpiry: '',
        issuedBy: '',
        status: '',
        adpAvailable: false,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }

    const packet = {
      AEPId: formData.aepNumber,
      Locations: ['Init'], //array of strings,
      EmployeeName: formData.employeeName,
      DateofIssue: formData.dateOfIssue,
      DateofExpiry: formData.dateOfExpiry,
      IssuedBy: formData.issuedBy,
      status: formData.status,
      AdpAvailable: formData.adpAvailable,
    };

    const response = await axios.post(
      'https://accessmatrix.vercel.app/api/admin/AEP/',
      packet
    );
    console.log(response.data);
  };

  return (
    <div>
      {props.selected === 'aep' ? (
        <>
          <span className="h6 text-info">Issue AEP</span>
          <form onSubmit={handleSubmit} className="container-fluid p-4">
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="aepNumber"
                  placeholder="Enter AEP number"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="employeeName"
                  placeholder="Enter employee name"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>From:</label>
                <input
                  type="date"
                  className="form-control"
                  name="fromDate"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>To:</label>
                <input
                  type="date"
                  className="form-control"
                  name="toDate"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12 mb-3">
                <label>Select Locations:</label>
                <select
                  className="form-control"
                  name="locations"
                  required
                  onChange={handleChange}
                >
                  <option value="" selected disabled>
                    Select Location
                  </option>
                  <option value="ATC">ATC</option>
                  <option value="Main">Main</option>
                  <option value="CNS">CNS</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label>Date of Issue:</label>
                <input
                  type="date"
                  className="form-control"
                  name="dateOfIssue"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Date of Expiry:</label>
                <input
                  type="date"
                  className="form-control"
                  name="dateOfExpiry"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="issuedBy"
                  placeholder="Issued By"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <select
                  className="form-control"
                  name="status"
                  required
                  onChange={handleChange}
                >
                  <option value="" selected disabled>
                    Select Status
                  </option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Block">Block</option>
                </select>
              </div>
            </div>
            <div className="col-md-12 mt-3">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Enter valid areas"
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-md-12 mt-3">
              <label>
                <input
                  type="checkbox"
                  name="adpAvailable"
                  onChange={handleChange}
                />{' '}
                ADP Available
              </label>
            </div>
            <p className="mt-3 text-center">
              <input type="submit" className="btn btn-success" value="Submit" />
            </p>
          </form>
        </>
      ) : null}
    </div>
  );
};

export default IssueContentAEP;
