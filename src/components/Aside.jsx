import React, { useEffect, useState } from 'react';
import { Collapse } from 'antd';
import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import {
  Aside,
  AsideNavLink,
  BoxIcon,
  StarIcon,
  CalendarIcon,
  FolderIcon,
  PlusIcon,
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
      try {
        const folder = await folderService.createFolder({ name: value });
        setFolders(folders.concat(folder));
        setValue('');
        setVisible(false);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const onChange = () => {
    setVisible(false);
    setValue('');
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

      <div>
        <Collapse bordered={false} expandIconPosition="end" onChange={onChange} className="select-none">
          <Panel header="收藏夹" extra={getExtra()}>
            <div className="flex flex-col gap-4 w-full">
              { folders.map((folder) => (
                <AsideNavLink to={`/folders/${folder.id}`} key={folder.id}>
                  <FolderIcon />
                  {folder.name}
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
    </Aside>
  );
}
