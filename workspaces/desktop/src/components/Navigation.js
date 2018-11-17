// @flow
import styled from 'styled-components';
import React from 'react';

import StatusBar from './StatusBar';

const Nav = styled.nav`
  width: 192px;
  margin-top: 4px;
  overflow-y: auto;
  flex-grow: 1;
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const List = styled.ol`
  margin: 0;
  padding: 0;
`;

const NavItem = styled.a.attrs({ href: '#' })`
  padding: 8px 24px;
  display: block;
  transition-property: padding-left, padding-right;
  transition-duration: 250ms;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-x: hidden;
  color: inherit;
  text-decoration: none;

  &:hover {
    padding-left: 32px;
    padding-right: 16px;
  }
`;

const Folder = styled(NavItem)`
  font-size: 16px;
`;

const Note = styled(NavItem)`
  font-weight: lighter;
`;

type Props = {};

export class Navigation extends React.Component<Props> {
  render() {
    return (
      <Sidebar>
        <Nav>
          <List>
            <Folder>Folder</Folder>
            <Note>Note</Note>
          </List>
        </Nav>

        <StatusBar>All</StatusBar>
      </Sidebar>
    );
  }
}

export default Navigation;
