import { FloatContainer, FloatActionButton } from './ButtonFloatStyles';
import { PlusIcon } from './IconStyles';

function FloatButton({ handleClick }) {
  return (
    <FloatContainer>
      <FloatActionButton onClick={handleClick}>
        <PlusIcon />
      </FloatActionButton>
    </FloatContainer>
  );
}

export default FloatButton;
