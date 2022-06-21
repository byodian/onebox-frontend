import React, { useState } from 'react';
import { MenuButton, MenuText, HamburgerButton  } from './ButtonStyles';
import {
  Header,
  Nav,
  Img,
  ImgButton,
  MenuContainer
} from './NoteHeaderStyles';
import { Hamburger } from './IconStyles';
import Author from '../assets/author.png';

const DropDown = ({ handleLogout }) => {
  return (
    <MenuContainer>
      <MenuButton onClick={handleLogout}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="24 / basic / share-arrow">
            <path id="icon" fillRule="evenodd" clipRule="evenodd" d="M4.6669 7.5833L10.8419 7.5833L8.92109 9.50416L9.74605 10.3291L13.0752 6.99997L9.74605 3.67082L8.92109 4.49578L10.8419 6.41663L4.6669 6.41663L4.6669 7.5833ZM2.33351 12.25L7.58351 12.25L7.58351 11.0833L2.33351 11.0833L2.33351 2.91667L7.58351 2.91667L7.58351 1.75L2.33351 1.75C1.68918 1.75 1.16684 2.27233 1.16684 2.91667L1.16684 11.0833C1.16684 11.7277 1.68918 12.25 2.33351 12.25Z" fill="#333333"/>
          </g>
        </svg>
        <MenuText>退出</MenuText>
      </MenuButton>
    </MenuContainer>
  );
};

const NotesHeader = ({ handleLogout }) => {
  const [visibility, setVisibility] = useState(false);

  return (
    <>
      <Header>
        <HamburgerButton>
          <Hamburger></Hamburger>
        </HamburgerButton>
        <Nav>
          <ImgButton onClick={() => setVisibility(!visibility)}>
            <Img src={Author} alt="用户头像"/>
          </ImgButton>
          { visibility ? <DropDown handleLogout={handleLogout} /> : null }
        </Nav>
      </Header>
    </>
  );
};

export default NotesHeader;
