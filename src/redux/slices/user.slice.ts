import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: string | undefined;
  name: string | undefined;
  avatarUrl: string | undefined;
}

const initialState: User | null = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => action.payload,
    clearUser: () => null,
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
