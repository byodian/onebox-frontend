import {
  useState, useEffect, useCallback, useRef,
} from 'react';

import { getNotesApi } from '../services/note';
import { getSingleFolderApi } from '../services/folder';

export default function useFetch({ pageType, paramsId }) {
  const [notes, setNotes] = useState([]);
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const pageTypeRef = useRef(pageType);

  const fetchNotes = useCallback(async () => {
    let result;
    setIsLoading(true);
    setIsError(false);

    // 跳转页面后，重置数据
    if (pageTypeRef.current !== pageType) {
      setNotes([]);
      setCurrent(0);
      setCount(0);
      pageTypeRef.current = pageType;
    }

    try {
      if (pageType === 'folder') {
        const folder = await getSingleFolderApi(paramsId);
        result = folder.notes;
      } else {
        result = await getNotesApi(pageType, { pageSize: 8, current });
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
  }, [paramsId, pageType, current]);

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
