import React from 'react';
import ReactDom from 'react-dom';
import Routes from './routes';
import './app/pages/global.scss'
ReactDom.render(
  <div>
    <React.StrictMode>
      <Routes/>
    </React.StrictMode>
  </div>,
  document.getElementById('root')
);