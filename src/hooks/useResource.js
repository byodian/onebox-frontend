import { useState } from 'react';

const useResource = (type) => {
  const [resources, setResources] = useState(type);

  // Initializing notes state when Notes page is firstly redered.
  const handleResources = r => {
    setResources(r);
  };

  return [resources, { handleResources }];
};

export default useResource;
