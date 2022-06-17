import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--space-64);
  
  @media (min-width: 480px) {
    justify-content: flex-start;
    padding-left: var(--space-32);
    padding-right: var(--space-32);
  }

  @media (min-width: 768px) {
    padding-left: var(--space-64);
    padding-right: var(--space-64);
  }

  @media (min-width: 1024px) {
    padding-left: var(--space-96);
    padding-right: var(--space-96);
  }

  @media (min-width: 1120px) {
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
  }
`;

export const Nav = styled.nav`
  display: none;
  height: 100%; // 64px

  @media (min-width: 480px) {
    display: block;
    margin-left: auto;
  }
`;

export const NavItems = styled.ul`
  // align-items: stretch (by default)
  // The flex items will stretch to fill the size of the cross axios
  display: flex; 
  height: 100%; // 64px
`;

export const NavItem = styled.li`
  // The flex items will stretch to fill the size of the cross axios
  display: flex;
`;

export const NavLink = styled(Link)`
  display: flex;
  position: relative;
  align-items: center;
  padding: 0 var(--space-16);
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;

  &:hover {
    background-color: var(--color-grey-01);
    border-bottom: 2px solid var(--main-color-highlight);
  }
`;

export const NavRegisterLink = styled(NavLink)`
  color: var(--main-color-highlight);
`;