import { collection, addDoc } from "firebase/firestore";
import { firestore } from "./userController"; // Đảm bảo đã cấu hình Firebase Firestore
import { uploadFileToCloudinary } from "../cloudinary/Cloudinary"; // Đảm bảo import hàm upload

// Định nghĩa interface cho các tham số
interface FormData {
  name: string;
  school: string;
  specialized: string;
  email: string;
  phone: string;
  location: string;
  shape: string;
  implement: string;
  known: string;
  selectedDate: Date | null;
  selectedFile: File | null; // Trường file sẽ không được lưu
}

// Định nghĩa interface cho cấu trúc dữ liệu lưu vào Firestore
interface FirestoreData {
  name: string;
  school: string;
  specialized: string;
  email: string;
  phone: string;
  location: string;
  shape: string;
  implement: string;
  known: string;
  selectedDate: Date | null;
  selectedFileURL: string | null; // Trường chứa URL của file từ Cloudinary
  createdAt: Date;
}

const registerOnlineCollection = collection(firestore, "register-online");

export const saveDataToFirestore = async (
  formData: FormData
): Promise<void> => {
  const {
    name,
    school,
    specialized,
    email,
    phone,
    location,
    shape,
    implement,
    known,
    selectedDate,
    selectedFile,
  } = formData;

  // Tạo đối tượng dataToSave
  const dataToSave: FirestoreData = {
    name,
    school,
    specialized,
    email,
    phone,
    location,
    shape,
    implement,
    known,
    selectedDate,
    selectedFileURL: null, // Mặc định là null
    createdAt: new Date(), // Thêm thời gian tạo
  };

  try {
    let fileURL = null;
    // Nếu có file, upload lên Cloudinary và lấy URL
    if (selectedFile) {
      fileURL = await uploadFileToCloudinary(selectedFile); // Gọi hàm upload
      console.log("File uploaded to Cloudinary: ", fileURL);
      dataToSave.selectedFileURL = fileURL; // Lưu URL của file vào Firestore
    }

    // Lưu dữ liệu vào Firestore
    const docRef = await addDoc(registerOnlineCollection, dataToSave);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
