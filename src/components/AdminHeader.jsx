import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../styles/AdminHeader.css";
import NavBar from "./NavBar";
import UserOptions from "./UserOptions";
import Logo from "./AAIlogo";

const AdminHeader = () => {
    return (
        <div className="nav-bar-div d-flex align-items-center justify-content-between p-4">
            <Logo />
            <NavBar />
            <UserOptions />
        </div>
    )
}

export default AdminHeader;