import { IoMdSearch } from "react-icons/io";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import "./JD.scss";

function JD() {
  const listOptions = [{ text: "job1" }, { text: "job2" }];
  const [type, setType] = useState<string>("");
  return (
    <div className="job-container">
      <div className="search-container d-flex bg-white">
        <div className="form-icon d-flex justify-content-center align-items-center">
          <IoMdSearch className="icon" />
          <Form.Control type="text" placeholder="Nhập vị trí muốn ứng tuyển" />
        </div>
        <div className="drop-down">
          <Dropdown
            value={type}
            listOptions={listOptions}
            setType={setType}
            title="Chọn lĩnh vực chuyên môn"
          />
        </div>
        <div className="drop-down">
          <Dropdown
            value={type}
            listOptions={listOptions}
            setType={setType}
            title="Chọn công ty"
          />
        </div>
        <div className="d-flex apply justify-content-center align-items-center">
          <IoMdSearch className="icon" />
          <button className="btn btn-apply">Tìm việc</button>
        </div>
      </div>
    </div>
  );
}

export default JD;
