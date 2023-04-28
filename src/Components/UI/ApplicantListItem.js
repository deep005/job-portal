import { List } from "antd";

const ApplicantListItem = (props) => {
  const { currPosition, gender, experience, contact, education, skills, location } = props;
  const skillsModified = skills.join(", ");
  return (
    <List.Item>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%"
        }}
      >
        <div>Current Position: {currPosition}</div>
        <div>
          <div>Experience: {experience} years</div>
          <div>Education: {education}</div>
          <div>Skills: {skillsModified}</div>
          <div>Preferred Location: {location} </div>
          <div>Gender: {gender} </div>
          <div>Contact: {contact}</div>
        </div>
      </div>
    </List.Item>
  );
};

export default ApplicantListItem;
