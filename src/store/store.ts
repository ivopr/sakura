import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { accountApi } from "./apis/account";
import { characterApi } from "./apis/character";
import { counterReducer } from "./slices/counter";

export const store = configureStore({
  reducer: {
    [accountApi.reducerPath]: accountApi.reducer,
    [characterApi.reducerPath]: characterApi.reducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(accountApi.middleware, characterApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
