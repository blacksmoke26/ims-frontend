// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

import {createSlice} from '@reduxjs/toolkit';

// config
import {AUTH_TOKEN_KEY} from '~/config/constants.ts';

// redux
import initialState from './initial-state';

// types
import type {PayloadAction} from '@reduxjs/toolkit';
import type {LoginResponse} from '~types/api.types.ts';

const configSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin(state, action: PayloadAction<LoginResponse>) {
      state.authenticated = true;
      state.user = action.payload.user;
      window.localStorage.setItem(AUTH_TOKEN_KEY, action.payload.auth.token);
    },
    setLogout(state) {
      state.authenticated = false;
      state.user = null;
      window.localStorage.removeItem(AUTH_TOKEN_KEY);
    },
  },
});

export const {
  setLogin,
  setLogout,
} = configSlice.actions;

export const reducer = configSlice.reducer;
