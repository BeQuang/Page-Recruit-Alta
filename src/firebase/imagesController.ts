import {
  collection,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { firestore } from "./userController";

// Cập nhật hàm fetchImages
export const fetchImages = async (): Promise<Record<string, string>> => {
  try {
    const querySnapshot = await getDocs(collection(firestore, "images"));
    const images: Record<string, string> = {}; // Khai báo kiểu Record<string, string>

    querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
      const data = doc.data();
      // Duyệt qua các trường của data để lấy tên trường và URL ảnh
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === "string" && value.includes("https://")) {
          images[key] = value; // Lưu tên trường và URL ảnh vào object
        }
      });
    });

    return images;
  } catch (error) {
    console.error("Error fetching images: ", error);
    throw error;
  }
};
