import { useState } from 'react';

const SettingsRenewal = (props) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="settings-renewal bg-dark">
      {props.task === 'renew' ? (
        <form>
          <select
            name="renewalOptions"
            id="renewalOptions"
            value={selectedOption}
            onChange={handleSelectChange}
            className="form-control mb-3 "
          >
            <option value="" disabled>
              Select a renewal option
            </option>
            <option value="option1">AEP</option>
            <option value="option2">ADP</option>
            <option value="option3">AVP</option>
          </select>

          <div className="row">
            <div className="col-md-4">
              {selectedOption === 'option1' && <div>You selected AEP</div>}
              {selectedOption === 'option2' && <div>You selected ADP</div>}
              {selectedOption === 'option3' && <div>You selected AVP</div>}
            </div>
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default SettingsRenewal;
