import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/HomePage.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CircleMinus, CircleCheck } from 'lucide-react';

const HomePage = () => {
  const [aepStatus, setAepStatus] = useState(false);
  const [adpStatus, setAdpStatus] = useState(false);
  const [avpStatus, setAvpStatus] = useState(false);

  const [aepBgColor, setaepBgColor] = useState('bg-primary');
  const [adpBgColor, setadpBgColor] = useState('bg-primary');
  const [avpBgColor, setavpBgColor] = useState('bg-primary');

  return (
    <div className="home-page bg-dark p-3">
      <div className="status-container d-flex">
        <div className={aepBgColor} id="forAep">
          <p className="text-light text-center">
            <b>AEP/ADP Status</b>
          </p>
        </div>
        <div className={avpBgColor} id="forAvp">
          <p className="text-light text-center">
            <b>AVP Status</b>
          </p>
        </div>
      </div>
      <div className="p-5">
        <table className="table text-light">
          <tbody>
            <tr>
              <td className="p-3" style={{ width: '20px', height: '30px' }}>
                AEP
              </td>
              <td className="text-end">
                <span style={{ fontSize: '40px' }}>😡</span>
              </td>
            </tr>
            <tr>
              <td className="p-3" style={{ width: '20px', height: '30px' }}>
                AVP
              </td>
              <td className="text-end">
                <span style={{ fontSize: '40px' }}>😡</span>
              </td>
            </tr>
            <tr>
              <td className="p-3" style={{ width: '20px', height: '30px' }}>
                ADP
              </td>
              <td className="text-end">
                <span style={{ fontSize: '40px' }}>😡</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="action-box d-flex p-5 justify-content-center">
        <button className="btn btn-warning m-3 d-flex align-items-center gap-1">
          AVP Not Available
          <svg
            width="18"
            height="18"
            fill="currentColor"
            className="bi bi-dash-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1z" />
            <path d="M4.5 8a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
          </svg>
        </button>
        <button className="btn btn-success m-3 d-flex align-items-center gap-1">
          Proceed
          <svg
            width="18"
            height="18"
            fill="currentColor"
            className="bi bi-check-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1z" />
            <path
              fillRule="evenodd"
              d="M10.97 5.97a.75.75 0 0 1 0 1.06L7.5 10.5 5.53 8.53a.75.75 0 1 1 1.06-1.06L7.5 8.44l3.47-3.47a.75.75 0 0 1 1.06 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
