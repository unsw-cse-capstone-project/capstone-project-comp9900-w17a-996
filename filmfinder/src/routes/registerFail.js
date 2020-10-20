import React, { Component } from 'react';
import { Result, Button, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import "../styles/centerCenter.css";

const { Paragraph, Text } = Typography;
class RegisterFail extends Component {
    state = {  }
    render() { 
        return ( <React.Fragment>
            <Result
    status="error"
    title="Registration Failed"
    subTitle="Please check the following information about the failure."
    extra={[
      <Button type="primary" key="console">
        Go home
      </Button>,
      <Button key="buy">Try Again</Button>,
    ]}
  >
    <div className="desc">
      <Paragraph>
        <Text
          strong
          style={{
            fontSize: 16,
          }}
        >
          The information you submitted may have the following error:
        </Text>
      </Paragraph>
      <Paragraph>
        <CloseCircleOutlined className="site-result-demo-error-icon" /> Invalid Email address 
      </Paragraph>
      <Paragraph>
        <CloseCircleOutlined className="site-result-demo-error-icon" /> Password too short
         
      </Paragraph>
    </div>
  </Result>
        </React.Fragment> );
    }
}
 
export default RegisterFail;