import { useState, useRef } from 'react';
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

import { compare } from '../utils';
import { useAuth, useCustomToast, useFetch } from '../hooks';
import { createNoteApi, removeSingleNoteApi, updateSingleNoteApi } from '../services/note';

export default function NotesPage({ pageType }) {
  const [currentId, setCurrentId] = useState('');
  // const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleError = useCustomToast();
  const navigate = useNavigate();
  const params = useParams();
  const auth = useAuth();
  const paramsId = params.folderId;

  const [{ notes, isLoading, isEmpty }, setNotes] = useFetch({ pageType, paramsId, current: 0 });

  const mainRef = useRef(null);
  const target = useRef(null);
  // const pageY = useRef(0); // Storing the last intersection y position

  // const handleObserve = useCallback((entries) => {
  //   const { isIntersecting } = entries[0];
  //   const { y } = entries[0].boundingClientRect;

  //   if (isIntersecting && pageY.current > y) {
  //     console.log(entries[0]);
  //     console.log(y);
  //     setCurrent((prev) => prev + 1);
  //   }

  //   pageY.current = y;
  // }, []);

  // useEffect(() => {
  //   const options = {
  //     root: mainRef.current,
  //     rootMargin: '20px',
  //     threshold: 0.8,
  //   };

  //   const observer = new IntersectionObserver(handleObserve, options);
  //   if (target.current) observer.observe(target.current);
  // }, [handleObserve]);

  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }

  function handleModelVisible(id, type) {
    onOpen();

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
      onClose();
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
      onClose();
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

    const updatedNotes = pageType === 'star'
      ? notes.filter((item) => item.id !== id)
      : notes.map((item) => (item.id !== id ? item : changedNote));

    setNotes(updatedNotes);

    try {
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

  const noteListContent = () => (isEmpty ? (
    <EmptyPage icon={<DefaultHomeSvg />} text="写点什么吧？" />
  ) : (
    <ul>{noteItems}</ul>
  ));

  return (
    <div className="relative flex h-screen">
      <AsideBlock />
      <main ref={mainRef} className="flex-grow h-screen overflow-y-auto">
        <div className="px-6 md:w-4/5 lg:w-2/3 mx-auto">
          <NotesHeader handleLogout={auth.logout} />
          <TextEditor handleNoteSubmit={handleNoteAdd} />
          {isLoading ? (
            <div className="relative h-screen grid place-items-center">
              <Spinner color="teal.500" />
            </div>
          ) : (
            noteListContent()
          )}
          <div ref={target} />
        </div>
      </main>

      <AlertCustomDialog
        handleConfirm={() => handleNoteDelete(currentId)}
        handleClose={() => setVisible(false)}
        isOpen={visible}
        message={{ headerText: '删除笔记', bodyText: '确定删除这条笔记吗？' }}
      />

      <Modal onClose={onClose} isOpen={isOpen} size="4xl">
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
