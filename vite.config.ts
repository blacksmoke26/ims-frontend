// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  build: {
    sourcemap: 'inline'
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '~styles': path.resolve(__dirname, 'src/styles'),
      '~pages': path.resolve(__dirname, 'src/pages'),
      '~components': path.resolve(__dirname, 'src/components'),
      '~store': path.resolve(__dirname, 'src/store'),
      '~helpers': path.resolve(__dirname, 'src/helpers'),
      '~hooks': path.resolve(__dirname, 'src/hooks'),
      '~types': path.resolve(__dirname, 'src/types'),
    },
  },
  plugins: [react(), tailwindcss()],
});
