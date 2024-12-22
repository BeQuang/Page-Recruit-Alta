import { useEffect, useState } from "react";
import {
  fetchAllAreasExpertise,
  fetchAllCompany,
} from "../../firebase/listDropdownController";
import { fetchAllJobs } from "../../firebase/jdController"; // Import API lấy công việc
import { JobItem as JobList } from "../../Types/job";

export const useFetchDataListJD = ({
  setAreasExpertises,
  setCompanys,
}: any) => {
  useEffect(() => {
    const fetchAreasExpertises = async () => {
      try {
        const data = await fetchAllAreasExpertise();
        setAreasExpertises(data);
      } catch (error) {
        console.error("Error fetching apply positions:", error);
      }
    };

    const fetchCompanys = async () => {
      try {
        const data = await fetchAllCompany();
        setCompanys(data);
      } catch (error) {
        console.error("Error fetching implementation forms:", error);
      }
    };

    fetchAreasExpertises();
    fetchCompanys();
  }, [setAreasExpertises, setCompanys]);

  return null;
};

export function useJobSearch(
  areasExpertise: string,
  company: string,
  textSearcher: string
): JobList[] {
  const [jobList, setJobList] = useState<JobList[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllJobs(); // Gọi API lấy dữ liệu

        // Lọc công việc dựa trên các điều kiện
        const filteredJobs = response.filter((job) => {
          const matchesExpertise =
            areasExpertise &&
            areasExpertise.trim() !== "" &&
            areasExpertise !== "Tất cả"
              ? job.work.toLowerCase().includes(areasExpertise.toLowerCase())
              : true;
          const matchesCompany =
            company && company.trim() !== "" && company !== "Tất cả"
              ? job.company.toLowerCase().includes(company.toLowerCase())
              : true;
          const matchesSearchText =
            textSearcher && textSearcher.trim() !== "" // Kiểm tra `textSearcher`
              ? job.work.toLowerCase().includes(textSearcher.toLowerCase()) ||
                job.company.toLowerCase().includes(textSearcher.toLowerCase())
              : true;

          return matchesExpertise && matchesCompany && matchesSearchText;
        });

        setJobList(filteredJobs); // Cập nhật jobList với các công việc thỏa mãn các điều kiện
      } catch (error) {
        console.log("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, [areasExpertise, company, textSearcher]); // Thêm textSearcher vào dependency array

  return jobList;
}
