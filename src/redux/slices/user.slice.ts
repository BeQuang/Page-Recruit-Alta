import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInformation } from "../../firebase/userController";
import { preProcessingImage } from "../../components/PreProcessingImage/PreProcessingImage";

// Định nghĩa kiểu dữ liệu người dùng
interface User {
  id: string; // id là bắt buộc
  name: string | null; // name có thể là null
  avatarUrl: string | null; // avatarUrl có thể là null
}

interface UserState {
  user: User | null; // Người dùng có thể là null khi chưa đăng nhập
  loading: boolean;
  error: string | null;
}

// Thực hiện async thunk để lấy thông tin người dùng từ Firestore
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (uid: string, { rejectWithValue }) => {
    try {
      // Lấy thông tin người dùng từ Firestore
      const res = await getUserInformation(uid);

      if (!res) {
        throw new Error("No such document!");
      }

      // Xử lý ảnh nếu có
      const linkImageConvert = preProcessingImage(res.avatarUrl);

      // Cấu trúc lại dữ liệu trước khi lưu vào Redux store
      const dataRedux: User = {
        id: res.id, // Đảm bảo có id
        name: res.name || null, // Cấp giá trị null nếu không có name
        avatarUrl: linkImageConvert || null, // Cấp giá trị null nếu không có avatarUrl
      };

      return dataRedux;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message); // Xử lý lỗi kiểu unknown
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

// Định nghĩa trạng thái ban đầu
const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

// Tạo slice cho user
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Cập nhật user từ action.payload
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Lưu lỗi nếu có
      });
  },
});

// Các actions của userSlice
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
