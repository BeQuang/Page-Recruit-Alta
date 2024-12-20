import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Contest } from "../../Types/contest";
import { fetchAllTitles } from "../../firebase/listDropdownController";

// Định nghĩa kiểu trạng thái cho Redux
interface ContestState {
  contests: Contest[] | null;
  loading: boolean;
  error: string | null;
}

// Lấy dữ liệu contest từ Firestore
export const fetchContestData = createAsyncThunk(
  "contest/fetchContestData",
  async (uid: string, { rejectWithValue }) => {
    try {
      const res = await fetchAllTitles();

      if (res) {
        // Đảm bảo mỗi contest có timeCurrent mặc định là 0
        const formattedContests = res.map(
          (contest: { title: string; fullTime: number }) => ({
            text: contest.title, // Chuyển đổi title thành text
            fullTime: contest.fullTime,
            timeCurrent: 0, // Thiết lập timeCurrent mặc định là 0
          })
        );

        return formattedContests;
      } else {
        throw new Error("No contest data found.");
      }
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred.");
      }
    }
  }
);

const initialState: ContestState = {
  contests: null,
  loading: false,
  error: null,
};

const contestSlice = createSlice({
  name: "contest",
  initialState,
  reducers: {
    setContests: (state, action) => {
      state.contests = action.payload;
    },
    clearContests: (state) => {
      state.contests = null;
    },
    updateFullTime: (state, action) => {
      const { title, newFullTime } = action.payload;

      // Tìm contest theo title và cập nhật fullTime
      const contestToUpdate = state.contests?.find(
        (contest) => contest.text === title
      );
      if (contestToUpdate) {
        contestToUpdate.fullTime = newFullTime;
        contestToUpdate.timeCurrent = newFullTime; // Cập nhật timeCurrent nếu cần
      }
    },
    resetTime: (state, action) => {
      const { title } = action.payload;

      // Tìm contest theo title và đặt lại timeCurrent = fullTime
      const contestToUpdate = state.contests?.find(
        (contest) => contest.text === title
      );
      if (contestToUpdate) {
        contestToUpdate.timeCurrent = contestToUpdate.fullTime;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContestData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContestData.fulfilled, (state, action) => {
        state.loading = false;
        state.contests = action.payload;
      })
      .addCase(fetchContestData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setContests, clearContests, updateFullTime, resetTime } =
  contestSlice.actions;
export default contestSlice.reducer;
