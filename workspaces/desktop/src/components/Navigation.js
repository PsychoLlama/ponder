import styled from 'styled-components';
import React from 'react';

const Container = styled.nav`
  width: 192px;
  margin-top: 4px;
`;

const NavList = styled.ol`
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

export class Navigation extends React.Component {
  render() {
    return (
      <Container>
        <NavList>
          <Folder>Folder</Folder>
          <Note>Note</Note>
        </NavList>
      </Container>
    );
  }
}

export default Navigation;
