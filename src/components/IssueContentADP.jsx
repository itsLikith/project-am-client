import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';
import SuccessAlert from './SuccessAlert';
import FailureAlert from './FailureAlert';

const IssueContentADP = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    adpNumber: '',
    vehicleType: '',
    aepNumber: '',
    aeprenewaldate: '',
    aepexpirydate: '',
    aepareas: '',
    authorizedBy: '',
  });
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
    e.preventDefault();

    const packet = {
      ADPId: formData.adpNumber,
      ADPValidity: formData.aepexpirydate,
      DateofIssue: formData.aeprenewaldate,
      AuthorizedBy: formData.authorizedBy,
      Name: 'Mayank',
      Designation: 'CTO',
      Organization: 'AAI',
      Violation: ['Init'],
      AEPId: formData.aepNumber,
      status: 'ACTIVE',
      VehicleType: formData.vehicleType,
      ValidAreas: formData.aepareas,
    };

    console.log('Entered Data:', packet);

    try {
      const response = await axios.post(
        'https://accessmatrix.vercel.app/api/ADP/',
        packet
      );
      console.log(response.data);
      if (response.data.success) {
        setAlertMessage('ADP created successfully!');
        setAlertType('success');
        setFormData({
          adpNumber: '',
          vehicleType: '',
          aepNumber: '',
          aeprenewaldate: '',
          aepexpirydate: '',
          aepareas: '',
          authorizedBy: '',
        });
        setTimeout(() => {
          navigate('/admin/home/issue/adp');
        }, 2000);
      } else {
        setAlertMessage('Failed to create ADP: ' + response.data.message);
        setAlertType('failure');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response && error.response.data) {
        setAlertMessage(
          'Error: ' + error.response.data.message || 'An error occurred'
        );
      } else {
        setAlertMessage('Network error: Please try again later.');
      }
      setAlertType('failure');
    }
  };

  return (
    <div>
      {props.selected === 'adp' ? (
        <>
          <h6 className="text-info">Issue ADP</h6>
          <form className="container-fluid p-4" onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  name="adpNumber"
                  placeholder="Enter ADP number"
                  required
                  value={formData.adpNumber}
                  onChange={handleChange}
                  autoComplete="off" // Added autocomplete
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  name="vehicleType"
                  placeholder="Enter vehicle type"
                  required
                  value={formData.vehicleType}
                  onChange={handleChange}
                  autoComplete="off" // Added autocomplete
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-12">
                <input
                  type="text"
                  className="form-control"
                  name="aepNumber"
                  placeholder="Enter AEP number"
                  required
                  value={formData.aepNumber}
                  onChange={handleChange}
                  autoComplete="off" // Added autocomplete
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="form-control">
                  <label htmlFor="aeprenewaldate">Enter renewal date:</label>
                  <input
                    type="date"
                    className="form-control"
                    name="aeprenewaldate"
                    required
                    value={formData.aeprenewaldate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-control">
                  <label htmlFor="aepexpirydate">Enter expiry date:</label>
                  <input
                    type="date"
                    className="form-control"
                    name="aepexpirydate"
                    required
                    value={formData.aepexpirydate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-12">
                <input
                  type="text"
                  className="form-control"
                  name="authorizedBy"
                  placeholder="Enter authorized by"
                  required
                  value={formData.authorizedBy}
                  onChange={handleChange}
                  autoComplete="off" // Added autocomplete
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-12">
                <textarea
                  className="form-control"
                  name="aepareas"
                  rows="3"
                  placeholder="Enter valid areas"
                  value={formData.aepareas}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <button
                type="submit"
                className="btn btn-success d-flex align-items-center gap-1"
              >
                Submit
                <Save size={18} />
              </button>
            </div>
          </form>
        </>
      ) : null}
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
    </div>
  );
};

export default IssueContentADP;
