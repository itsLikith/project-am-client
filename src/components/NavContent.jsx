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
        WebkitOverflowScrolling: 'touch', // Optional for smooth scrolling on iOS
        msOverflowStyle: 'none', // For Internet Explorer and Edge
        scrollbarWidth: 'none', // For Firefox
        overflow: 'hidden', // To hide default scrollbar
      }}
    >
      {props.viewContent === 'employee' ? (
        <EmployeeContent />
      ) : props.viewContent === 'validity' ? (
        <ValidityContent />
      ) : props.viewContent === 'issue' ? (
        <IssueContent selected={props.selected} />
      ) : props.viewContent === 'logrecord' ? (
        <RecordsContent />
      ) : null}
    </div>
  );
};

export default NavContent;
