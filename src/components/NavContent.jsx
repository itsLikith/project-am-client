import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../styles/NavContent.css";

const NavContent = (props) => {
    return (
        <div className="nav-content">
            {
                (props.viewContent === "employee") ? (
                    "this is for employee"
                ) : (props.viewContent === "validity") ? (
                    "this is for validity"
                ) : (props.viewContent === "issue") ? (
                    "this is for issue"
                ) : (props.viewContent === "logrecord") ? (
                    "this is for log record"
                ) : null
            }
        </div>
    );
};

export default NavContent;