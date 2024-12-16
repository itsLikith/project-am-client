import React, { useState } from 'react';

const BlockContent = () => {
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
          <span className="d-flex justify-content-center mt-5">
            <input type="submit" value="Block" className="btn btn-danger" />
          </span>
        </>
      ) : selected === 'avp' ? (
        <>
          <input
            type="text"
            className="form-control col-md-12 mt-5"
            placeholder="Enter AVP ID"
          />
          <span className="d-flex justify-content-center mt-5">
            <input type="submit" value="Block" className="btn btn-danger" />
          </span>
        </>
      ) : selected === 'aep' ? (
        <>
          <input
            type="text"
            className="form-control col-md-12 mt-5"
            placeholder="Enter AEP ID"
          />
          <span className="d-flex justify-content-center mt-5">
            <input type="submit" value="Block" className="btn btn-danger" />
          </span>
        </>
      ) : null}
    </div>
  );
};

export default BlockContent;
