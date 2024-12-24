import { GoPlus } from "react-icons/go";
import "./Manager.scss";
import Table from "react-bootstrap/Table";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { BsEye } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import ModalAdmin from "../Modal/ModalAdmin";
import { useEffect, useState } from "react";
import { fetchAllJobs } from "../../firebase/jdController";
import { JobAdmin } from "../../Types/admin";

function ManagerRecruit() {
  const [isModalAdmin, setIsModalAdmin] = useState(false);
  const [jobs, setJobs] = useState<JobAdmin[]>([]);
  const [currentJob, setCurrentJob] = useState<JobAdmin | null>(null);
  const [type, setType] = useState<string>("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await fetchAllJobs();
      setJobs(data); // Không còn lỗi TS2345
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu jobs:", error);
    }
  };

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
          <Table bordered hover>
            <thead>
              <tr className="title">
                <th>ID</th>
                <th>Tên công việc</th>
                <th>Tên công ty</th>
                <th>Nơi làm việc</th>
                <th>Mô tả</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length > 0 ? (
                jobs.map((job, index) => (
                  <tr key={job.id}>
                    <td>{index + 1}</td>
                    <td>{job.work}</td>
                    <td>{job.company}</td>
                    <td>{job.country.join(", ")}</td>
                    <td>{job.request}</td>
                    <td className="icon">
                      <HiOutlinePencilAlt
                        className="update"
                        onClick={() => handleUpdateAdmin(job)}
                      />
                      <BsEye className="un-hidden" />
                      <FaRegTrashAlt className="delete" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>

      <ModalAdmin
        show={isModalAdmin}
        setShow={setIsModalAdmin}
        type={type}
        job={currentJob}
        onJobUpdated={fetchJobs}
      />
    </>
  );
}

export default ManagerRecruit;
