import styled from 'styled-components';
import { Button } from 'antd';

export const StyledButton = styled(Button)`
&.ant-btn-primary {
    border: 1px solid #79BAD2;
    background:#01579B;
    color: #2196F3;
    position:relative;
    right:-200px;
    bottom:-50px
  }
`;

export const TransButton = styled(Button)`
    border: 1px solid #1976D2;
    background:#1976D2;
    color: #2196F3;
    position:relative;
    right:-115px;
    width: 70px
    font-size: 9em; color: #1A237E
}
`;