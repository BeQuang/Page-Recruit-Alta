import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchImages } from "../../firebase/imagesController";
import { preProcessingImage } from "../../components/PreProcessingImage/PreProcessingImage";

// Định nghĩa kiểu dữ liệu cho state
interface ImageState {
  images: Record<string, string>; // Object chứa các ảnh đã xử lý, giá trị là string (URL của ảnh)
  loading: boolean;
  error: string | null;
}

// Khởi tạo state ban đầu
const initialState: ImageState = {
  images: {}, // Khởi tạo là object rỗng
  loading: false,
  error: null,
};

export const fetchImagesThunk = createAsyncThunk<
  Record<string, string>, // Kiểu dữ liệu trả về là object chứa các ảnh đã xử lý
  void,
  { rejectValue: string }
>("images/fetchImages", async (_, thunkAPI) => {
  try {
    const images = await fetchImages(); // Lấy object các URL ảnh từ Firebase

    const processedImages: Record<string, string> = {}; // Object để chứa các ảnh đã xử lý

    // Duyệt qua từng trường và xử lý URL ảnh
    Object.entries(images).forEach(([key, imageUrl]) => {
      // Xử lý từng URL ảnh
      const processedImage = preProcessingImage(imageUrl);

      // Lưu ảnh đã xử lý vào object
      processedImages[key] = processedImage || imageUrl; // Nếu không có kết quả xử lý, giữ nguyên URL ban đầu
    });

    return processedImages; // Trả về object chứa các ảnh đã xử lý
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || "Failed to fetch images");
  }
});

// Tạo slice
const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImagesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchImagesThunk.fulfilled,
        (state, action: PayloadAction<Record<string, string>>) => {
          state.images = action.payload; // Lưu object các ảnh đã xử lý vào state
          state.loading = false;
        }
      )
      .addCase(fetchImagesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch images";
      });
  },
});

// Export reducer
export default imageSlice.reducer;
