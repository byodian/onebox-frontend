import Logo from './Logo';
import {
  Header,
  Nav,
  NavItems,
  NavLink,
  NavItem,
  NavLinkHighlight,
} from './HomeHeaderStyles';

function HomeHeaderLink({ isAuth }) {
  return isAuth ? (
    <NavItems>
      <NavItem><NavLinkHighlight to="/notes/all">进入 BOX</NavLinkHighlight></NavItem>
    </NavItems>
  ) : (
    <NavItems>
      <NavItem><NavLink to="/login">登录</NavLink></NavItem>
      <NavItem><NavLinkHighlight to="/register">注册</NavLinkHighlight></NavItem>
    </NavItems>
  );
}

function HomeHeader({ isAuth }) {
  return (
    <Header>
      <Logo />
      <Nav>
        <HomeHeaderLink isAuth={isAuth} />
      </Nav>
    </Header>
  );
}

export default HomeHeader;
