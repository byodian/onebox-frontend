import {
  useState, useEffect, useRef,
} from 'react';
import { Navigate, useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NoteList } from 'feature/note/note-list';
import { EmptyPage } from '../components/empty-page';
import { TextEditor } from '../feature/editor';
import { NoteHeader } from '../layout/header/note-header';
import { AsideBlock } from '../layout/aside';
import { ReactComponent as DefaultHomeSvg } from '../assets/svg/defaultHome.svg';

import {
  getNotesApi,
  createNoteApi,
  removeSingleNoteApi,
  updateSingleNoteApi,
} from '../api/note';
import { getAllFolders } from '../api/folder';
import { compare } from '../utils/common';
import { getEditorContent } from '../utils/auth';

import { useAuth, useCustomToast } from '../hooks';

export default function NotesPage({ pageType }) {
  const [folders, setFolders] = useState([]);
  const [notes, setNotes] = useState([]);
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const auth = useAuth();
  const paramsId = params.folderId;

  const pageTypeRef = useRef(pageType);
  const folderRef = useRef(paramsId);

  const handleError = useCustomToast();

  const pageSize = 15;
  const fetchNotes = async (pageNum = 0) => {
    let result;
    setIsLoading(true);

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

  const handleNoteAdd = async (noteObject) => {
    const createdNote = await createNoteApi(noteObject);
    setNotes(notes.concat(createdNote).sort(compare));
  };

  const handleNoteUpdate = async (currentId, updatedNote) => {
    const folderId = updatedNote.folderId ? updatedNote.folderId : '';
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
  };

  const handleStarToggle = async (id) => {
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
  };

  const handleFolderUpdate = async (folderId, currentNoteId) => {
    const note = notes.find((item) => item.id === currentNoteId);
    const changedNote = { ...note, folderId };

    const updatedNotes = notes.map((item) => (
      item.id === currentNoteId ? changedNote : item
    ));

    setNotes(updatedNotes);

    try {
      await updateSingleNoteApi(currentNoteId, changedNote);
    } catch (error) {
      handleError(error);
    }
  };

  const handleNoteDelete = async (id) => {
    try {
      setNotes(notes.filter((n) => n.id !== id));
      await removeSingleNoteApi(id);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="relative flex h-screen md:w-4/5 lg:w-[900px] mx-auto">
      <AsideBlock folders={folders} setFolders={setFolders} />
      <main className="flex-grow h-screen overflow-y-auto">
        <div className="pl-6 h-full flex flex-col">
          <NoteHeader handleLogout={auth.logout} />
          <TextEditor
            initialContent={getEditorContent()}
            onSubmit={handleNoteAdd}
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
              <NoteList
                notes={notes}
                folders={folders}
                handleNoteUpdate={handleNoteUpdate}
                handleNoteDelete={handleNoteDelete}
                handleStarToggle={handleStarToggle}
                handleFolderUpdate={handleFolderUpdate}
              />
            </InfiniteScroll>
          </div>

          {!isLoading && notes.length === 0 && (
            <EmptyPage icon={<DefaultHomeSvg />} text="写点什么吧？" />
          )}
        </div>
      </main>
    </div>
  );
}
