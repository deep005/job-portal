import { Card, Button } from "antd";

const AddJobCard = (props) => {
  const { onJobCreation } = props;

  return (
    <Card
      style={{
        minWidth: "97.5vw",
        border: 'none',
        display: "flex",
        justifyContent: "flex-end",
        paddingRight: 20
      }}
    >
      <Button type="primary" onClick={()=>{onJobCreation(true)}}>
       Post Job
      </Button>
    </Card>
  );
};

export default AddJobCard;
