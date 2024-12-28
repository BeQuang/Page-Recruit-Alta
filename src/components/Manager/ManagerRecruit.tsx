import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import ReactPaginate from "react-paginate";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import ModalAdmin from "../Modal/ModalAdmin";
import ModalConfirm from "../Modal/ModalConfirm";
import ManagerTable from "./ManagerTable"; // Import ManagerTable
import { fetchAllJobs } from "../../firebase/jdController";
import { JobAdmin } from "../../Types/admin";
import "./Manager.scss";

function ManagerRecruit() {
  const [isModalAdmin, setIsModalAdmin] = useState(false);
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [jobs, setJobs] = useState<JobAdmin[]>([]);
  const [currentJob, setCurrentJob] = useState<JobAdmin | null>(null);
  const [type, setType] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0); // Trang hiện tại
  const itemsPerPage = 10; // Số phần tử mỗi trang

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await fetchAllJobs();
      setJobs(data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu jobs:", error);
    }
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentJobs = jobs.slice(offset, offset + itemsPerPage); // Lấy phần tử hiển thị cho trang hiện tại

  const handleOpenModalAdmin = () => {
    setIsModalAdmin(true);
    setCurrentJob(null);
    setType("CREATE");
  };

  const handleUpdateAdmin = (job: JobAdmin) => {
    setIsModalAdmin(true);
    setCurrentJob(job);
    setType("UPDATE");
  };

  const handleIsActive = (job: JobAdmin) => {
    setIsModalConfirm(true);
    setCurrentJob(job);
    setType("ISACTIVE");
  };

  const handleDelete = (job: JobAdmin) => {
    setIsModalConfirm(true);
    setCurrentJob(job);
    setType("DELETE");
  };

  return (
    <>
      <div className="manager-recruit-container">
        <button
          className="btn btn-add-item mb-3"
          onClick={() => handleOpenModalAdmin()}
        >
          <span>Thêm vị trí tuyển dụng</span>
          <GoPlus className="icon" />
        </button>

        <div className="table">
          {/* Sử dụng ManagerTable */}
          <ManagerTable
            jobs={currentJobs}
            offset={offset}
            onUpdate={handleUpdateAdmin}
            onIsActive={handleIsActive}
            onDelete={handleDelete}
          />
        </div>

        {/* Phân trang */}
        <div className="pagination-container">
          <ReactPaginate
            previousLabel={<GrFormPrevious />}
            nextLabel={<GrFormNext />}
            breakLabel={"..."}
            pageCount={Math.ceil(jobs.length / itemsPerPage)}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item previous"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item next"}
            nextLinkClassName={"page-link"}
            disabledClassName={"disabled"}
          />
        </div>
      </div>

      <ModalAdmin
        show={isModalAdmin}
        setShow={setIsModalAdmin}
        type={type}
        job={currentJob}
        onJobUpdated={fetchJobs}
      />
      <ModalConfirm
        show={isModalConfirm}
        setShow={setIsModalConfirm}
        type={type}
        job={currentJob}
        setJob={setCurrentJob}
        onJobUpdated={fetchJobs}
      />
    </>
  );
}

export default ManagerRecruit;
