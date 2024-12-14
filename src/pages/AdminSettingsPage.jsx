import {Link} from "react-router-dom";
import Radio from "../components/IssueContentOptions"
import "../styles/AdminSettings.css";
import { ArrowBigLeft } from "lucide-react";

const AdminSettings = () => {
    return(
        <div className="admin-settings bg-dark text-light p-4">
            <span className="h5 text-danger d-flex align-items-center"><Link to='/admin/home'><ArrowBigLeft size={25} /></Link>{" "}Admin Settings</span>
            <select name="" id="" className="form-control mt-3">
                <option value="" selected disabled>Select task:</option>
                <option value="">Authorize</option>
                <option value="">Generate QR</option>
            </select>
            <p className="d-flex justify-content-center mt-3"><Radio /></p>
        </div>
    )
}

export default AdminSettings;
