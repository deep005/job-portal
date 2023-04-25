import MainHeader from "../MainHeader/MainHeader";
import { Result } from "antd";
const Error = () => {
  return (
    <>
      <MainHeader />
      <main>
        <Result
        style={{
          padding: 0
        }}
          status="404"
          title="Aw, Snap!"
          subTitle="Sorry, the page you visited does not exist."
        />
      </main>
    </>
  );
};

export default Error;
