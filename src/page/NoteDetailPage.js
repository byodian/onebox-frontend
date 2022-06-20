import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { Container, Content, ContentWrap } from './AppStyles';

import noteService from '../api/note';
import { getLocalDate } from '../utils';

import { useParams } from 'react-router-dom';

const DetailsContent = ({ note }) => {
  return (
    <>
      <p>
        <time>{getLocalDate(note.date)}</time>
      </p>
      {parse(note.content)}
    </>
  );
};

const Details = () => {
  const params = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const returnedNote = await noteService.getById(params.id);
        setNote(returnedNote);
      } catch(error) {
        console.log(error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <Container>
      <main>
        <ContentWrap>
          <Content>
            <div>
              {note
                ? <DetailsContent note={note} />
                : null
              }
            </div>
          </Content>
        </ContentWrap>
      </main>

    </Container>
  );
};

export default Details;
