import { List, Button } from "antd";

const JobPostingsListListItem = (props) => {
  const { postedJob, onClickHandler } = props;
  const tags = postedJob.tags.join(", ");
  const disabled = (postedJob.applicants > 0)? false :true;
  return (
    <List.Item
      key={postedJob.id}
      actions={[
        <Button type="primary" disabled={disabled} onClick={onClickHandler}>
          {!disabled ?`View ${postedJob.applicants} ${postedJob.applicants >1 ? 'applicants' : 'applicant'}`:"No Applicants"}
        </Button>,
      ]}
    >
      <List.Item.Meta
        title={<h2>{postedJob.company}</h2>}
        description={postedJob.designation}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          fontSize: "18px",
          width: "50%",
        }}
      >
        <div>
          <div>Requirements: {postedJob.requirements} </div>
          <div>Minimum YOE: {postedJob.minYOE}</div>
          <div>Tags: {tags}</div>
          <div>Point of Contact: {postedJob.poc}</div>
          <div>contact Number: {postedJob.contactInfo}</div>
        </div>
      </div>
    </List.Item>
  );
};

export default JobPostingsListListItem;
