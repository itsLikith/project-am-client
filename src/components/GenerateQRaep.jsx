import React, { useState, useRef } from 'react';
import { Layers2, ArrowDownToLine } from 'lucide-react';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import Cookies from 'js-cookie';

const GenerateQrAEP = () => {
  const [adpAepId, setAdpAepId] = useState('');
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [message, setMessage] = useState('');
  const qrCodeRef = useRef();

  const handleInputChange = (event) => {
    setAdpAepId(event.target.value);
  };

  const handleGenerateClick = async () => {
    setMessage('');
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + '/admin/AEP/getADPs/' + adpAepId,{
          headers: {
              "authorization": Cookies.get('accessToken') ? `Bearer ${Cookies.get('accessToken')}` : "",
              "sessionData": Cookies.get('')
          }
      }
      );
      if (
        !response.data.data ||
        !response.data.data.AEPs[0]?.AEPId ||
        !response.data.success
      ) {
        const message = response.data.message || 'AEP does not exist!';
        console.log(message);
        throw new Error(message);
        return;
      }

      const adp = response.data.data.AEPs[0]?.ADP[0]?._id;
      const aep = response.data.data?.AEPs[0]?._id;
      const QRtemp = {
        data: {
          ...(aep && { aep }),
          ...(adp && { adp }),
        },
      };

      if (QRtemp.data.aep) {
        const encoded = await axios.get(
          process.env.REACT_APP_API_URL + '/utils/create/' + QRtemp.data.aep
        );
        QRtemp.data.aep = encoded.data.data.code;
      }
      if (QRtemp.data.adp) {
        const encoded = await axios.get(
          process.env.REACT_APP_API_URL + '/utils/create/' + QRtemp.data.adp,{
            headers: {
                "authorization": Cookies.get('accessToken') ? `Bearer ${Cookies.get('accessToken')}` : "",
                "sessionData": Cookies.get('')
            }
        }
        );
        QRtemp.data.adp = encoded.data.data.code;
      }
      setQrCodeValue(JSON.stringify(QRtemp));
    } catch (error) {
      const message =
        error.response.data.message ||
        'An error occurred while generating the QR code. The AEP might not be existing';

      setMessage(message);
    }
  };

  const handleDownloadClick = () => {
    const canvas = document.createElement('canvas');
    const svg = qrCodeRef.current.querySelector('svg');
    if (!svg) {
      setMessage('No QR code available for download.');
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
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
      const fileName = `${adpAepId}.png`;
      link.href = pngUrl;
      link.download = fileName;
      link.click();

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
          <QRCodeSVG value={qrCodeValue} size={256} marginSize={6} />
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
