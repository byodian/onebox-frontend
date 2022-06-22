import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4.8rem; 
  border-top: 1px solid #333;
  border-bottom: 1px solid transparent;

  a {
    display: flex;
  }

  svg {
    width: 45px;
  }
`;

export default FooterContainer;
