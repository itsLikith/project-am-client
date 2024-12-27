import { useState } from 'react';
import { Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuccessAlert from './SuccessAlert'; // Import SuccessAlert component
import FailureAlert from './FailureAlert'; // Import FailureAlert component

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

  // Alert state variables
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Prepare the packet for the API call
    const packet = {
      AVPId: formData.avpNumber,
      VehicleNo: formData.vehicleNumber,
      VehicleType: formData.vehicleType,
      DateofIssue: formData.renewalDate,
      AVPValidity: formData.expiryDate,
      AuthorizedBy: formData.authorizedBy,
      Name: formData.name,
      Designation: formData.designation,
      Organization: formData.organization,
      Violation: formData.violation.split(',').map((v) => v.trim()), // Convert to array
      status: 'ACTIVE',
    };

    try {
      console.log(packet);
      const response = await axios.post(
        process.env.REACT_APP_API_URL+'/AVP/create',
        packet
      );

      if (response.data.success) {
        setAlertType('success');
        setAlertMessage('AVP created successfully!');

        // Reset form data after submission
        setFormData({
          avpNumber: '',
          vehicleNumber: '',
          vehicleType: '',
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
      } else {
        navigate('/admin/home/issue/avp');
        setAlertMessage('Failed to create AVP: ' + response.data.message);
        setAlertType('failure');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setAlertMessage(
        '' + (error.response?.data.message || 'An error occurred')
      );
      setAlertType('failure');
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
                  value={formData.avpNumber}
                  onChange={handleChange}
                  autoComplete="off" // Added autocomplete
                />
              </div>
              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="vehicleNumber"
                  placeholder="Enter vehicle number"
                  required
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  autoComplete="off" // Added autocomplete
                />
              </div>
              <div className="col-md-4 mb-3">
                <select
                  name="vehicleType"
                  className="form-control"
                  required
                  value={formData.vehicleType}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select{' '}
                  </option>
                  <option value="Two Wheeler">Two - Wheeler</option>
                  <option value="Four Wheeler">Four - Wheeler</option>
                  <option value="Heavy Vehicle">Heavy - Vehicle</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <div className="form-control">
                  <label>Enter renewal date:</label>
                  <input
                    type="date"
                    className="form-control"
                    name="renewalDate"
                    required
                    value={formData.renewalDate}
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
                    value={formData.expiryDate}
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
                  value={formData.authorizedBy}
                  onChange={handleChange}
                  autoComplete="off" // Added autocomplete
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="off" // Added autocomplete
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="designation"
                  placeholder="Designation"
                  required
                  value={formData.designation}
                  onChange={handleChange}
                  autoComplete="off" // Added autocomplete
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="organization"
                  placeholder="Organization"
                  required
                  value={formData.organization}
                  onChange={handleChange}
                  autoComplete="off" // Added autocomplete
                />
              </div>
              <div className="col-md-12 mb-3">
                <textarea
                  className="form-control"
                  name="validAreas"
                  rows="3"
                  placeholder="Enter valid areas"
                  value={formData.validAreas}
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
                  value={formData.violation}
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

          {/* Alert rendering */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%,-50%)',
            }}
          >
            {alertType === 'success' && <SuccessAlert message={alertMessage} />}
            {alertType === 'failure' && <FailureAlert message={alertMessage} />}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default IssueContentAVP;
