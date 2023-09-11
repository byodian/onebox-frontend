import { useRef } from 'react';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

export default function AlertDialogCustom({
  handleClose,
  handleConfirm,
  isOpen,
  message,
}) {
  const cancelRef = useRef();

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={handleClose}
      leastDestructiveRef={cancelRef}
      isCentered
      motionPreset="slideInBottom"
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontWeight="bold" fontSize="lg">
            {message.headerText}
          </AlertDialogHeader>
          <AlertDialogBody>{message.bodyText}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={handleClose}>
              取消
            </Button>
            <Button onClick={handleConfirm} colorScheme="red" ml={3}>
              确定
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
