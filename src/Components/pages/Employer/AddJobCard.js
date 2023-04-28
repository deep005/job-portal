import { Card, Button } from "antd";

const AddJobCard = (props) => {
  const { onOpenJobCreationModal } = props;

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
      <Button type="primary" onClick={onOpenJobCreationModal.bind(null,true)}>
       Post Job
      </Button>
    </Card>
  );
};

export default AddJobCard;
