import {
  useState, useEffect, useCallback, useRef,
} from 'react';

import { getNotesApi } from '../services/note';
import { getSingleFolderApi } from '../services/folder';

export default function useFetch({ pageType, paramsId }) {
  const [notes, setNotes] = useState([]);
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
      pageTypeRef.current = pageType;
      folderRef.current = paramsId;
    }

    try {
      if (pageType === 'folder') {
        const folder = await getSingleFolderApi(paramsId);
        result = folder.notes;
      } else {
        result = await getNotesApi(pageType);
      }

      const fetchedNotes = pageType === 'folder' ? result : result.data;

      setNotes((prevNotes) => [...prevNotes, ...fetchedNotes]);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  }, [paramsId, pageType]);

  useEffect(() => {
    fetchNotes();

    // cleanup
    return () => {
      console.log('unmounted');
    };
  }, [fetchNotes]);

  return [
    {
      isLoading, isError, notes,
    },
    setNotes,
  ];
}
