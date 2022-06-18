import React from 'react';
import { DefaultComponentWrap, DefaultSvgWrap, Description } from './DefaultElStyles.js';

const DefaultComponent = (props) => {

  return (
    <DefaultComponentWrap>
      <DefaultSvgWrap>
        {props.icon}
      </DefaultSvgWrap>
      <Description>{props.text}</Description>
    </DefaultComponentWrap>
  );
};

export default DefaultComponent;
