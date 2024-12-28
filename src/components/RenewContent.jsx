import React, { useState } from 'react';
import { Save } from 'lucide-react';
import axios from 'axios';
import SuccessAlert from './SuccessAlert'; // Import SuccessAlert component
import FailureAlert from './FailureAlert'; // Import FailureAlert component
import Cookies from 'js-cookie';
const RenewContent = () => {
  const [selected, setSelected] = useState('');
  const [id, setID] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  // Alert state variables
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  const packet = {
    type: selected,
    id,
    from,
    to,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(packet);
    let backend_url = process.env.REACT_APP_API_URL;
    let newPacket;

    switch (packet.type) {
      case 'adp':
        backend_url += '/adp/renew/' + packet.id;
        newPacket = {
          ...(packet.from && { DateofIssue: packet.from }),
          ...(packet.to && { ADPValidity: packet.to }),
        };
        break;
      case 'avp':
        backend_url += '/avp/renew/' + packet.id;
        newPacket = {
          ...(packet.from && { DateofIssue: packet.from }),
          ...(packet.to && { AVPValidity: packet.to }),
        };
        break;
      case 'aep':
        backend_url += '/admin/aep/renew/' + packet.id;
        newPacket = {
          ...(packet.from && { DateofIssue: packet.from }),
          ...(packet.to && { DateofExpiry: packet.to }),
        };
        break;
      default:
        return;
    }

    try {
      const response = await axios.post(backend_url, newPacket, {
        headers: {
          authorization: Cookies.get('accessToken')
            ? `Bearer ${Cookies.get('accessToken')}`
            : '',
          sessionData: Cookies.get(''),
        },
      });
      console.log(response.data);

      if (response.data.success) {
        setAlertType('success');
        setAlertMessage('Renewal successful!');
      } else {
        setAlertType('failure');
        setAlertMessage('Failed to renew: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setAlertMessage(
        'Error occurred: ' +
          (error.response?.data.message || 'An error occurred')
      );
      setAlertType('failure');
    }
  };

  return (
    <div className="renew-content">
      {alertType === 'success' && <SuccessAlert message={alertMessage} />}
      {alertType === 'failure' && <FailureAlert message={alertMessage} />}

      <select
        name="drop"
        className="form-control mt-3"
        onChange={handleChange}
        value={selected}
      >
        <option value="" disabled>
          Select type
        </option>
        <option value="adp">ADP</option>
        <option value="avp">AVP</option>
        <option value="aep">AEP</option>
      </select>

      {selected === 'adp' && (
        <>
          <input
            type="text"
            className="form-control col-md-12 mt-5"
            placeholder="Enter ADP ID"
            onChange={(e) => setID(e.target.value)}
          />
          <div className="row">
            <div className="col-md-6 mt-2">
              <label htmlFor="">From:</label>
              <input
                type="date"
                className="form-control"
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
            <div className="col-md-6 mt-2">
              <label htmlFor="">To:</label>
              <input
                type="date"
                className="form-control"
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
          </div>
          <span className="d-flex justify-content-center mt-4">
            <button
              className="btn btn-success d-flex align-items-center gap-1 justify-content-center"
              onClick={handleSubmit}
            >
              Save
              <Save size={18} />
            </button>
          </span>
        </>
      )}
      {selected === 'avp' && (
        <>
          <input
            type="text"
            className="form-control col-md-12 mt-5"
            placeholder="Enter AVP ID"
            onChange={(e) => setID(e.target.value)}
          />
          <div className="row">
            <div className="col-md-6 mt-2">
              <label htmlFor="">From:</label>
              <input
                type="date"
                className="form-control"
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
            <div className="col-md-6 mt-2">
              <label htmlFor="">To:</label>
              <input
                type="date"
                className="form-control"
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
          </div>
          <span className="d-flex justify-content-center mt-4">
            <button
              className="btn btn-success d-flex align-items-center gap-1 justify-content-center"
              onClick={handleSubmit}
            >
              Save
              <Save size={18} />
            </button>
          </span>
        </>
      )}
      {selected === 'aep' && (
        <>
          <input
            type="text"
            className="form-control col-md-12 mt-5"
            placeholder="Enter AEP ID"
            onChange={(e) => setID(e.target.value)}
          />
          <div className="row">
            <div className="col-md-6 mt-2">
              <label htmlFor="">From:</label>
              <input
                type="date"
                className="form-control"
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
            <div className="col-md-6 mt-2">
              <label htmlFor="">To:</label>
              <input
                type="date"
                className="form-control"
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
          </div>
          <span className="d-flex justify-content-center mt-4">
            <button
              className="btn btn-success d-flex align-items-center gap-1 justify-content-center"
              onClick={handleSubmit}
            >
              Save
              <Save size={18} />
            </button>
          </span>
        </>
      )}
    </div>
  );
};

export default RenewContent;
