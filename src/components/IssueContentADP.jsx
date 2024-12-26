import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';
import SuccessAlert from './SuccessAlert';

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
  const [isPopupOpen, setPopupOpen] = useState(false); // State for popup
  const [popupMessage, setPopupMessage] = useState(''); // State for popup message

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
      status: 'Active',
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
        setPopupMessage('ADP created successfully!'); // Set success message
        setPopupOpen(true); // Open popup
        // Reset form data after submission
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
        }, 2000); // Navigate after 2 seconds
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setPopupMessage('Error submitting form. Please try again.'); // Set error message
      setPopupOpen(true); // Open popup
    }
  };

  return (
    <div>
      {props.selected === 'adp' ? (
        <>
          <h6 className="text-info">Issue ADP</h6>
          <form className="container-fluid p-4" onSubmit={handleSubmit}>
            {/* Form fields remain unchanged */}
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
      {/* Popup Component */}
      {isPopupOpen && <SuccessAlert message="ADP created successfully" />}
    </div>
  );
};

export default IssueContentADP;
