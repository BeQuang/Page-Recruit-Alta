import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./userController"; // Import Firestore instance
import { preProcessingImage } from "../components/PreProcessingImage/PreProcessingImage";

// Tạo tham chiếu đến collection "job"
const jobCollection = collection(firestore, "job");

// API để lấy toàn bộ dữ liệu trong collection "job"
export const fetchAllJobs = async () => {
  try {
    // Lấy tất cả tài liệu trong collection
    const querySnapshot = await getDocs(jobCollection);

    // Chuyển đổi dữ liệu sang mảng
    const jobs = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      const urlImage = preProcessingImage(data.logo);
      return {
        id: doc.id,
        logo: urlImage || "", // Giá trị mặc định nếu thiếu
        work: data.work || "",
        company: data.company || "",
        request: data.request || "",
        email: data.email || "",
        phone: data.phone || "",
      };
    });

    return jobs;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu từ Firestore:", error);
    return [];
  }
};
