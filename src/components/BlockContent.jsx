import React, { useState } from 'react';
import { CircleOff } from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie';

const BlockContent = () => {
  const [selected, setSelected] = useState('');
  const [ID, setID] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null); // State for error handling

  const handleChange = (event) => {
    setSelected(event.target.value);
    setID(''); // Reset ID when type changes
    setError(null); // Reset error on type change
  };

  const handleSubmit = async () => {
    if (!ID) {
      setError('Please enter an ID.'); // Error if ID is not entered
      return;
    }

    let backend_url = process.env.REACT_APP_API_URL;
    switch (selected) {
      case 'adp':
        backend_url += '/adp/block/' + ID;
        break;
      case 'avp':
        backend_url += '/avp/block/' + ID;
        break;
      case 'aep':
        backend_url += '/admin/aep/block/' + ID;
        break;
      default:
        return; // No valid type selected
    }

    try {
      const response = await axios.get(backend_url, {
        headers: {
          authorization: Cookies.get('accessToken')
            ? `Bearer ${Cookies.get('accessToken')}`
            : '',
          sessionData: Cookies.get(''),
        },
      });
      console.log(response.data);
      if (response.data.success) {
        setMessage(response.data.message);
        setError(null); // Clear error on success
      } else {
        setMessage(`Failed to block ${selected.toUpperCase()}`);
        setError(null); // Clear error on failure
      }
    } catch (error) {
      setMessage(error.message); // Set error message
      console.error(error);
    }
  };

  return (
    <div className="block-content">
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
      {selected && (
        <>
          <input
            type="text"
            className="form-control col-md-12 mt-5"
            placeholder={`Enter ${selected.toUpperCase()} ID`}
            value={ID}
            onChange={(e) => setID(e.target.value)}
          />
          <p className="text-warning text-center mt-2">{message}</p>
          {error && <div className="text-danger mt-2">{error}</div>}{' '}
          {/* Display error message */}
          <span className="d-flex justify-content-center mt-3">
            <button
              className="btn btn-danger d-flex align-items-center gap-1"
              onClick={handleSubmit}
            >
              Block <CircleOff size={18} />
            </button>
          </span>
        </>
      )}
    </div>
  );
};

export default BlockContent;
