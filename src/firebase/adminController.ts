import { addDoc, collection } from "firebase/firestore";
import { uploadFileToCloudinary } from "../cloudinary/Cloudinary";
import { firestore } from "./userController";
import axios from "axios";

const jobCollection = collection(firestore, "job");

// Hàm tạo dữ liệu job mới và lưu vào Firestore
export const createJobData = async (
  name: string,
  email: string,
  work: string,
  description: string,
  location: string | string[],
  phone: string,
  selectedFile: File | null,
  selectedLogo: File | null
) => {
  try {
    let fileURL = "";
    let logoURL = "";

    // Kiểm tra và upload file nếu có
    if (selectedFile) {
      console.log(selectedFile);
      console.log("Uploading file...");
      fileURL = await uploadFileToCloudinary(selectedFile);
      console.log("File uploaded to Cloudinary:", fileURL);
    }

    // Kiểm tra và upload logo nếu có
    if (selectedLogo) {
      console.log("Uploading logo...");
      logoURL = await uploadFileToCloudinary(selectedLogo);
      console.log("Logo uploaded to Cloudinary:", logoURL);
    }

    // Kiểm tra các trường dữ liệu đầu vào
    if (!name || !email || !work || !description || !phone) {
      throw new Error("Missing required fields");
    }

    // Tạo dữ liệu job mới
    const jobData = {
      name,
      email,
      work,
      description,
      location,
      phone,
      fileURL, // URL của file đã upload
      logoURL, // URL của logo đã upload
      createdAt: new Date(), // Thời gian tạo
    };

    console.log("Job data to save:", jobData);

    // Thêm dữ liệu vào Firestore
    const docRef = await addDoc(jobCollection, jobData);
    console.log("Document written with ID:", docRef.id);

    // Trả về ID của document đã tạo
    return docRef.id;
  } catch (error) {
    console.error("Error adding document:", error);

    // Kiểm tra chi tiết lỗi
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", error.response?.data);
    } else {
      console.error("General error:", error);
    }

    throw new Error("Failed to add job data");
  }
};
