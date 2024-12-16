import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SettingsRadio from '../components/SettingsRadio';
import '../styles/AdminSettings.css';
import { ArrowBigLeft } from 'lucide-react';

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
          <p className="h6 text-info">Renew</p>
        </>
      ) : props.selected === 'authorize' && props.task === 'block' ? (
        <>
          <p className="h6 text-info">Block</p>
        </>
      ) : props.selected === 'generateQR' && props.task === 'aep' ? (
        <>
          <p className="h6 text-info">Generate QR for AEP</p>
        </>
      ) : props.selected === 'generateQR' && props.task === 'avp' ? (
        <>
          <p className="h6 text-info">Generate QR for AVP</p>
        </>
      ) : props.selected === 'generateQR' && props.task === 'adp' ? (
        <>
          <p className="h6 text-info">Generate QR for ADP</p>
        </>
      ) : props.selected === '' && props.task === '' ? null : null}
    </div>
  );
};

export default AdminSettings;
