import React, { useEffect, useState } from 'react';
import { Collapse } from 'antd';
import {
  IconButton,
  InputGroup,
  InputLeftElement,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import {
  Aside,
  AsideNavLink,
  BoxIcon,
  StarIcon,
  CalendarIcon,
  FolderIcon,
  PlusIcon,
  BsTrashIcon,
  BsThreeDotsIcon,
  BsPencilSquareIcon,
} from './AsideStyles';
import { folderService, noteService } from '../services';

const { Panel } = Collapse;
const asideLinks = [
  { url: '/notes/all', name: '所有', icon: <BoxIcon /> },
  { url: '/notes/star', name: '星标', icon: <StarIcon /> },
  { url: '/notes/today', name: '今日', icon: <CalendarIcon /> },
];

export default function AsideBlock({ token }) {
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [folders, setFolders] = useState([]);
  const [currentFolderId, setCurrentFolderId] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();

  useEffect(() => {
    async function fetchFolders() {
      try {
        noteService.setToken(token);
        const initialFolders = await folderService.getAllFolders();
        setFolders(initialFolders);
      } catch (err) {
        console.error(err.message);
      }
    }

    fetchFolders();
  }, [token]);

  const handleSubmit = async (event) => {
    if (event.key === 'Enter') {
      let folder = null;
      try {
        if (currentFolderId) {
          folder = await folderService.updateFolder(currentFolderId, { name: value });
          setFolders(folders.map((item) => (item.id !== currentFolderId ? item : folder)));
        } else {
          folder = await folderService.createFolder({ name: value });
          setFolders(folders.concat(folder));
        }

        setValue('');
        setVisible(false);
        setCurrentFolderId('');
      } catch (err) {
        toast({
          title: err.message,
          icon: 'error',
          duration: 3000,
        });
      }
    }
  };

  const onChange = () => {
    setVisible(false);
    setValue('');
  };

  const handleEdit = (folderId) => {
    setVisible(true);
    setCurrentFolderId(folderId);
  };

  const handleModalOpen = (id) => {
    setCurrentFolderId(id);
    onOpen();
  };

  const handleDelete = async () => {
    try {
      await folderService.deleteFolder(currentFolderId);
      setFolders(folders.filter((item) => item.id !== currentFolderId));
      setCurrentFolderId('');
      onClose();
    } catch (err) {
      toast({
        title: err.message,
        icon: 'error',
        duration: 3000,
      });
    }
  };

  const getExtra = () => (
    <PlusIcon
      className="cursor-pointer"
      onClick={(event) => {
        event.stopPropagation();
        setVisible(!visible);
      }}
    />
  );

  return (
    <Aside>
      <div className="flex flex-col gap-y-4 mb-8">
        { asideLinks.map((link) => (
          <AsideNavLink to={link.url} key={link.name}>
            {link.icon}
            <span>{link.name}</span>
          </AsideNavLink>
        ))}
      </div>

      <div className="overflow-y-auto pr-8">
        <Collapse
          bordered={false}
          defaultActiveKey={['1']}
          expandIconPosition="end"
          onChange={onChange}
          className="select-none"
        >
          <Panel header="收藏夹" extra={getExtra()} key="1">
            <div className="flex flex-col gap-4 w-full">
              { folders.map((folder) => (
                <AsideNavLink to={`/folders/${folder.id}`} key={folder.id}>
                  <FolderIcon />
                  <span>{folder.name}</span>
                  <span className="ml-auto text-gray-400 save-notes">
                    {folder.notes ? folder.notes : ''}
                  </span>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<BsThreeDotsIcon />}
                      variant="unstyled"
                      className="edit-button"
                    />
                    <MenuList>
                      <MenuItem icon={<BsPencilSquareIcon />} color="gray" onClick={() => handleEdit(folder.id)}>
                        重命名
                      </MenuItem>
                      <MenuItem icon={<BsTrashIcon />} color="gray" onClick={() => handleModalOpen(folder.id)}>
                        删除
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </AsideNavLink>
              ))}

              { visible && (
                <InputGroup>
                  <InputLeftElement pointerEvents="none" width="3rem">
                    <FolderIcon />
                  </InputLeftElement>
                  <Input
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    onKeyDown={handleSubmit}
                    autoFocus
                    pl="3rem"
                  />
                </InputGroup>
              )}
            </div>
          </Panel>
        </Collapse>
      </div>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              删除文件夹
            </AlertDialogHeader>

            <AlertDialogBody>
              此文件夹里面的笔记不会被删除
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                取消
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                删除
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Aside>
  );
}
