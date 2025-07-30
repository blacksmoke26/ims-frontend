// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

import {combineSlices, configureStore} from '@reduxjs/toolkit';

// reducers
import {reducer as authReducer} from './slices/auth/reducers.ts';

// Combine the slices using combineSlices to create a single root reducer
// @see https://borstch.com/snippet/combining-multiple-slices-with-combineslices
const rootReducer = combineSlices({
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
