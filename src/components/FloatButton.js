import React from 'react';
import { FloatContainer, FloatActionButton } from './FloatButtonStyles';
import { PlusIcon } from './IconStyles';

const FloatButton = ({ handleClick }) => {

  return (
    <FloatContainer>
      <FloatActionButton onClick={handleClick}>
        <PlusIcon></PlusIcon>
      </FloatActionButton>
    </FloatContainer>
  );
};

export default FloatButton;
