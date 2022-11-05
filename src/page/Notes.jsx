import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
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
  AlertCustomDialog,
} from '../components';

import { ReactComponent as DefaultHomeSvg } from '../assets/svg/defaultHome.svg';
import { useAuth, useCustomToast } from '../hooks';
import { compare } from '../utils';
import {
  createNoteApi, getNotes, removeSingleNoteApi, updateSingleNoteApi,
} from '../services/note';
import { getSingleFolderApi } from '../services/folder';

export default function NotesPage({ pageType }) {
  const [notes, setNotes] = useState([]);
  const [currentId, setCurrentId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const {
    isOpen: isEditorOpen,
    onOpen: onEditorOpen,
    onClose: onEditorClose,
  } = useDisclosure();

  const handleError = useCustomToast();

  const navigate = useNavigate();
  const params = useParams();
  const auth = useAuth();
  const paramsId = params.folderId;

  useEffect(() => {
    async function fetchNotes() {
      let initialNotes;
      setIsLoading(true);

      try {
        if (pageType === 'folder') {
          const folder = await getSingleFolderApi(paramsId);
          initialNotes = folder.notes;
        } else {
          initialNotes = await getNotes(pageType);
        }

        setNotes(initialNotes);
      } catch (error) {
        handleError(error);
      }

      setIsLoading(false);
    }
    fetchNotes();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageType, paramsId]);

  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }

  function handleModelVisible(id, type) {
    onEditorOpen();

    if (type === 'update') {
      setCurrentId(id);
    } else {
      setCurrentId('');
    }
  }

  /**
   * 目前只能新增笔记内容
   * @param {Object} noteObject
   * @param {String} noteObject.content - 笔记内容
   * @returns
   */
  const handleNoteAdd = async (noteObject) => {
    try {
      onEditorClose();
      const createdNote = await createNoteApi(noteObject);
      setNotes(notes.concat(createdNote).sort(compare));
    } catch (error) {
      handleError(error);
    }
  };

  /**
   * @param {Object} updatedNote
   * @param {String} updateNote.content
   */
  async function handleNoteUpdate(updatedNote) {
    try {
      onEditorClose();
      // 目前只能更新内容
      setNotes(
        notes.map((note) => (note.id === currentId
          ? { ...note, content: updatedNote.content }
          : note)),
      );
      await updateSingleNoteApi(currentId, updatedNote);
    } catch (error) {
      handleError(error);
    }
  }

  async function handleStarToggle(id) {
    const note = notes.find((item) => item.id === id);
    const changedNote = { ...note, star: note.star ? 0 : 1 };

    try {
      setNotes(notes.map((n) => (n.id !== id ? n : changedNote)));
      await updateSingleNoteApi(id, changedNote);
    } catch (error) {
      handleError(error);
    }
  }

  function handleDeleteOverlayOpen(id) {
    setCurrentId(id);
    setVisible(true);
  }

  async function handleNoteDelete(id) {
    try {
      setNotes(notes.filter((n) => n.id !== id));
      setVisible(false);
      await removeSingleNoteApi(id);
    } catch (error) {
      handleError(error);
    }
  }

  const noteItems = notes.map((note) => (
    <NoteItem note={note} key={note.id}>
      <NoteItemIcon
        star={note.star}
        toggleStar={() => handleStarToggle(note.id)}
        deleteNote={() => handleDeleteOverlayOpen(note.id)}
        toggleVisible={() => handleModelVisible(note.id, 'update')}
        goDetail={() => navigate(`/notes/${note.id}`)}
      />
    </NoteItem>
  ));

  return isLoading ? (
    <div className="relative h-screen grid place-items-center">
      <Spinner color="teal.500" />
    </div>
  ) : (
    <div className="relative flex h-screen">
      <AsideBlock />
      <main className="flex-grow h-screen overflow-y-auto">
        <div className="px-6 md:w-4/5 lg:w-2/3 mx-auto">
          <NotesHeader handleLogout={auth.logout} />
          <TextEditor handleNoteSubmit={handleNoteAdd} />
          {notes.length === 0 && (
            <div>
              <EmptyPage icon={<DefaultHomeSvg />} text="写点什么吧？" />
            </div>
          )}
          <ul>{noteItems}</ul>
        </div>
      </main>

      <AlertCustomDialog
        handleConfirm={() => handleNoteDelete(currentId)}
        handleClose={() => setVisible(false)}
        isOpen={visible}
        message={{ headerText: '删除笔记', bodyText: '确定删除这条笔记吗？' }}
      />

      <Modal onClose={onEditorClose} isOpen={isEditorOpen} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentId ? '编辑笔记' : '新增笔记'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TextEditor
              handleNoteSubmit={currentId ? handleNoteUpdate : handleNoteAdd}
              initialContent={
                currentId ? notes.find((n) => n.id === currentId)?.content : ''
              }
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <ButtonFloat handleClick={() => handleModelVisible(null, 'create')} />
    </div>
  );
}
