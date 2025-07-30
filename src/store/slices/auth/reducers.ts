// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

import {createSlice} from '@reduxjs/toolkit';

// types
import type {PayloadAction} from '@reduxjs/toolkit';

// redux
import initialState from './initial-state';

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.authenticated = action.payload;
    },
  },
});

export const {
  setAuthenticated,
} = configSlice.actions;

export const reducer = configSlice.reducer;
