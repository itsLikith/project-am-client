import { useState } from 'react';
import axios from 'axios';
import { Circle } from 'lucide-react';

const UnblockContent = () => {
  const [selected, setSelected] = useState('');
  const [ID, setID] = useState('');
  const [error, setError] = useState(null);
  const[message,setMessage] = useState("");

  const handleChange = (event) => {
    setSelected(event.target.value);
    setID(''); // Reset ID when type changes
    setError(null); // Reset error on type change
  };

  const handleSubmit = async () => {
    if (!ID) {
      setError('Please enter an ID.');
      return;
    }

    let backend_url = 'https://accessmatrix.vercel.app/api/';
    switch (selected) {
      case 'adp':
        backend_url += 'adp/unblock/' + ID;
        break;
      case 'avp':
        backend_url += 'avp/unblock/' + ID;
        break;
      case 'aep':
        backend_url += 'admin/aep/unblock/' + ID;
        break;
      default:
        return; // No valid type selected
    }

    try {
      const response = await axios.get(backend_url);
      console.log(response.data);
      if(response.data.success) {
        setMessage(response.data.message);
      } else {
        setMessage(`Failed to unblock ${selected.toUpperCase()}`);
      }
      // Optionally, handle success (e.g., show a success message)
    } catch (err) {
      setMessage('Error unblocking content. Please try again.');
      console.error(err);
    }
  };

  const renderInput = () => (
    <>
      <input
        type="text"
        className="form-control col-md-12 mt-5"
        placeholder={`Enter ${selected.toUpperCase()} ID`}
        value={ID}
        onChange={(e) => setID(e.target.value)}
      />
      <p className='text-warning text-center mt-2'>{message}</p>
      <span className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-danger d-flex align-items-center gap-1"
          onClick={handleSubmit}
        >
          Unblock <Circle size={18} />
        </button>
      </span>
      {error && <div className="text-danger mt-2">{error}</div>}
    </>
  );

  return (
    <div className="unblock-content">
      <select
        name="drop"
        className="form-control mt-3"
        onChange={handleChange}
        value={selected}
      >
        <option value="" disabled>
          Select type
        </option>
        <option value="adp">ADP</option>
        <option value="avp">AVP</option>
        <option value="aep">AEP</option>
      </select>
      {selected && renderInput()}
    </div>
  );
};

export default UnblockContent;
