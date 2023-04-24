import { List, Button } from "antd";

const OpportunityListItem = (props) => {
  const { opprotunity, onClickHandler } = props;
  return (
    <List.Item
      key={opprotunity.id}
      actions={[
        <Button
          type="primary"
          disabled={opprotunity.applied ? opprotunity.applied : false}
          onClick={onClickHandler}
        >
          Apply
        </Button>,
      ]}
    >
      <List.Item.Meta
        title={<h2>{opprotunity.companyName}</h2>}
        description={
          opprotunity.position ? opprotunity.position : "Data Scientist"
        }
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          fontSize: "16px",
          width: "50%",
        }}
      >
        <div>
          <div>skills: {opprotunity.skills} </div>
          <div>Salary Per Hour: {opprotunity.perHour}</div>
          <div>Job Poster: {opprotunity.jobPoster}</div>
          <div>
            Contact email: {opprotunity.contactInfo ? opprotunity.contactInfo : "abc@xyz.com"}
          </div>
        </div>
      </div>
    </List.Item>
  );
};

export default OpportunityListItem;
