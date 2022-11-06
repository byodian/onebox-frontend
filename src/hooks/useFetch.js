import { useState, useEffect, useCallback } from 'react';

import { getNotesApi } from '../services/note';
import { getSingleFolderApi } from '../services/folder';

export default function useFetch({ pageType, paramsId }) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchNotes = useCallback(async () => {
    let fetchedNotes;
    setIsLoading(true);
    setIsEmpty(false);

    try {
      if (pageType === 'folder') {
        const folder = await getSingleFolderApi(paramsId);
        fetchedNotes = folder.notes;
      } else {
        // fetchedNotes = await getNotesApi(pageType, { pageSize: 10, current });
        fetchedNotes = await getNotesApi(pageType);
      }

      setNotes((prevNotes) => [...prevNotes, ...fetchedNotes]);

      setIsLoading(false);
      if (fetchedNotes.length === 0) setIsEmpty(true);
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
      setNotes([]);
    };
  }, [fetchNotes]);

  return [
    {
      isLoading, isEmpty, isError, notes,
    },
    setNotes,
  ];
}
