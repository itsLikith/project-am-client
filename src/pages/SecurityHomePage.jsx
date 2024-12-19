import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/HomePage.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {CircleMinus,CircleCheck} from "lucide-react";

const HomePage = () => {
  const [aepStatus, setAepStatus] = useState(false);
  const [adpStatus, setAdpStatus] = useState(false);
  const [avpStatus, setAvpStatus] = useState(false);

  const [aepBgColor, setaepBgColor] = useState('bg-primary');
  const [adpBgColor, setadpBgColor] = useState('bg-primary');
  const [avpBgColor, setavpBgcolor] = useState('bg-primary');

  return (
    <div className="home-page bg-dark">
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
      <div className="action-box d-flex p-5 justify-content-center">
        <button className="btn btn-warning m-3 d-flex align-items-center gap-1">AVP Not Available<CircleMinus size={18} /></button>
        <button className="btn btn-success m-3 d-flex align-items-center gap-1">Proceed<CircleCheck size={18} /></button>
      </div>
    </div>
  );
};

export default HomePage;
