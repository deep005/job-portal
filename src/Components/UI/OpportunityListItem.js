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
          style={{minWidth: "7rem"}}
        >
          Apply
        </Button>
      ]}
    >
      <List.Item.Meta
        title={<div style={{fontSize: "1.5rem"}}>{opprotunity.companyName}</div>}
        description={opprotunity.position}
        style={{
          width: "55%",
          paddingRight: "2%"
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          fontSize: "18px",
          width: "45%",
        }}
      >
        <div>
          <div>skills: {opprotunity.skills} </div>
          <div>Salary Per Hour: {opprotunity.perHour}</div>
          <div>Job Poster: {opprotunity.jobPoster}</div>
          <div>
            Contact info: {opprotunity.contactInfo}
          </div>
        </div>
      </div>
    </List.Item>
  );
};

export default OpportunityListItem;
