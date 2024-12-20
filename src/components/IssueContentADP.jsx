import { useState } from 'react';
import axios from 'axios';
import { Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IssueContentADP = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    adpNumber: '',
    vehicleType: '',
    aepNumber: '',
    aeprenewaldate: '',
    aepexpirydate: '',
    aepareas: '',
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

    const packet = {
      ADPId: formData.adpNumber,
      ADPValidity: formData.aepexpirydate,
      DateofIssue: formData.aeprenewaldate,
      AuthorizedBy: 'Raghu Ram',
      Name: 'Mayank',
      Designation: 'CTO',
      Organization: 'AAI',
      Violation: ['Init'], // Adjust this as needed based on your requirements
      AEPId: formData.aepNumber,
      status: 'Active',
      VehicleType: formData.vehicleType, // Include vehicleType
      ValidAreas: formData.aepareas, // Include aepareas
    };

    console.log('Entered Data:', packet);

    try {
      const response = await axios.post(
        'https://accessmatrix.vercel.app/api/ADP/',
        packet
      );
      console.log(response.data);
      if (response.data.success) {
        navigate('/admin/home/issue/adp');
        alert('ADP created');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
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
                  value={formData.adpNumber} // Bind value
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
                  value={formData.vehicleType} // Bind value
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
                    value={formData.aepNumber} // Bind value
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
                      value={formData.aeprenewaldate} // Bind value
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
                      value={formData.aepexpirydate} // Bind value
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <textarea
                    className="form-control"
                    name="aepareas"
                    rows="3"
                    placeholder="Enter valid areas"
                    value={formData.aepareas} // Bind value
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>
            <span className="d-flex justify-content-center mt-3">
              <button
                type="submit" // Change to type="submit"
                className="btn btn-success d-flex align-items-center gap-1"
              >
                Save <Save size={18} />
              </button>
            </span>
          </form>
        </>
      ) : null}
    </div>
  );
};

export default IssueContentADP;
