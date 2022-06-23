import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
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
  ModalFooter,
  ModalCloseButton,
  Button,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import Header from '../components/NoteHeader';
// import Modal from '../components/Modal';
import FloatButton from '../components/ButtonFloat';
import NoteItem from '../components/NoteItem';
import NoteItemIcon from '../components/NoteItemIcon';
import DefaultComponent from '../components/DefaultEl';
import TextEditor from '../components/TextEditor';
import Main from './AppStyles';
import { ReactComponent as DefaultHomeSvg } from '../assets/svg/defaultHome.svg';
import { useAuth } from '../hooks';
import { compare } from '../utils';
import noteService from '../api/note';

// let uid = 0;
function NotesPage() {
  const [visible, setVisible] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentId, setCurrentId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isEditorOpen, onOpen: onEditorOpen, onClose: onEditorClose } = useDisclosure();
  const cancelRef = useRef();
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    async function fetchNotes() {
      try {
        noteService.setToken(auth.token);
        const initialNotes = await noteService.getNotesByUser(auth.user);
        setNotes(initialNotes);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchNotes();
  }, [auth.token, auth.user]);

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
      // 关闭编辑器弹框 ovlerlay
      setVisible(false);

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
      setVisible(false);
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
    const changedNote = { ...note, like: !note.like };

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
    <div className="relative">
      <Header handleLogout={auth.logout} />
      <Main>
        <TextEditor handleNoteSubmit={handleNoteAdd} />
        {
          notes.length === 0 && (
            <div>
              <DefaultComponent icon={<DefaultHomeSvg />} text="写点什么吧？" />
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
                like={note.like}
                toggleLike={() => handleStarToggle(note.id)}
                deleteNote={() => handleDeleteOverlayOpen(note.id)}
                toggleVisible={() => handleModelVisible(note.id, 'update')}
                goDetail={() => navigate(`/notes/${note.id}`)}
              />
            </NoteItem>
          ))}
        </ul>
      </Main>
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
      <FloatButton handleClick={() => handleModelVisible(null, 'create')} />
    </div>
  );
}

export default NotesPage;
