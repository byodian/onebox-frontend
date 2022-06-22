import React from 'react';
import Logo from './Logo';
import {
  Header, Nav, NavItems, NavLink, NavItem, NavRegisterLink,
} from './HomeHeaderStyles';

function HomeHeader() {
  return (
    <Header>
      <Logo />
      <Nav>
        <NavItems>
          <NavItem><NavLink to="/login">登录</NavLink></NavItem>
          <NavItem><NavRegisterLink to="/register">注册</NavRegisterLink></NavItem>
        </NavItems>
      </Nav>
    </Header>
  );
}

export default HomeHeader;
