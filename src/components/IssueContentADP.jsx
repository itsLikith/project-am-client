import { useState } from 'react';
import axios from 'axios';

const IssueContentADP = (props) => {
  const [formData, setFormData] = useState({
    adpNumber: '',
    vehicleType: '',
    aepNumber: '',
    aeprenewaldate: '',
    aepexpirydate: '',
    aepareas: '',
  });

  // "ADPId": "adp3742934823",
  // "DateofIssue": "2024-11-10",
  // "ADPValidity": "2025-11-10",
  // "AuthorizedBy": "Raghuvaran",
  // "Name": "Laxman Singh",
  // "Designation": "Maintenance Incharge",
  // "Organization": "AAI",
  // "Violation": ["Policy breach", "Unauthorized entry"],
  // "AEPId": "6730615c62b6417e2eb9074d",
  // "status": "Active"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const packet = {
    ADPId: formData.adpNumber,
    ADPValidity: formData.aepexpirydate,
    DateofIssue: formData.aeprenewaldate,
    AuthorizedBy: 'Raghu Ram',
    Name: 'Mayank',
    Designation: 'CTO',
    Organization: 'AAI',
    Violation: ['Init'],
    AEPId: formData.aepNumber,
    status: 'Active',
  };

  console.log(packet);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log('Entered Data:', formData);
    const response = await axios.post(
      'https://accessmatrix.vercel.app/api/ADP/',
      packet
    );
    console.log(response.data);
  };

  return (
    <div>
      {props.selected === 'adp' ? (
        <>
          <span className="h6 text-info">Issue ADP</span>
          <br />
          <form onSubmit={handleSubmit} className="container-fluid p-4">
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="adpNumber"
                  placeholder="Enter ADP number"
                  required
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
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>
            <p className="mt-3 text-center">
              <input type="submit" className="btn btn-success" />
            </p>
          </form>
        </>
      ) : null}
    </div>
  );
};

export default IssueContentADP;
