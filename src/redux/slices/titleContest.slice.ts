import { createSlice } from "@reduxjs/toolkit";
import { Option } from "../../Types/login";

const initialState: Option[] | null = JSON.parse(
  sessionStorage.getItem("titleContest") || "null"
);

const titleContestSlice = createSlice({
  name: "titleContest",
  initialState,
  reducers: {
    setTitleContest: (state, action) => {
      const formattedData = action.payload.map((title: string) => ({
        text: title,
      }));
      sessionStorage.setItem("titleContest", JSON.stringify(formattedData));
      return formattedData;
    },
    clearTitleContest: () => {
      sessionStorage.removeItem("titleContest");
      return null;
    },
  },
});

export const { setTitleContest, clearTitleContest } = titleContestSlice.actions;
export default titleContestSlice.reducer;
