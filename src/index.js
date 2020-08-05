import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ImagesProvider } from './contexts/ImagesContext';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ImagesProvider>
      <App />
    </ImagesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
