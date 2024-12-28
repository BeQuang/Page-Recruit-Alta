import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./userController"; // Import Firestore instance

// Tạo tham chiếu đến collection "job"
const jobCollection = collection(firestore, "job");

// Định nghĩa kiểu dữ liệu cho công việc
export interface JobAdmin {
  id: string;
  logo: string;
  work: string;
  company: string;
  request: string;
  email: string;
  phone: string;
  link: string;
  country: string[];
}

// API để lấy toàn bộ dữ liệu trong collection "job"
export const fetchAllJobs = async () => {
  try {
    // Lấy tất cả tài liệu trong collection
    const querySnapshot = await getDocs(jobCollection);

    // Chuyển đổi dữ liệu sang mảng
    const jobs = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        logo: data.logoURL || "", // Giá trị mặc định nếu thiếu
        work: data.work || "",
        company: data.name || "",
        request: data.description || "",
        email: data.email || "",
        phone: data.phone || "",
        link: data.fileURL || "",
        country: data.location || [],
        isActive: data.isActive || false,
      };
    });

    return jobs;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu từ Firestore:", error);
    return [];
  }
};

// API để lấy toàn bộ dữ liệu trong collection "job"
export const fetchAllJobsbyActive = async (): Promise<JobAdmin[]> => {
  try {
    // Lấy tất cả tài liệu trong collection
    const querySnapshot = await getDocs(jobCollection);

    // Chuyển đổi dữ liệu sang mảng
    const jobs: JobAdmin[] = querySnapshot.docs
      .map((doc) => {
        const data = doc.data();

        // Kiểm tra isActive
        if (!data.isActive) return null;

        return {
          id: doc.id,
          logo: data.logoURL || "",
          work: data.work || "",
          company: data.name || "",
          request: data.description || "",
          email: data.email || "",
          phone: data.phone || "",
          link: data.fileURL || "",
          country: data.location || [],
        } as JobAdmin;
      })
      .filter((job): job is JobAdmin => job !== null); // Lọc và đảm bảo type không còn null

    return jobs;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu từ Firestore:", error);
    return [];
  }
};
