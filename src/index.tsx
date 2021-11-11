import React from 'react';
import ReactDOM from 'react-dom';
import './scss/global/global.scss'
import App from './App';
import WordPuzzleProvider from './context/WordPuzzleContext'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <WordPuzzleProvider>
      <App />
    </WordPuzzleProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
