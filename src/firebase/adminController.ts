import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
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
      isActive: true,
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

export const updateJobData = async (
  id: string,
  work: string,
  description: string,
  location: string | string[],
  selectedFile?: File | null
) => {
  try {
    // Tạo đối tượng chứa các trường cần cập nhật
    const updatedData: any = {
      work,
      description,
      location,
    };

    // Kiểm tra và upload file nếu có
    if (selectedFile) {
      console.log("Uploading file...");
      const fileURL = await uploadFileToCloudinary(selectedFile);
      console.log("File uploaded to Cloudinary:", fileURL);
      updatedData.fileURL = fileURL; // Cập nhật fileURL nếu có file
    }

    // Cập nhật dữ liệu trong Firestore
    const jobDocRef = doc(firestore, "job", id); // Lấy document theo id
    await updateDoc(jobDocRef, updatedData);

    console.log("Job data updated successfully");
  } catch (error) {
    console.error("Error updating job data:", error);

    // Kiểm tra chi tiết lỗi
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", error.response?.data);
    } else {
      console.error("General error:", error);
    }

    throw new Error("Failed to update job data");
  }
};

export const updateJobIsActive = async (id: string, isActive: boolean) => {
  try {
    // Lấy tham chiếu đến document của job
    const jobDocRef = doc(firestore, "job", id);

    // Cập nhật trường isActive
    await updateDoc(jobDocRef, { isActive });

    console.log(`Job with ID: ${id} updated isActive to: ${isActive}`);
  } catch (error) {
    console.error("Error updating isActive:", error);
    throw new Error("Failed to update isActive");
  }
};

export const deleteJobData = async (id: string) => {
  try {
    // Tham chiếu đến document cần xóa
    const jobDocRef = doc(firestore, "job", id);

    // Thực hiện xóa document
    await deleteDoc(jobDocRef);

    console.log(`Job with ID: ${id} has been deleted successfully`);
  } catch (error) {
    console.error("Error deleting job data:", error);
    throw new Error("Failed to delete job data");
  }
};
