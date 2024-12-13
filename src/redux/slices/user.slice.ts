import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: string | undefined;
  name: string | undefined;
  avatarUrl: string | undefined;
}

const initialState: User | null = JSON.parse(
  localStorage.getItem("user") || "null"
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    },
    clearUser: () => {
      localStorage.removeItem("user");
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
