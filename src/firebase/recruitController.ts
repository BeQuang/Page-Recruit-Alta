import { collection, addDoc } from "firebase/firestore";
import { firestore } from "./userController"; // Đảm bảo đã cấu hình Firebase Firestore
import { uploadFileToCloudinary } from "../cloudinary/Cloudinary"; // Đảm bảo import hàm upload
import {
  FirestoreDataRegisterBusiness,
  FirestoreDataRegisterOnline,
  FormDataRegisterOnline,
} from "../Types/register";

const registerOnlineCollection = collection(firestore, "register-online");
const registerBusinessCollection = collection(firestore, "register-business");

export const saveDataToFirestore = async (
  formData: FormDataRegisterOnline
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
  const dataToSave: FirestoreDataRegisterOnline = {
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

export const saveBusinessDataToFirestore = async (
  email: string,
  address: string,
  business: string,
  manager: string,
  phone: string,
  phoneManager: string
): Promise<void> => {
  // Tạo đối tượng dataToSave
  const dataToSave: FirestoreDataRegisterBusiness = {
    email,
    address,
    business,
    manager,
    phone,
    phoneManager,
    createdAt: new Date(), // Thêm thời gian tạo
  };

  try {
    // Lưu dữ liệu vào Firestore
    const docRef = await addDoc(registerBusinessCollection, dataToSave);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
