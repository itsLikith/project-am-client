import EmployeeContent from './EmployeeContent';
import IssueContent from './IssueContent';
import RecordsContent from './RecordsContent';
import ValidityContent from './ValidityContent';

const NavContent = (props) => {
  return (
    <div
      className="nav-content p-4"
      style={{
        backgroundColor: '#373737',
        color: 'whitesmoke',
        border: '11px solid #212529',
      }}
    >
      {props.viewContent === 'employee' ? (
        <EmployeeContent />
      ) : props.viewContent === 'validity' ? (
        <ValidityContent />
      ) : props.viewContent === 'issue' ? (
        <IssueContent />
      ) : props.viewContent === 'logrecord' ? (
        <RecordsContent />
      ) : null}
    </div>
  );
};

export default NavContent;
