import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/user.slice";
import titleContest from "./slices/titleContest.slice";

const store = configureStore({
  reducer: {
    user,
    titleContest,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
