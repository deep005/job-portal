import { Card, Select } from "antd";
import UserProfileConstants from "../../../../Constants/UserProfileConstants";

const { skillsOptions, minSalaryOptions } = UserProfileConstants;

const FiltersCard = (props) => {
  const { skillsRef, salaryRef, resetOpportunities } = props;

  const onSkillsChange = (skills) => {
    skillsRef.current = skills;
    resetOpportunities(true);
  };
  const onSalaryChange = (minSalary) => {
    salaryRef.current = minSalary;
    resetOpportunities(true);
  };
  return (
    <Card
      style={{
        minWidth: "97.5vw",
        border: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <label
        htmlFor="salary"
        style={{
          marginRight: "10px",
          fontSize: "16px"
        }}
      >
        Minimum salary per hour:
      </label>
      <Select
        id="salary"
        allowClear
        style={{
          marginRight: "20px",
          minWidth: "200px",
        }}
        options={minSalaryOptions}
        onChange={onSalaryChange}
      ></Select>

      <label
        htmlFor="skills"
        style={{
          marginRight: "10px",
          fontSize: "16px"
        }}
      >
        Skills:
      </label>
      <Select
        id="skills"
        allowClear
        style={{
          minWidth: "400px",
        }}
        options={skillsOptions}
        mode="multiple"
        onChange={onSkillsChange}
      ></Select>
    </Card>
  );
};

export default FiltersCard;
