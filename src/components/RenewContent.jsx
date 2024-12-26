import React, { useState } from 'react';
import { Save } from 'lucide-react';
import axios from 'axios';
const RenewContent = () => {
  const [selected, setSelected] = useState('');

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  const [id, setID] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const packet = {
    type: selected,
    id,
    from,
    to,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(packet);
    let backend_url = 'https://accessmatrix.vercel.app/api/';
    let newPacket;
    switch (packet.type) {
      case 'adp':
        backend_url += 'adp/renew/' + packet.id;
        newPacket = {
          ...(packet.from && { DateofIssue: packet.from }),
          ...(packet.to && { ADPValidity: packet.to }),
        };
        break;
      case 'avp':
        backend_url += 'avp/renew/' + packet.id;
        newPacket = {
          ...(packet.from && { DateofIssue: packet.from }),
          ...(packet.to && { AVPValidity: packet.to }),
        };
        break;
      case 'aep':
        backend_url += 'admin/aep/renew/' + packet.id;
        newPacket = {
          ...(packet.from && { DateofIssue: packet.from }),
          ...(packet.to && { DateofExpiry: packet.to }),
        };
        break;
      default:
    }

    const response = await axios.post(backend_url, newPacket);
    console.log(response.data);
  };

  return (
    <div className="renew-content">
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
      ) : selected === 'avp' ? (
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
      ) : selected === 'aep' ? (
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
      ) : null}
    </div>
  );
};

export default RenewContent;
