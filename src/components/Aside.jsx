import { useState } from 'react';
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
} from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import AlertCustomDialog from './AlertCustomDialog';

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
  // BsPencilSquareIcon,
} from './AsideStyles';

import { useCustomToast, useField } from '../hooks';
import {
  createFolderApi,
  removeSingleFolderApi,
  updateSingleFolderApi,
} from '../services/folder';

const { Panel } = Collapse;
const asideLinks = [
  { url: '/notes/all', name: '所有', icon: <BoxIcon /> },
  { url: '/notes/star', name: '星标', icon: <StarIcon /> },
  { url: '/notes/today', name: '今日', icon: <CalendarIcon /> },
];

export default function AsideBlock({ folders, setFolders }) {
  const [visible, setVisible] = useState(false);
  const [currentFolderId, setCurrentFolderId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const handleError = useCustomToast();
  const inputField = useField();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    if (event.key === 'Enter') {
      let folder = null;
      try {
        if (currentFolderId) {
          folder = await updateSingleFolderApi(currentFolderId, {
            name: inputField.value,
          });
          setFolders(
            folders.map((item) => (item.id !== currentFolderId ? item : folder)),
          );
        } else {
          folder = await createFolderApi({ name: inputField.value });
          setFolders(folders.concat(folder));
        }

        inputField.reset();
        setVisible(false);
        setCurrentFolderId('');
      } catch (err) {
        handleError(err);
      }
    }
  };

  const onChange = () => {
    setVisible(false);
    inputField.reset();
  };

  // const handleEdit = (folderId) => {
  //   setVisible(true);
  //   setCurrentFolderId(folderId);
  // };

  const handleModalOpen = (e, id) => {
    e.stopPropagation();
    setCurrentFolderId(id);
    setIsOpen(true);
  };

  const handleDelete = async () => {
    try {
      await removeSingleFolderApi(currentFolderId);
      setFolders(folders.filter((item) => item.id !== currentFolderId));
      setCurrentFolderId('');
      setIsOpen(false);
      navigate('/notes/all');
    } catch (err) {
      handleError(err);
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

  const folderItems = folders.map((folder) => (
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
          {/* <MenuItem */}
          {/*   icon={<BsPencilSquareIcon />} */}
          {/*   color="gray" */}
          {/*   onClick={() => handleEdit(folder.id)} */}
          {/* > */}
          {/*   重命名 */}
          {/* </MenuItem> */}
          <MenuItem
            icon={<BsTrashIcon />}
            color="gray"
            onClick={(e) => handleModalOpen(e, folder.id)}
          >
            删除
          </MenuItem>
        </MenuList>
      </Menu>
    </AsideNavLink>
  ));

  return (
    <Aside>
      <div className="flex flex-col gap-y-4 mb-8">
        {asideLinks.map((link) => (
          <AsideNavLink to={link.url} key={link.name}>
            {link.icon}
            <span>{link.name}</span>
          </AsideNavLink>
        ))}
      </div>

      <div className="overflow-y-auto">
        <Collapse
          bordered={false}
          defaultActiveKey={['1']}
          expandIconPosition="end"
          onChange={onChange}
          className="select-none"
        >
          <Panel header="收藏夹" extra={getExtra()} key="1">
            <div className="flex flex-col gap-4 w-full">
              {folderItems}
              {visible && (
                <InputGroup>
                  <InputLeftElement pointerEvents="none" width="3rem">
                    <FolderIcon />
                  </InputLeftElement>
                  <Input
                    value={inputField.value}
                    onChange={(event) => inputField.onChange(event)}
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

      <AlertCustomDialog
        isOpen={isOpen}
        handleConfirm={handleDelete}
        handleClose={() => setIsOpen(false)}
        message={{ headerText: '删除文件夹', bodyText: '此文件夹里面的笔记不会被删除' }}
      />
    </Aside>
  );
}
