import React from 'react';
import { DefaultPageWrap, DefaultSvgWrap, Description } from './DefaultPageStyles';

const DefaultPage = (props) => {

  return (
    <DefaultPageWrap>
      <DefaultSvgWrap>
        {props.icon}
      </DefaultSvgWrap>
      <Description>{props.text}</Description>
    </DefaultPageWrap>
  );
};

export default DefaultPage;
