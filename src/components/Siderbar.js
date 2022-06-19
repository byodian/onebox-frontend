import React from 'react';
import { ReactComponent as HomeIcon } from '../assets/svg/home.svg';
import { ReactComponent as HeartIcon } from '../assets/svg/heart.svg';
import { ReactComponent as TagIcon } from '../assets/svg/tag.svg';

import {
  SidebarContainer,
  SidebarItem,
  SidebarLink,
  SidebarMenu,
  SidebarWrap,
  SidebarHamburgerIcon,
} from './SidebarStyles';
import { Hamburger } from './IconStyles';
import { HamburgerButton } from './ButtonStyles';

const SidebarItemWrap = (props) => {
  return (
    <SidebarItem>
      <SidebarLink to={props.path}>
        {props.icon}
        <span>{props.linkText}</span>
      </SidebarLink>

      {open && props.children}
    </SidebarItem>
  );
};

const Siderbar = () => {
  return (
    <SidebarContainer>
      <SidebarHamburgerIcon>
        <HamburgerButton>
          <Hamburger />
        </HamburgerButton>
      </SidebarHamburgerIcon>
      <SidebarWrap>
        <SidebarMenu>
          <SidebarItemWrap
            icon={<HomeIcon />}
            linkText="全部"
            path="/notes"
          >
          </SidebarItemWrap>
          <SidebarItemWrap
            icon={<HeartIcon />}
            path="/favorites"
            linkText="喜欢"
          >
          </SidebarItemWrap>
          <SidebarItemWrap
            icon={<TagIcon />}
            path="/tags"
            linkText="标签"
          >
          </SidebarItemWrap>
        </SidebarMenu>
      </SidebarWrap>
    </SidebarContainer>
  );
};

export default Siderbar;
