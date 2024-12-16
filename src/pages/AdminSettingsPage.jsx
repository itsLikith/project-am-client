import { useState } from 'react';
import { Link } from 'react-router-dom';
import SettingsRadio from '../components/Radio';
import '../styles/AdminSettings.css';
import { ArrowBigLeft } from 'lucide-react';
import SettingsRenewal from '../components/SettingsRenewal';

const AdminSettings = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
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
          <SettingsRadio selected="generateQR" />
        ) : selectedOption === 'authorize' ? (
          <SettingsRadio selected="authorise" />
        ) : null}
      </p>
      <SettingsRenewal />
    </div>
  );
};

export default AdminSettings;
