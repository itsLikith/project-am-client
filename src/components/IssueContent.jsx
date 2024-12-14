import IssueContentAEP from './IssueContentAEP';
import Radio from './IssueContentOptions';

const IssueContent = (props) => {
  return (
    <div className="issue-content">
      <span className="h5">Issue Content</span>
      <p className="d-flex justify-content-center">
        <Radio />
      </p>
      <div>{props.selected === 'aep' ? <IssueContentAEP /> : null}</div>
    </div>
  );
};

export default IssueContent;
