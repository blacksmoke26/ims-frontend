// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

// styles
import '~styles/all.min.css';
import '~styles/index.scss';

// components
import App from '~/App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  </StrictMode>,
);
