import { createSlice } from "@reduxjs/toolkit";
import { Contest } from "../../Types/contest";

// Lấy dữ liệu ban đầu từ sessionStorage
const initialState: Contest[] | null = JSON.parse(
  sessionStorage.getItem("titleContest") || "null"
);

const titleContestSlice = createSlice({
  name: "titleContest",
  initialState,
  reducers: {
    setTitleContest: (state, action) => {
      // Format lại dữ liệu để chứa cả title, fullTime và timeCurrent
      const formattedData = action.payload.map(
        (contest: {
          title: string;
          fullTime: number;
          timeCurrent: number;
        }) => ({
          text: contest.title,
          fullTime: contest.fullTime,
          timeCurrent: contest.timeCurrent,
        })
      );

      // Lưu dữ liệu vào sessionStorage dưới dạng JSON
      sessionStorage.setItem("titleContest", JSON.stringify(formattedData));
      return formattedData;
    },
    clearTitleContest: () => {
      sessionStorage.removeItem("titleContest");
      return null;
    },
    updateFullTime: (state, action) => {
      const { title, newFullTime } = action.payload;

      // Tìm contest theo title và cập nhật fullTime và timeCurrent
      const contestToUpdate = state?.find((contest) => contest.text === title);
      if (contestToUpdate) {
        contestToUpdate.timeCurrent = newFullTime; // Cập nhật timeCurrent khi fullTime thay đổi

        // Cập nhật lại sessionStorage
        sessionStorage.setItem("titleContest", JSON.stringify(state));
      }
    },
    resetTime: (state, action) => {
      const { title } = action.payload;

      // Tìm contest theo title và cập nhật timeCurrent bằng với fullTime
      const contestToUpdate = state?.find((contest) => contest.text === title);
      if (contestToUpdate) {
        contestToUpdate.timeCurrent = contestToUpdate.fullTime;

        // Cập nhật lại sessionStorage
        sessionStorage.setItem("titleContest", JSON.stringify(state));
      }
    },
  },
});

export const { setTitleContest, clearTitleContest, updateFullTime, resetTime } =
  titleContestSlice.actions;
export default titleContestSlice.reducer;
