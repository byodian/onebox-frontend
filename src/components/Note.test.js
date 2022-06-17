import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Note from '..';

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-teting-library',
    imortant: true
  };

  const mockHandler = jest.fn();

  const component = render(
    <Note note={note} toggleImportance={mockHandler} />
  );

  component.debug();
  const li = component.container.querySelector('li');
  console.log(prettyDOM(li));

  // method 1
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-teting-library'
  );

  // method 2
  const element = component.getByText(
    'Component testing is done with react-teting-library'
  );
  expect(element).toBeDefined();

  // method 3
  const div = component.container.querySelector('.note');
  expect(div).toHaveTextContent(
    'Component testing is done with react-teting-library'
  );

  const button = component.getByText('make important');
  fireEvent.click(button);
  expect(mockHandler.mock.calls).toHaveLength(1);
});
