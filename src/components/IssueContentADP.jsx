import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';

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
      AuthorizedBy: formData.authorizedBy, // Use the value from formData
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
        alert('ADP created');
        navigate('/admin/home/issue/adp');
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
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.'); // User feedback on error
    }
  };

  return (
    <div>
      {props.selected === 'adp' ? (
        <>
          <span className="h6 text-info">Issue ADP</span>
          <br />
          <form className="container-fluid p-4" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
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
              <div className="col-md-6 mb-3">
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
              <div className="row">
                <div className="col-md-12 mb-3">
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
                  <div className="form-control">
                    <label htmlFor="">Enter renewal date: </label>
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
                <div className="col-md-6 mb-3">
                  <div className="form-control">
                    <label htmlFor="">Enter expiry date: </label>
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
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="authorizedBy"
                    placeholder="Enter authorized by"
                    required
                    value={formData.authorizedBy} // Bind value
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
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
            </div>
            <span className="d-flex justify-content-center mt-3">
              <button
                type="submit"
                className="btn btn-success d-flex align-items-center gap-1"
              >
                Submit<Save size={18} />
              </button>
            </span>
          </form>
        </>
      ) : null}
    </div>
  );
};

export default IssueContentADP;
