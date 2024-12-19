import IssueContentAEP from './IssueContentAEP';
import Radio from './IssueContentOptions';
import IssueContentAVP from './IssueContentAVP';
import IssueContentADP from './IssueContentADP';
import { NotebookPen } from 'lucide-react';

const IssueContent = (props) => {
  return (
    <div className="issue-content">
      <span className="h5 text-danger d-flex align-items-center gap-1">
        Issue
        <NotebookPen />
      </span>
      <p className="d-flex justify-content-center">
        <Radio />
      </p>
      <div>
        {props.selected === 'aep' ? (
          <IssueContentAEP selected={props.selected} />
        ) : props.selected === 'avp' ? (
          <IssueContentAVP selected={props.selected} />
        ) : props.selected === 'adp' ? (
          <IssueContentADP selected={props.selected} />
        ) : null}
      </div>
    </div>
  );
};

export default IssueContent;
