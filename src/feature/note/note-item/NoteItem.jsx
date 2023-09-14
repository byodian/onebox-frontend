import { useState } from 'react';
import { Dropdown } from 'antd';
import {
  MdOutlineMode,
  MdOutlineArticle,
  MdOutlineFolder,
  MdOutlineStarBorder,
} from 'react-icons/md';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { BiTrash } from 'react-icons/bi';
import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';

import { formatDateTime } from 'utils/format/index';
import { TextEditor } from 'feature/editor';
import { StarIcon } from 'components/button';
import { AlertDialogCustom } from 'components/alert-dialog';
import { NoteItemButton } from '../note-item-button';
import './NoteItem.scss';

function NoteItem({
  note,
  folders,
  handleStarToggle,
  handleFolderUpdate,
  handleNoteDelete,
  handleNoteUpdate,
}) {
  const [visible, setVisible] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  return (
    <>
      <li className="note-item">
        <div className="flex items-center mb-4">
          <time className="block text-gray-400">{formatDateTime(new Date(note.createdAt))}</time>
          <div className="note-item__buttons flex ml-auto items-center gap-x-2">
            <NoteItemButton label="星标" onClick={() => handleStarToggle(note.id)}>
              {note.star === 1 ? <StarIcon /> : <MdOutlineStarBorder />}
            </NoteItemButton>
            <NoteItemButton label="编辑" onClick={onOpen}>
              <MdOutlineMode />
            </NoteItemButton>
            <NoteItemButton label="查看详情" onClick={() => navigate(`/notes/${note.id}`)}>
              <MdOutlineArticle />
            </NoteItemButton>
            <NoteItemButton label="删除" onClick={() => setVisible(true)}>
              <BiTrash />
            </NoteItemButton>
            <NoteItemButton label="移动" onClick={null}>
              <DropdownWrapper
                folders={folders}
                note={note}
                onClick={(folderId) => handleFolderUpdate(folderId, note.id)}
              />
            </NoteItemButton>
          </div>
        </div>
        <div className="prose max-w-full">{parse(note.content)}</div>
      </li>

      <AlertDialogCustom
        handleConfirm={() => handleNoteDelete(note.id)}
        handleClose={() => setVisible(false)}
        isOpen={visible}
        message={{ headerText: '删除笔记', bodyText: '确定删除这条笔记吗？' }}
      />

      <Modal onClose={onClose} isOpen={isOpen} size="4xl" closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>编辑笔记</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TextEditor
              onSubmit={(updatedNote) => {
                handleNoteUpdate(note.id, updatedNote);
                onClose();
              }}
              initialContent={note.content}
              initialFolderId={note.id}
              folders={folders}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

function DropdownWrapper({ folders, note, onClick }) {
  const items = folders.map((folder) => ({
    key: folder.id,
    label: (
      <div onClick={() => onClick(folder.id, note.id)} aria-hidden="true">{folder.name}</div>
    ),
  }));

  return (
    <Dropdown menu={{ items }} placement="left" trigger={['click']} destroyPopupOnHide>
      <MdOutlineFolder />
    </Dropdown>
  );
}

export default NoteItem;
