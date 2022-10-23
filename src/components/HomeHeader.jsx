import React from 'react';
import Logo from './Logo';
import {
  Header, Nav, NavItems, NavLink, NavItem, NavLinkHighlight,
} from './HomeHeaderStyles';
import { useAuth } from '../hooks';

function HomeHeader() {
  const auth = useAuth();

  const navLink = () => (auth.isAuth
    ? (
      <NavItems>
        <NavItem><NavLinkHighlight to="/notes/all">进入 BOX</NavLinkHighlight></NavItem>
      </NavItems>
    )
    : (
      <NavItems>
        <NavItem><NavLink to="/login">登录</NavLink></NavItem>
        <NavItem><NavLinkHighlight to="/register">注册</NavLinkHighlight></NavItem>
      </NavItems>
    ));

  return (
    <Header>
      <Logo />
      <Nav>
        { navLink() }
      </Nav>
    </Header>
  );
}

export default HomeHeader;
