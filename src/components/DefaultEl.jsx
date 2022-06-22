import React from 'react';
import { DefaultSvgWrap } from './DefaultElStyles';

function DefaultComponent({ icon, text }) {
  return (
    <div className="flex flex-col justify-center items-center h-[55vh]">
      <DefaultSvgWrap>
        {icon}
      </DefaultSvgWrap>
      <p className="text-[color:var(--color-gray-06)]">{text}</p>
    </div>
  );
}

export default DefaultComponent;
