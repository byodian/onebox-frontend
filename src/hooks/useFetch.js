import {
  useState, useEffect, useCallback, useRef,
} from 'react';

import { getNotesApi } from '../services/note';
import { getSingleFolderApi } from '../services/folder';

export default function useFetch({ pageType, paramsId, pageSize }) {
  const [notes, setNotes] = useState([]);
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const pageTypeRef = useRef(pageType);
  const folderRef = useRef(paramsId);

  const fetchNotes = useCallback(async () => {
    let result;
    setIsLoading(true);
    setIsError(false);

    // 跳转页面后，重置数据
    if (pageTypeRef.current !== pageType || folderRef.current !== paramsId) {
      setNotes([]);
      setCurrent(0);
      setCount(0);
      pageTypeRef.current = pageType;
      folderRef.current = paramsId;
    }

    try {
      if (pageType === 'folder') {
        const folder = await getSingleFolderApi(paramsId);
        result = folder.notes;
      } else {
        result = await getNotesApi(pageType, { pageSize, current });
      }

      const fetchedNotes = pageType === 'folder' ? result : result.data;
      const total = pageType === 'folder' ? fetchedNotes.length : result.count;

      setNotes((prevNotes) => [...prevNotes, ...fetchedNotes]);
      setCount(total);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  }, [paramsId, pageType, current, pageSize]);

  useEffect(() => {
    fetchNotes();

    // cleanup
    return () => {
      console.log('unmounted');
    };
  }, [fetchNotes]);

  return [
    {
      isLoading, isError, notes, count,
    },
    setNotes,
    setCurrent,
  ];
}
