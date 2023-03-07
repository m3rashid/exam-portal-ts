import React from 'react';
import 'antd/dist/reset.css';
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import 'index.css';
import App from 'app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);
