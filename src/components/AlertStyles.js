import styled, { css } from 'styled-components';

const Alert = styled.p`
  display: ${props => props.message ? '' : 'none'};
  padding: ${props => props.message ? '0.4rem 0.8rem' : '0'};
  font-size: 1.2rem;
  border-radius: var(--radius-sm);
  text-align: center;
  letter-spacing: 1px;
  
  ${props =>
    props.severity === 'error' &&
    css`
    background-color: rgb(253, 236, 234);
    color: rgb(97, 26, 21);
  `}

  ${props =>
    props.severity === 'success' &&
    css`
    background-color: rgb(237, 247, 237);
    color: rgb(30, 70, 32);
  `}

  ${props =>
    props.severity === 'warning' &&
    css`
    background-color: rgb(255, 244, 229);
    color: rgb(102, 60, 0);
  `}

  ${props =>
    props.severity === 'info' &&
    css`
    background-color: rgb(232, 244, 253);
    color: rgb(13, 60, 97);
  `}
`;

export default Alert;
