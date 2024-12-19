import React, { useState } from 'react';
import { Layers2, ArrowDownToLine } from 'lucide-react';

const GenerateQrAEP = () => {
  const [adpAepId, setAdpAepId] = useState('');

  const handleInputChange = (event) => {
    setAdpAepId(event.target.value);
  };

  const handleGenerateClick = () => {
    console.log('Generating QR for ID:', adpAepId);
  };

  return (
    <>
      <div className="row d-flex align-items-center">
        <div className="col-md-10 mt-3">
          <input
            type="text"
            placeholder="Enter ADP/AEP ID"
            className="form-control"
            value={adpAepId}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-2 mt-3">
          <button
            className="btn btn-success w-100 p-2 d-flex align-items-center gap-1 justify-content-center"
            onClick={handleGenerateClick}
          >
            Generate
            <Layers2 size={20} />
          </button>
        </div>
      </div>
      <div className="m-5 d-flex align-items-center justify-content-center">
        <img src="" alt="QR Code" className="border border-1 rounded" />
      </div>
      <span className="d-flex justify-content-center">
        <button className="btn btn-warning d-flex align-items-center gap-1 justify-content-center">
          Download <ArrowDownToLine size={18} />
        </button>
      </span>
    </>
  );
};

export default GenerateQrAEP;
