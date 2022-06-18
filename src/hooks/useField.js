import { useState } from 'react';

const useField = (type, fieldText='') => {
  const [value, setValue] = useState(fieldText);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    type,
    value,
    reset,
    onChange,
  };
};

export default useField;
