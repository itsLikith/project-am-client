import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SettingsRadio from '../components/SettingsRadio';
import '../styles/AdminSettings.css';
import { ArrowBigLeft, BadgePlus, CircleOff, QrCode } from 'lucide-react';
import RenewContent from '../components/RenewContent';
import BlockContent from '../components/BlockContent';
import GenerateQrAEP from '../components/GenerateQRaep';
import GenerateQrAVP from '../components/GenerateQRavp';

const AdminSettings = (props) => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    navigate('/admin/settings');
  };

  return (
    <div className="admin-settings bg-dark text-light p-4">
      <span className="h5 text-danger d-flex align-items-center">
        <Link to="/admin/home">
          <ArrowBigLeft size={25} />
        </Link>{' '}
        Admin Settings
      </span>
      <select
        name="task"
        id="task"
        className="form-control mt-3"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option value="" disabled>
          Select task:
        </option>
        <option value="authorize">Authorize</option>
        <option value="generateQR">Generate QR</option>
      </select>
      <p className="d-flex justify-content-center mt-3">
        {selectedOption === 'generateQR' ? (
          <>
            <SettingsRadio selected="generateQR" />
          </>
        ) : selectedOption === 'authorize' ? (
          <>
            <SettingsRadio selected="authorize" task="renew" />
          </>
        ) : null}
      </p>
      {props.selected === 'authorize' && props.task === 'renew' ? (
        <>
          <p className="h6 text-info d-flex align-items-center gap-1">
            Renew
            <BadgePlus size={18} />
          </p>
          <RenewContent />
        </>
      ) : props.selected === 'authorize' && props.task === 'block' ? (
        <>
          <p className="h6 text-info d-flex align-items-center gap-1">
            Block
            <CircleOff size={18} />
          </p>
          <BlockContent />
        </>
      ) : props.selected === 'generateQR' && props.task === 'aep' ? (
        <>
          <p className="h6 text-info d-flex align-items-center gap-1">
            Generate QR for AEP/ADP
            <QrCode size={18} />
          </p>
          <GenerateQrAEP />
        </>
      ) : props.selected === 'generateQR' && props.task === 'avp' ? (
        <>
          <p className="h6 text-info d-flex align-items-center gap-1">
            Generate QR for AVP
            <QrCode size={18} />
          </p>
          <GenerateQrAVP />
        </>
      ) : null}
    </div>
  );
};

export default AdminSettings;
