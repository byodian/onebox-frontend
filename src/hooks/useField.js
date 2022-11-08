import { useState } from 'react';

const useField = (fieldText = '') => {
  const [value, setValue] = useState(fieldText);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    value,
    reset,
    onChange,
  };
};

export default useField;
