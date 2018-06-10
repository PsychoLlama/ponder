import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

import colors from '../config/colors';

const Container = styled.div`
  color: ${colors.mutedText};
  padding: 6px;
  font-size: 10px;
  display: flex;
  justify-content: space-between;
`;

export class StatusBar extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return <Container>{this.props.children}</Container>;
  }
}

export default StatusBar;
