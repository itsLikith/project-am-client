import { useState } from 'react';
import { Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const IssueContentAVP = (props) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    avpNumber: '',
    vehicleNumber: '',
    vehicleType: '',
    aepNumber: '',
    renewalDate: '',
    expiryDate: '',
    validAreas: '',
    dateOfIssue: '',
    avpValidity: '',
    authorizedBy: '',
    name: '',
    designation: '',
    organization: '',
    violation: '', // This will be a comma-separated string
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Log the entered data
    console.log('Entered Data:', formData);

    // Prepare the packet for the API call
    const packet = {
      AVPId: formData.avpNumber,
      DateofIssue: formData.renewalDate,
      AVPValidity: formData.expiryDate,
      AuthorizedBy: formData.authorizedBy,
      Name: formData.name,
      Designation: formData.designation,
      Organization: formData.organization,
      Violation: formData.violation.split(',').map((v) => v.trim()), // Convert to array
    };

    try {
      const response = await axios.post(
        'https://accessmatrix.vercel.app/api/AVP/create',
        packet
      );

      console.log('Response:', response.data); // Handle the response as needed

      if (response.data.success) {
        alert('AVP created');
        // Optionally, reset the form data after submission
        setFormData({
          avpNumber: '',
          vehicleNumber: '',
          vehicleType: '',
          aepNumber: '',
          renewalDate: '',
          expiryDate: '',
          validAreas: '',
          dateOfIssue: '',
          avpValidity: '',
          authorizedBy: '',
          name: '',
          designation: '',
          organization: '',
          violation: '', // Reset to empty string
        });
        navigate('/admin/home/issue/avp');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      {props.selected === 'avp' ? (
        <>
          <span className="h6 text-info">Issue AVP</span>
          <br />
          <form onSubmit={handleSubmit} className="container-fluid p-4">
            <div className="row">
              {/* Existing Fields */}
              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="avpNumber"
                  placeholder="Enter AVP number"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="vehicleNumber"
                  placeholder="Enter vehicle number"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="vehicleType"
                  placeholder="Enter vehicle type"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <div className="form-control">
                  <label>Enter renewal date:</label>
                  <input
                    type="date"
                    className="form-control"
                    name="renewalDate"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="form-control">
                  <label>Enter expiry date:</label>
                  <input
                    type="date"
                    className="form-control"
                    name="expiryDate"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="authorizedBy"
                  placeholder="Authorized By"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Name"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="designation"
                  placeholder="Designation"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="organization"
                  placeholder="Organization"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12 mb-3">
                <textarea
                  className="form-control"
                  name="validAreas"
                  rows="3"
                  placeholder="Enter valid areas"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="col-md-12 mt-3">
                <textarea
                  className="form-control"
                  name="violation"
                  rows="3"
                  placeholder="Enter Violations (comma-separated)"
                  required
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <span className="d-flex justify-content-center mt-3">
              <button className="btn btn-success d-flex align-items-center gap-1">
                Submit <Save size={18} />
              </button>
            </span>
          </form>
        </>
      ) : null}
    </div>
  );
};

export default IssueContentAVP;
