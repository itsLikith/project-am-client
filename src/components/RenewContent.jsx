import React, { useState } from 'react';
import { Save } from 'lucide-react';

const RenewContent = () => {
  const [selected, setSelected] = useState('');

  const handleChange = (event) => {
    setSelected(event.target.value);
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
          />
          <div className="row">
            <div className="col-md-6 mt-2">
              <label htmlFor="">From:</label>
              <input type="date" className="form-control" />
            </div>
            <div className="col-md-6 mt-2">
              <label htmlFor="">To:</label>
              <input type="date" className="form-control" />
            </div>
          </div>
          <span className="d-flex justify-content-center mt-4">
            <button className="btn btn-success d-flex align-items-center gap-1 justify-content-center">
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
          />
          <div className="row">
            <div className="col-md-6 mt-2">
              <label htmlFor="">From:</label>
              <input type="date" className="form-control" />
            </div>
            <div className="col-md-6 mt-2">
              <label htmlFor="">To:</label>
              <input type="date" className="form-control" />
            </div>
          </div>
          <span className="d-flex justify-content-center mt-4">
            <button className="btn btn-success d-flex align-items-center gap-1 justify-content-center">
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
          />
          <div className="row">
            <div className="col-md-6 mt-2">
              <label htmlFor="">From:</label>
              <input type="date" className="form-control" />
            </div>
            <div className="col-md-6 mt-2">
              <label htmlFor="">To:</label>
              <input type="date" className="form-control" />
            </div>
          </div>
          <span className="d-flex justify-content-center mt-4">
            <button className="btn btn-success d-flex align-items-center gap-1 justify-content-center">
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
