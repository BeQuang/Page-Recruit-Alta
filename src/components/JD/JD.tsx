import { IoMdSearch } from "react-icons/io";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import "./JD.scss";
import JobItem from "./JobItem";
import { useFetchDataListJD, useJobSearch } from "./useEffectJD";
import ReactPaginate from "react-paginate"; // Import react-paginate
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import imageJD from "../../assets/images/JD.svg";

function JD() {
  // Tạo các state để lưu trữ dữ liệu trả về
  const [listAreasExpertises, setListAreasExpertises] = useState<
    { text: string }[]
  >([]);
  const [listCompanys, setListCompanys] = useState<{ text: string }[]>([]);

  const [areasExpertise, setAreasExpertise] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [textSearcher, setTextSearcher] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(0); // Trạng thái trang hiện tại
  const itemsPerPage = 9; // Số lượng công việc mỗi trang

  useFetchDataListJD({
    setAreasExpertises: setListAreasExpertises,
    setCompanys: setListCompanys,
  });

  // Sử dụng custom hook để lấy danh sách công việc đã lọc
  const jobList = useJobSearch(areasExpertise, company, textSearcher);

  // Tính toán các công việc hiển thị cho trang hiện tại
  const offset = currentPage * itemsPerPage;
  const currentJobs = jobList.slice(offset, offset + itemsPerPage);

  // Xử lý khi người dùng thay đổi trang
  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected); // Cập nhật trang hiện tại
  };

  const handleOnchangeTextSearch = (
    event: React.ChangeEvent<HTMLInputElement> // Thay đổi kiểu sự kiện thành HTMLInputElement
  ) => {
    setTextSearcher(event.target.value);
  };

  return (
    <div className="job-container">
      <div className="search-container d-flex bg-white">
        <div className="form-icon d-flex justify-content-center align-items-center">
          <IoMdSearch className="icon" />
          <Form.Control
            type="text"
            placeholder="Nhập vị trí muốn ứng tuyển"
            value={textSearcher}
            onChange={handleOnchangeTextSearch} // Cập nhật textSearcher khi thay đổi
          />
        </div>
        <div className="drop-down">
          <Dropdown
            value={areasExpertise}
            listOptions={listAreasExpertises}
            setType={(value: string | string[]) =>
              setAreasExpertise(value as string)
            }
            title="Chọn lĩnh vực chuyên môn"
          />
        </div>
        <div className="drop-down">
          <Dropdown
            value={company}
            listOptions={listCompanys}
            setType={(value: string | string[]) => setCompany(value as string)}
            title="Chọn công ty"
          />
        </div>
      </div>

      <div className="title-body">
        <div>
          <span>Tìm </span>
          <span className="focus">Công việc mơ ước </span>
          <span>của bạn</span>
        </div>
        <span>tại ngôi nhà mới</span>
      </div>

      {/* Kiểm tra có kết quả không */}
      {currentJobs.length > 0 ? (
        <>
          <div className="job-list-container">
            {currentJobs.map((job, index) => (
              <JobItem job={job} key={`jobItem-${index}`} />
            ))}
          </div>

          <div className="pagination-container">
            <ReactPaginate
              previousLabel={<GrFormPrevious />}
              nextLabel={<GrFormNext />}
              breakLabel={"..."}
              pageCount={Math.ceil(jobList.length / itemsPerPage)}
              onPageChange={handlePageClick}
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
        </>
      ) : (
        <div className="no-result d-flex justify-content-center align-items-center">
          <div className="d-flex justify-content-center align-items-center text">
            <span>
              Khi bạn đang tìm kiếm một công việc, có một số điều bạn có thể làm
            </span>
            <span>để tận dụng tối đa tìm kiếm của bạn.</span>
          </div>
          <img src={imageJD} alt="JD" />
        </div>
      )}
    </div>
  );
}

export default JD;
