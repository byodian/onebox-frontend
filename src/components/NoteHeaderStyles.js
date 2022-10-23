import styled from '@emotion/styled';

export const MenuContainer = styled.div`
  position: absolute;
  right: var(--space-4);
  top: 3.0rem;
  width: 10rem;
  padding-top: var(--space-4);
  padding-bottom: var(--space-4);
  border: 1px solid var(--main-color);
  border-radius: var(--radius-md);
  background-color: #fff;
  z-index: 398;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--space-48);
  border-bottom: 1px solid var(--color-gray-04);
  border-top: 1px solid transparent;
`;

export const Img = styled.img`
  display: block;
  width: 2.4rem;
  border-radius: 50%;
`;

export const ImgButton = styled.button`
  padding: var(--space-2);
  border: 1px solid transparent;
  border-radius: 50%;

  &:focus {
    border-color: var(--main-color);
  }
`;

export const Nav = styled.nav`
  position: relative;
`;

export const Theme = styled.div`
  display: flex;
  padding: var(--space-4) var(--space-8);
`;

export const ThemeButton = styled.button`
  width: 24px;
  height: 24px;
  border: 1px solid var(--main-color);
  border-radius: 50%;
  background-color: ${(props) => (props.theme.color === 'dark' ? '#333' : '#fff')}; 
  margin-left: ${(props) => (props.space ? 'var(--space-8)' : '0')};
`;

ThemeButton.defaultProps = {
  theme: {
    color: 'white',
  },
};

export const BreakLine = styled.hr`
  border: none;
  height: 1px;
  background-color: var(--color-gray-06);
  margin-top: var(--space-4);
  margin-bottom: var(--space-4);
`;
