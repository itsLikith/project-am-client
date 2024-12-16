import { Link } from 'react-router-dom';
const aai = require('../assets/images/aaiLogo.png');

const Logo = () => {
  return (
    <Link to="/admin/home">
      <img src={aai} alt="AAI Logo" height="auto" width="120px" />
    </Link>
  );
};

export default Logo;
