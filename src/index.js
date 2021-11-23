import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { initializeFirebase } from "./helper/firebase"
initializeFirebase()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

