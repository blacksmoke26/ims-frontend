// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

import {Provider} from 'react-redux';
import {BrowserRouter, Route, Routes} from 'react-router';

import {store} from '~store/store.ts';

// pages
import Home from '~pages/Home.tsx';
import Login from '~pages/Login.tsx';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
