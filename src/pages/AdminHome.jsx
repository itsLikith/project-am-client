import React from 'react';
import AdminHeader from '../components/AdminHeader';
import NavContent from '../components/NavContent';
import '../styles/AdminHome.css';

const AdminHome = (props) => {
  return (
    <React.Fragment>
      <div className="adm-page">
        <AdminHeader />
        <NavContent viewContent={props.viewContent} />
      </div>
    </React.Fragment>
  );
};

export default AdminHome;
