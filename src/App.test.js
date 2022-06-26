import React from 'react';
import ReactDOM from 'react-dom/client';
import '@testing-library/jest-dom';
import App from './App';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.createRoot(div).render(<App />);
});
