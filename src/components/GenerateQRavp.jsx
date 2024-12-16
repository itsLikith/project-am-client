import React, { useState } from 'react';

const GenerateQrAVP = () => {
  const [avpId, setavpId] = useState('');

  const handleInputChange = (event) => {
    setavpId(event.target.value);
  };

  const handleGenerateClick = () => {
    console.log('Generating QR for ID:', avpId);
  };

  return (
    <>
      <div className="row d-flex align-items-center">
        <div className="col-md-10 mt-3">
          <input
            type="text"
            placeholder="Enter AVP ID"
            className="form-control"
            value={avpId}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-2 mt-3">
          <button
            className="btn btn-success w-100 p-2"
            onClick={handleGenerateClick}
          >
            Generate
          </button>
        </div>
      </div>
      <div className='m-5 d-flex align-items-center justify-content-center'>
        <img src="" alt="QR Code" className='border border-1 rounded' />
      </div>
      <span className='d-flex justify-content-center'><button className='btn btn-warning'>Download</button></span>
    </>
  );
};

export default GenerateQrAVP;
