import axios from "axios";

export const uploadFileToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file); // Thêm file vào formData
  formData.append("upload_preset", "ml_default"); // preset mà bạn vừa tạo

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/da2alfbg9/upload", // Đảm bảo sử dụng đúng URL với tên cloud của bạn
      formData, // Gửi formData chứa file và upload_preset
      {
        headers: {
          "Content-Type": "multipart/form-data", // Thiết lập header đúng cho việc upload file
        },
      }
    );

    // Kiểm tra và lấy URL của file đã upload
    const fileURL = response.data.secure_url;
    console.log("File uploaded successfully: ", fileURL);
    return fileURL;
  } catch (error) {
    console.error("Error uploading file: ", error);
    throw new Error("File upload failed");
  }
};
