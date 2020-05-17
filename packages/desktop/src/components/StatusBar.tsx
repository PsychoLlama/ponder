import React from 'react';
import styled from 'styled-components';

import colors from '../config/colors';

const Container = styled.div`
  color: ${colors.mutedText};
  padding: 6px;
  font-size: 10px;
  display: flex;
  justify-content: space-between;
`;

type Props = {
  children?: React.ReactNode;
};

export class StatusBar extends React.Component<Props> {
  render() {
    return <Container>{this.props.children}</Container>;
  }
}

export default StatusBar;
