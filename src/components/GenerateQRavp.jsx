import React, { useRef, useState } from 'react';
import { ArrowDownToLine, Layers2 } from 'lucide-react';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import Cookies from 'js-cookie';

const GenerateQrAVP = () => {
  const [avpId, setAvpId] = useState('');
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [message, setMessage] = useState('');
  const qrCodeRef = useRef();

  const handleInputChange = (event) => {
    setAvpId(event.target.value);
  };

  const handleGenerateClick = async () => {
    setMessage(''); // Reset message on new generation
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/AVP/${avpId}`, {
          headers: {
              "authorization": Cookies.get('accessToken') ? `Bearer ${Cookies.get('accessToken')}` : "",
              "sessionData": Cookies.get('')
          }
      }// Replace with your actual endpoint
      );

      console.log('API Response:', response.data);

      if (
        !response.data.data ||
        !response.data.data.AVP ||
        !response.data.success
      ) {
        setMessage('AVP does not exist!');
        return; // Exit if AVP does not exist
      }

      const id = response.data.data.AVP._id;
      const encoded = await axios.get(
        `${process.env.REACT_APP_API_URL}/utils/create/${id}` // Replace with your actual endpoint
      );

      const avp = encoded.data.data.code;
      if (!avp) {
        throw new Error('Encoded data code is not available.');
      }
      const finalPacket = {
        data: {
          ...(avp && { avp }),
        },
      };
      setQrCodeValue(JSON.stringify(finalPacket)); // Set the QR code value to the full URL
    } catch (error) {
      console.error('Error generating QR code:', error.message);
      setMessage(
        'An error occurred while generating the QR code. The AVP might not exist.'
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

      const link = document.createElement('a');
      const fileName = `${avpId}.png`;
      link.href = pngUrl;
      link.download = fileName;
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
            placeholder="Enter AVP ID"
            className="form-control"
            value={avpId}
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

export default GenerateQrAVP;
