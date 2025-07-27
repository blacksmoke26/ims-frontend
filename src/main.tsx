// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

// components
import App from './App.tsx';

// styles
import './styles/index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  </StrictMode>,
);
