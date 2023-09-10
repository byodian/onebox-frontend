import {
  useState, useEffect, useRef,
} from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  getNotesApi,
  createNoteApi,
  removeSingleNoteApi,
  updateSingleNoteApi,
} from '../services/note';
import { getAllFolders } from '../services/folder';

import {
  NotesHeader,
  NoteItem,
  NoteItemIcon,
  EmptyPage,
  TextEditor,
  AsideBlock,
  AlertCustomDialog,
} from '../components';

import { ReactComponent as DefaultHomeSvg } from '../assets/svg/defaultHome.svg';

import { compare } from '../utils';
import { useAuth, useCustomToast } from '../hooks';

import { getEditorContent } from '../utils/auth';

export default function NotesPage({ pageType }) {
  const [currentId, setCurrentId] = useState('');
  const [currentFolderId, setCurrentFolderId] = useState('');
  const [visible, setVisible] = useState(false);
  const [folders, setFolders] = useState([]);

  const [notes, setNotes] = useState([]);
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const params = useParams();
  const auth = useAuth();
  const paramsId = params.folderId;

  const pageTypeRef = useRef(pageType);
  const folderRef = useRef(paramsId);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleError = useCustomToast();
  const navigate = useNavigate();

  const pageSize = 15;
  const fetchNotes = async (pageNum = 0) => {
    let result;
    setIsLoading(true);
    setIsError(false);

    // 跳转页面后，重置数据
    if (pageTypeRef.current !== pageType || folderRef.current !== paramsId) {
      setNotes([]);
      setCount(0);
      setCurrent(0);
      pageTypeRef.current = pageType;
      folderRef.current = paramsId;
    }

    try {
      result = await getNotesApi(pageType, {
        pageSize,
        current: pageNum,
        ...(paramsId && { folderId: paramsId }),
      });

      const { data: fetchedNotes, count: total } = result;

      setNotes((prevNotes) => [...prevNotes, ...fetchedNotes]);
      setCount(total);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  async function fetchFolders() {
    try {
      const initialFolders = await getAllFolders();
      setFolders(initialFolders);
    } catch (err) {
      handleError(err);
    }
  }

  useEffect(() => {
    fetchFolders();
  }, []);

  useEffect(() => {
    fetchNotes(current);

    return () => {
      console.log('unmounted');
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, pageType, paramsId]);

  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }

  function handleModelVisible(note, type) {
    onOpen();

    if (type === 'update') {
      setCurrentId(note.id);
      setCurrentFolderId(note.folderId);
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
    onClose();
    // TODO: 应该先调取接口，再更新本地数据
    const createdNote = await createNoteApi(noteObject);
    setNotes(notes.concat(createdNote).sort(compare));
  };

  /**
   * @param {Object} updatedNote
   * @param {String} updateNote.content
   */
  async function handleNoteUpdate(updatedNote) {
    // TODO: 应该先调取接口，再更新本地数据
    const folderId = updatedNote.folderId ? updatedNote.folderId : '';
    onClose();
    setNotes(
      notes.map((note) => (note.id === currentId
        ? { ...note, content: updatedNote.content, folderId }
        : note)),
    );
    try {
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

  const handleFolderUpdate = async (folderId) => {
    const note = notes.find((item) => item.id === currentId);
    const changedNote = { ...note, folderId };

    const updatedNotes = notes.map((item) => (item.id === currentId
      ? changedNote
      : item));

    setNotes(updatedNotes);

    try {
      await updateSingleNoteApi(currentId, changedNote);
    } catch (error) {
      handleError(error);
    }
  };

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
        folders={folders}
        star={note.star}
        toggleStar={() => handleStarToggle(note.id)}
        deleteNote={() => handleDeleteOverlayOpen(note.id)}
        toggleEditDialog={() => handleModelVisible(note, 'update')}
        goDetail={() => navigate(`/notes/${note.id}`)}
        toggleFolder={() => setCurrentId(note.id)}
        updateFolder={handleFolderUpdate}
      />
    </NoteItem>
  ));

  return (
    <div className="relative flex h-screen">
      <AsideBlock folders={folders} setFolders={setFolders} />
      <main className="flex-grow h-screen overflow-y-auto">
        <div className="px-6 md:w-4/5 lg:w-2/3 mx-auto h-full flex flex-col">
          <NotesHeader handleLogout={auth.logout} />
          <TextEditor
            initialContent={getEditorContent()}
            handleNoteSubmit={handleNoteAdd}
            folders={folders}
            handleError={(error) => handleError(error)}
          />

          <div
            className="overflow-y-auto flex-grow"
            id="scrollableDiv"
          >
            <InfiniteScroll
              dataLength={notes.length}
              next={() => {
                setCurrent((prev) => prev + 1);
              }}
              hasMore={notes.length < count}
              loader={<p className="text-center py-4">Loading...</p>}
              endMessage={(
                <p className="text-center py-4">
                  <b>Yay! You have seen it all</b>
                </p>
            )}
              scrollableTarget="scrollableDiv"
            >
              <ul>{noteItems}</ul>
            </InfiniteScroll>
          </div>

          { !isLoading && notes.length === 0 && (
            <EmptyPage icon={<DefaultHomeSvg />} text="写点什么吧？" />
          )}
        </div>
      </main>

      <AlertCustomDialog
        handleConfirm={() => handleNoteDelete(currentId)}
        handleClose={() => setVisible(false)}
        isOpen={visible}
        message={{ headerText: '删除笔记', bodyText: '确定删除这条笔记吗？' }}
      />

      <Modal onClose={onClose} isOpen={isOpen} size="4xl" closeOnOverlayClick={false}>
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
              initialFolderId={currentFolderId}
              folders={folders}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* <ButtonFloat handleClick={() => handleModelVisible(null, 'create')} /> */}
    </div>
  );
}
