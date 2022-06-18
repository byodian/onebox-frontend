import { useState } from 'react';

const useMessage = () => {
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState('');

  const handleMessage = (message, severityType) => {
    setMessage(message);
    setSeverity(severityType);
  };

  const removeMessage = (timer) => {
    setTimeout(() => {
      setMessage(null);
    }, timer);
  };

  return [message, { handleMessage, removeMessage, severity }];
};

export default useMessage;
