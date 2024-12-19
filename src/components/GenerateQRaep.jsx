import React, { useState, useRef } from 'react';
import { Layers2, ArrowDownToLine } from 'lucide-react';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';

const GenerateQrAEP = () => {
  const [adpAepId, setAdpAepId] = useState('');
  const [qrCodeValue, setQrCodeValue] = useState(''); // State to hold QR code data
  const [message, setMessage] = useState('');
  const qrCodeRef = useRef(); // Ref to access the QR code element

  const handleInputChange = (event) => {
    setAdpAepId(event.target.value);
  };

  const handleGenerateClick = async () => {
    setMessage(''); // Reset message on new generation
    try {
      const response = await axios.get(
        'https://accessmatrix.vercel.app/api/admin/AEP/' + adpAepId
      );

      // Log the entire response to inspect its structure
      console.log('API Response:', response.data);

      // Check if AEP exists in the response
      if (
        !response.data.data ||
        !response.data.data.AEP ||
        !response.data.success
      ) {
        setMessage('AEP does not exist!');
        return; // Exit if AEP does not exist
      }

      const id = response.data.data.AEP._id;
      const encoded = await axios.get(
        'https://accessmatrix.vercel.app/api/utils/create/' + id
      );

      // Ensure the code is retrieved correctly
      const code = encoded.data.data.code;
      if (!code) {
        throw new Error('Encoded data code is not available.');
      }

      // Construct the full URL for the QR code
      const qrInput = `https://accessmatrix.vercel.app/api/utils/verify/${code}`;
      setQrCodeValue(qrInput); // Set the QR code value to the full URL
      console.log('QR Code URL:', qrInput);
    } catch (error) {
      console.error('Error generating QR code:', error.message);
      setMessage(
        'An error occurred while generating the QR code. The AEP might not be existing'
      );
    }
  };

  const handleDownloadClick = () => {
    const canvas = document.createElement('canvas');
    const svg = qrCodeRef.current.querySelector('svg');
    if (!svg) {
      setMessage('No QR code available for download.');
      return; // Exit if no QR code is available
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();

    // Convert SVG to Data URL
    const svgBlob = new Blob([svgData], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const pngUrl = canvas.toDataURL('image/png');

      // Create a link to download the image
      const link = document.createElement('a');
      link.href = pngUrl;
      link.download = 'qr_code.png';
      link.click();

      // Clean up
      URL.revokeObjectURL(url);
    };

    img.src = url;
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
      <div
        className="m-5 d-flex align-items-center justify-content-center"
        ref={qrCodeRef}
      >
        {qrCodeValue && (
          <QRCodeSVG value={qrCodeValue} size={256} marginSize={6} /> // Display QR code
        )}
      </div>
      <p className="text-center text-warning">{message}</p>
      <span className="d-flex justify-content-center">
        <button
          className="btn btn-warning d-flex align-items-center gap-1 justify-content-center"
          onClick={handleDownloadClick}
        >
          Download <ArrowDownToLine size={18} />
        </button>
      </span>
    </>
  );
};

export default GenerateQrAEP;
