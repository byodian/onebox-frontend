import { useToast } from '@chakra-ui/react';

function useCustomToast() {
  const toast = useToast();
  const handleError = (error) => {
    toast({
      title: error.message,
      position: 'top',
      status: 'error',
      duration: 3000,
    });
  };

  return handleError;
}

export default useCustomToast;
