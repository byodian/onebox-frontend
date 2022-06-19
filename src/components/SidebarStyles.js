import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from './IconStyles';

export const SidebarContainer = styled.nav`
  display: none;
  --width: 18.0rem;
  position: absolute;
  left: 0;
  top: 0;
  width: var(--width);
  height: 100%;
  background-color: #fff;
  transition: all .3s ease-in-out;
  z-index: 400;

  @media screen and (min-width: 768px) {
    top: var(--space-48);
    height: calc(100% - var(--space-48));
    background-color: var(--color-grey-01);
    border-left: 1px solid transparent;
    border-right: 1px solid var(--main-color);
  }
`;

export const SidebarHamburgerIcon = styled(Icon)`
  
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const SidebarMenu = styled.ul`
  @media screen and (min-width: 768px) {
    margin-top: var(--space-16); 
  }
`;
export const SidebarItem = styled.li``;
export const SidebarWrap = styled.div``;

export const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: var(--space-8) var(--space-16);
  margin-left: 1px;
  margin-right: 1px;
  transition: all 0.2s ease-in-out;

  span {
    margin-left: var(--space-16);
  }

  &:hover {
    color: var(--main-color-highlight);

    path {
      fill: var(--main-color-highlight);
    }
  }
`;

export const DropdownMenu = styled.div``;

export const DropdownLink = styled(Link)`
  display: flex;
  align-items: flex-end;
  padding-top: var(--space-8);
  padding-left: var(--space-32);
  padding-bottom: var(--space-8);

  &:hover {
    color: var(--main-color-highlight);
  }
`;

export const DropdownContent = styled.span`
  margin-left: var(--space-8);
  font-size: 1.4rem;  
`;
