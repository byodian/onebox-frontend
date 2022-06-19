import { useState } from 'react';

const useVisibility = (bool) => {
  const [visibility, setVisibility] = useState(bool);

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  const setHidden = () => {
    setVisibility(false);
  };

  return [visibility, { handleVisibility, setHidden }];
};

export default useVisibility;
