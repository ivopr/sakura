import { configureStore } from "@reduxjs/toolkit";

import { accountsApi } from "./api/accounts";
import { playersApi } from "./api/players";

export const store = configureStore({
  reducer: {
    [accountsApi.reducerPath]: accountsApi.reducer,
    [playersApi.reducerPath]: playersApi.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
