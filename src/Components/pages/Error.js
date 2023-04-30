import React from "react";
import MainHeader from "../MainHeader/MainHeader";
import { Result } from "antd";

const Error = () => {
  return (
    <>
      <MainHeader />
      <main>
        <Result
          style={{
            margin: "3rem",
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
