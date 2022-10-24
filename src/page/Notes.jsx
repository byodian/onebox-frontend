import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogOverlay,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';

import {
  NotesHeader,
  NoteItem,
  NoteItemIcon,
  ButtonFloat,
  EmptyPage,
  TextEditor,
  AsideBlock,
} from '../components';

import { ReactComponent as DefaultHomeSvg } from '../assets/svg/defaultHome.svg';
import { useAuth } from '../hooks';
import { compare } from '../utils';
import { folderService, noteService } from '../services';

function NotesPage({ pageType }) {
  const [notes, setNotes] = useState([]);
  const [currentId, setCurrentId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isEditorOpen, onOpen: onEditorOpen, onClose: onEditorClose } = useDisclosure();
  const cancelRef = useRef();
  const navigate = useNavigate();
  const params = useParams();
  const auth = useAuth();

  useEffect(() => {
    async function fetchNotes() {
      try {
        noteService.setToken(auth.token);
        console.log(pageType);
        let initialNotes;
        if (pageType === 'folder') {
          const folder = await folderService.findOneFolder(params.folderId);
          initialNotes = folder.notes;
        } else {
          initialNotes = await noteService.getNotes(pageType);
        }
        setNotes(initialNotes);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchNotes();
  }, [auth.token, auth.user, pageType, params.folderId]);

  const handleModelVisible = (id, type) => {
    onEditorOpen();

    if (type === 'update') {
      setCurrentId(id);
    } else {
      setCurrentId('');
    }
  };

  /**
  * 目前只能新增笔记内容
  * @param {Object} noteObject
  * @param {String} noteObject.content - 笔记内容
  * @returns
  */
  const handleNoteAdd = async (noteObject) => {
    try {
      onEditorClose();
      const createdNote = await noteService.create(noteObject);
      setNotes(notes.concat(createdNote).sort(compare));
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
  * @param {Object} updatedNote
  * @param {String} updateNote.content
  */
  const handleNoteUpdate = async (updatedNote) => {
    try {
      onEditorClose();
      // 目前只能更新内容
      setNotes(notes.map((note) => (
        note.id === currentId
          ? { ...note, content: updatedNote.content }
          : note
      )));
      await noteService.update(currentId, updatedNote);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleStarToggle = async (id) => {
    const note = notes.find((item) => item.id === id);
    const changedNote = { ...note, star: !note.star };

    try {
      setNotes(notes.map((n) => (n.id !== id ? n : changedNote)));
      await noteService.update(id, changedNote);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteOverlayOpen = (id) => {
    setCurrentId(id);
    onOpen();
  };

  const handleNoteDelete = async (id) => {
    try {
      setNotes(notes.filter((n) => n.id !== id));
      onClose();
      await noteService.remove(id);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <div className="relative h-screen grid place-items-center">
        <Spinner color="teal.500" />
      </div>
    );
  }

  return (
    <div className="md:w-4/5 lg:w-2/3 2xl:w-1/2 relative flex mx-auto h-full max-sm:px-4">
      <AsideBlock token={auth.token} />
      <main className="flex-grow">
        <NotesHeader handleLogout={auth.logout} />
        <TextEditor handleNoteSubmit={handleNoteAdd} />
        {
          notes.length === 0 && (
            <div>
              <EmptyPage icon={<DefaultHomeSvg />} text="写点什么吧？" />
            </div>
          )
        }
        <ul>
          {notes.map((note) => (
            <NoteItem
              note={note}
              key={note.id}
            >
              <NoteItemIcon
                star={note.star}
                toggleStar={() => handleStarToggle(note.id)}
                deleteNote={() => handleDeleteOverlayOpen(note.id)}
                toggleVisible={() => handleModelVisible(note.id, 'update')}
                goDetail={() => navigate(`/notes/${note.id}`)}
              />
            </NoteItem>
          ))}
        </ul>
      </main>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
        isCentered
        motionPreset="slideInBottom"
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontWeight="bold">删除笔记</AlertDialogHeader>
            <AlertDialogBody>
              确定要删除这条笔记吗？
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>取消</Button>
              <Button onClick={() => handleNoteDelete(currentId)} colorScheme="teal" ml={3}>确定</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal onClose={onEditorClose} isOpen={isEditorOpen} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentId ? '编辑笔记' : '新增笔记'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TextEditor
              handleNoteSubmit={currentId ? handleNoteUpdate : handleNoteAdd}
              initialContent={currentId ? notes.find((n) => n.id === currentId)?.content : ''}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <ButtonFloat handleClick={() => handleModelVisible(null, 'create')} />
    </div>
  );
}

export default NotesPage;
