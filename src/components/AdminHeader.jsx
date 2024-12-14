import '../styles/AdminHeader.css';
import NavBar from './NavBar';
import UserOptions from './UserOptions';
import Logo from './AAIlogo';

const AdminHeader = () => {
  return (
    <div className="nav-bar-div d-flex align-items-center justify-content-between p-5 bg-dark">
      <Logo />
      <NavBar />
      <UserOptions />
    </div>
  );
};

export default AdminHeader;
