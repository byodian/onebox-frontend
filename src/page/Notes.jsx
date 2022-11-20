import { useState, useRef, useEffect } from 'react';
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
import {
  createNoteApi,
  removeSingleNoteApi,
  updateSingleNoteApi,
} from '../services/note';

export default function NotesPage({ pageType }) {
  const [currentId, setCurrentId] = useState('');
  const [visible, setVisible] = useState(false);
  // Storing the last intersection y position
  const pageY = useRef(0);
  const loadingRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleError = useCustomToast();
  const navigate = useNavigate();
  const params = useParams();
  const auth = useAuth();
  const paramsId = params.folderId;

  const [{ notes, isLoading, count }, setNotes, setCurrent] = useFetch({
    pageType,
    paramsId,
  });

  const loadingCSS = { height: '50px', margin: '30px', textAlign: 'center' };
  const loadingTextCSS = { display: isLoading ? 'block' : 'none' };

  useEffect(() => {
    const len = notes.length;
    console.log('effect');
    console.log('count', count);
    console.log('notes', len);
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1,
    };

    function handleObserve({ entries, total, currentNoteTotal }) {
      const { isIntersecting } = entries[0];
      const { y } = entries[0].boundingClientRect;

      if (isIntersecting && pageY.current > y) {
        console.log('y', y);
        console.log('count', total);
        console.log('notes', currentNoteTotal);
        if (total > currentNoteTotal) setCurrent((prev) => prev + 1);
      }

      pageY.current = y;
    }

    // https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API
    // 监听加载元素是否可见，如果可见执行回调函数
    // fix: 修复滚动无法刷新数据
    if (count >= len) {
      const observer = new IntersectionObserver(
        (entries) => handleObserve({
          entries,
          total: count,
          currentNoteTotal: len,
        }),
        options,
      );
      if (loadingRef.current) observer.observe(loadingRef.current);
    }
  }, [count, notes.length, setCurrent]);

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

  return (
    <div className="relative flex h-screen">
      <AsideBlock />
      <main className="flex-grow h-screen overflow-y-auto">
        <div className="px-6 md:w-4/5 lg:w-2/3 mx-auto">
          <NotesHeader handleLogout={auth.logout} />
          <TextEditor handleNoteSubmit={handleNoteAdd} />
          {isLoading && (
            <div className="relative h-screen grid place-items-center">
              <Spinner color="teal.500" />
            </div>
          )}
          <ul>{noteItems}</ul>
          {notes.length === 0 && (
            <EmptyPage icon={<DefaultHomeSvg />} text="写点什么吧？" />
          )}
          <div ref={loadingRef} style={loadingCSS}>
            <span style={loadingTextCSS}>Loading...</span>
          </div>
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
