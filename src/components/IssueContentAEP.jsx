import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const IssueContentAEP = (props) => {
  const navigate = useNavigate();
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
      } else {
        console.error('Error:', response.data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
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
    }
  };

  return (
    <div>
      {props.selected === 'aep' && (
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
                  value={formData.aepNumber}
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
                  value={formData.employeeName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12 mb-3">
                <label>Select Locations:</label>
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
                  value={formData.dateOfIssue}
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
                  value={formData.dateOfExpiry}
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
                  value={formData.issuedBy}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <select
                  className="form-control"
                  name="status"
                  required
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="" disabled>
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
                name="validAreas"
                placeholder="Enter valid areas"
                value={formData.validAreas}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-md-12 mt-3">
              <label>
                <input
                  type="checkbox"
                  name="adpAvailable"
                  checked={formData.adpAvailable}
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
      )}
    </div>
  );
};

export default IssueContentAEP;
