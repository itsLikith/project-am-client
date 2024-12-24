import EmployeeContent from './EmployeeContent';
import IssueContent from './IssueContent';
import RecordsContent from './RecordsContent';
import ValidityContent from './ValidityContent';

const NavContent = (props) => {
  return (
    <div
      className="nav-content p-4 overflow-auto"
      style={{
        backgroundColor: '#373737',
        color: 'whitesmoke',
        border: '11px solid #212529',
        WebkitOverflowScrolling: 'touch',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        overflow: 'hidden',
      }}
    >
      {props.viewContent === 'employee' ? (
        <EmployeeContent employeeView={props.employeeView} />
      ) : props.viewContent === 'validity' ? (
        <ValidityContent validityView={props.validityView} />
      ) : props.viewContent === 'issue' ? (
        <IssueContent selected={props.selected} />
      ) : props.viewContent === 'logrecord' ? (
        <RecordsContent />
      ) : null}
    </div>
  );
};

export default NavContent;
