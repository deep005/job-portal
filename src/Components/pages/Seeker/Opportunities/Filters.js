import { Card, Select } from "antd";
import UserProfileConstants from "../../../../Constants/UserProfileConstants";

const { Option } = Select;
const { skillsOptions } = UserProfileConstants;

const FiltersCard = (props) => {
const {onSetSkills, onSetMinSalary, resetOpportunities} = props;

    const onSkillsChange = (skills) => {
        resetOpportunities(true);
        //onSetSkills(skills);  
    }
  return (
    <Card
      style={{
        minWidth: "97.5vw",
        borderRadius: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <label
        htmlFor="salary"
        style={{
          marginRight: "10px",
        }}
      >
        Minimum Salary:
      </label>
      <Select
        id="salary"
        style={{
          marginRight: "20px",
          minWidth: "200px",
        }}
      >
        <Option value="option1">Option 1</Option>
        <Option value="option2">Option 2</Option>
        <Option value="option3">Option 3</Option>
      </Select>

      <label
        htmlFor="skills"
        style={{
          marginRight: "10px",
        }}
      >
        Skills:
      </label>
      <Select
        id="skills"
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
