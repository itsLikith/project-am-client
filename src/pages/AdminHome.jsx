import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import AdminHeader from "../components/AdminHeader";
import NavBar from "../components/NavBar";
import NavContent from "../components/NavContent";
import "../styles/AdminHome.css";

const AdminHome = (props) => {
    return (
        <React.Fragment>
            <div className="adm-page">
                <AdminHeader />
                <NavContent viewContent={props.viewContent} />
            </div>
        </React.Fragment>
    )
}

export default AdminHome;