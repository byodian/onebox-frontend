import { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import { formatDateTime } from '../utils/format';
import { getSingleNoteApi } from '../api/note';

function Note() {
  const params = useParams();
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const returnedNote = await getSingleNoteApi(params.id);
        setNote(returnedNote);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return (
    <main className="bg-white">
      {isLoading ? (
        <Spinner color="teal.500" />
      ) : (
        <div className="prose mx-auto pt-6 md:w-4/5">
          <p>
            <time className="block text-gray-400">
              {formatDateTime(new Date(note.createdAt))}
            </time>
          </p>
          {parse(note.content)}
        </div>
      )}
    </main>
  );
}

export default Note;
