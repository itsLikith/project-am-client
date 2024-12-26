import React, { useState } from 'react';
import { CircleOff } from 'lucide-react';
import axios from 'axios';

const BlockContent = () => {
  const [selected, setSelected] = useState('');
  const [ID, setID] = useState('');

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  const packet = {
    selected,
    ID,
  };

  const handleSubmit = async () => {
    let backend_url = 'https://accessmatrix.vercel.app/api/';
    let newPacket;
    switch (selected) {
      case 'adp':
        backend_url += 'adp/block/' + ID;
        break;
      case 'avp':
        backend_url += 'avp/block/' + ID;
        break;
      case 'aep':
        backend_url += 'admin/aep/block/' + ID;
        break;
      default:
        break;
    }
    const response = await axios.get(backend_url);
    console.log(response.data);
  };

  return (
    <div className="block-content">
      <select
        name="drop"
        id=""
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
      {selected === 'adp' ? (
        <>
          <input
            type="text"
            className="form-control col-md-12 mt-5"
            placeholder="Enter ADP ID"
            value={ID}
            onChange={(e) => setID(e.target.value)}
          />
          <span className="d-flex justify-content-center mt-3">
            <button
              className="btn btn-danger d-flex align-items-center gap-1"
              onClick={handleSubmit}
            >
              Block <CircleOff size={18} />
            </button>
          </span>
        </>
      ) : selected === 'avp' ? (
        <>
          <input
            type="text"
            className="form-control col-md-12 mt-5"
            placeholder="Enter AVP ID"
            value={ID}
            onChange={(e) => setID(e.target.value)}
          />
          <span className="d-flex justify-content-center mt-3">
            <button
              className="btn btn-danger d-flex align-items-center gap-1"
              onClick={handleSubmit}
            >
              Block <CircleOff size={18} />
            </button>
          </span>
        </>
      ) : selected === 'aep' ? (
        <>
          <input
            type="text"
            className="form-control col-md-12 mt-5"
            placeholder="Enter AEP ID"
            value={ID}
            onChange={(e) => setID(e.target.value)}
          />
          <span className="d-flex justify-content-center mt-3">
            <button
              className="btn btn-danger d-flex align-items-center gap-1"
              onClick={handleSubmit}
            >
              Block <CircleOff size={18} />
            </button>
          </span>
        </>
      ) : null}
    </div>
  );
};

export default BlockContent;
