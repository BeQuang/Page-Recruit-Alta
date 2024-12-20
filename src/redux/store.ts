import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/user.slice";
import titleContest from "./slices/titleContest.slice";
import images from "./slices/images.slice";

const store = configureStore({
  reducer: {
    user,
    titleContest,
    images,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
