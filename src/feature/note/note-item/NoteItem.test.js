import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoteItem from './NoteItem';

test('renders content', () => {
  const note = {
    tags: ['tag1', 'tag2'],
    date: new Date().toString(),
    content: '<p>This is a test</p>',
  };

  render(
    <NoteItem note={note}>
      <p>icon groups</p>
    </NoteItem>,
  );

  expect(screen.getByText('This is a test')).toBeInTheDocument();
});
