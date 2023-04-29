import React from 'react';
import { Result } from "antd";

function Fallback({ error, resetErrorBoundary }) {
    return (
    <main>
        <Result
        style={{
          margin: '3rem'
        }}
          status="error"
          title="Something went wrong. Please Refresh the page!"
          subTitle={error.message}
        />
      </main>
    );
}

export default Fallback;
