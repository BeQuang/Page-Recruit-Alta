import "./Register.scss";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { TiCloudStorageOutline } from "react-icons/ti";
import { MdDateRange } from "react-icons/md";
import DatePicker from "react-datepicker"; // Import react-datepicker
import "react-datepicker/dist/react-datepicker.css"; // Import CSS của react-datepicker
import Dropdown from "../Dropdown/Dropdown";
import { FiSend } from "react-icons/fi";
import useFetchDataListRegister from "./useFetchDataListRegister";
import { saveDataToFirestore } from "../../firebase/recruitController";

function Register() {
  // Tạo các state để lưu trữ dữ liệu trả về
  const [listApplyPositions, setListApplyPositions] = useState<
    { text: string }[]
  >([]);
  const [listRegistrationForms, setListRegistrationForms] = useState<
    { text: string }[]
  >([]);
  const [listImplementationForms, setListImplementationForms] = useState<
    { text: string }[]
  >([]);
  const [listWhereKnown, setListWhereKnown] = useState<{ text: string }[]>([]);

  useFetchDataListRegister({
    setApplyPositions: setListApplyPositions,
    setRegistrationForms: setListRegistrationForms,
    setImplementationForms: setListImplementationForms,
    setWhereKnowns: setListWhereKnown,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // State cho các trường còn lại
  const [location, setLocation] = useState<string>("");
  const [shape, setShape] = useState<string>("");
  const [implement, setImplement] = useState<string>("");
  const [known, setKnown] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [school, setSchool] = useState<string>("");
  const [specialized, setSpecialized] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const handleSubmit = () => {
    // Tạo object formData với kiểu dữ liệu đã định nghĩa
    const formData = {
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
    };

    // Gọi hàm lưu dữ liệu
    saveDataToFirestore(formData);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("inputFile")?.click();
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date); // Cập nhật giá trị ngày
  };

  return (
    <div className="register-container">
      <div>
        <h3>Điền thông tin đăng ký</h3>

        {/* Phần chọn file */}
        <div className="row mb-3">
          <div className="col-2">
            <Form.Label htmlFor="inputFile">
              Chọn file<span className="text-danger">*</span>
            </Form.Label>
            <div className="input-file">
              {selectedFile ? (
                <span className="file-name">{selectedFile.name}</span>
              ) : (
                <TiCloudStorageOutline className="icon" />
              )}
              <Form.Control
                type="file"
                id="inputFile"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <button
                type="button"
                className="btn btn-file"
                onClick={triggerFileInput}
              >
                Chọn file
              </button>
            </div>
          </div>
        </div>

        {/* Phần thông tin người dùng */}
        <div className="row mb-3">
          <div className="col-6">
            <Form.Group controlId="name">
              <Form.Label>
                Họ và tên<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập họ và tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
          </div>
          <div className="col-6">
            <Form.Group controlId="email">
              <Form.Label>
                Email<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
          </div>
        </div>

        {/* Phần chọn ngày */}
        <div className="row mb-3">
          <div className="col-6">
            <Form.Group>
              <Form.Label>
                Ngày sinh<span className="text-danger">*</span>
              </Form.Label>
              <div className="input-date">
                {/* Sử dụng react-datepicker */}
                <MdDateRange className="icon" />
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  placeholderText="Chọn ngày"
                  isClearable
                  showYearDropdown
                  scrollableMonthYearDropdown
                />
              </div>
            </Form.Group>
          </div>
          <div className="col-6">
            <Form.Group controlId="phone">
              <Form.Label>
                Số điện thoại<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="phone"
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>
          </div>
        </div>

        {/* Phần thông tin vị trí ứng tuyển */}
        <div className="row mb-3">
          <div className="col-6">
            <Form.Group controlId="location">
              <Form.Label>
                Vị trí ứng tuyển<span className="text-danger">*</span>
              </Form.Label>
              <Dropdown
                value={location}
                listOptions={listApplyPositions}
                setType={setLocation}
                title="Chọn vị trí"
              />
            </Form.Group>
          </div>
          <div className="col-6">
            <Form.Group controlId="shape">
              <Form.Label>
                Hình thức đăng ký<span className="text-danger">*</span>
              </Form.Label>
              <Dropdown
                value={shape}
                listOptions={listRegistrationForms}
                setType={setShape}
                title="Chọn hình thức"
              />
            </Form.Group>
          </div>
        </div>

        {/* Phần thông tin */}
        <div className="row mb-3">
          <div className="col-6">
            <Form.Group controlId="implement">
              <Form.Label>
                Hình thức thực hiện<span className="text-danger">*</span>
              </Form.Label>
              <Dropdown
                value={implement}
                listOptions={listImplementationForms}
                setType={setImplement}
                title="Chọn hình thức"
              />
            </Form.Group>
          </div>
          <div className="col-6">
            <Form.Group controlId="known">
              <Form.Label>
                Bạn biết đến Alta Group từ đâu?
                <span className="text-danger">*</span>
              </Form.Label>
              <Dropdown
                value={known}
                listOptions={listWhereKnown}
                setType={setKnown}
                title="Chọn lý do"
              />
            </Form.Group>
          </div>
        </div>

        {/* Phần thông tin */}
        <div className="row mb-3">
          <div className="col-6">
            <Form.Group controlId="school">
              <Form.Label>
                Trường đang học<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập Trường đang học"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                required
              />
            </Form.Group>
          </div>
          <div className="col-6">
            <Form.Group controlId="specialized">
              <Form.Label>
                Chuyên ngành<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập Chuyên ngành"
                value={specialized}
                onChange={(e) => setSpecialized(e.target.value)}
                required
              />
            </Form.Group>
          </div>
        </div>
      </div>

      <div className="notice">
        <span className="text-danger">*</span>
        <span> Là những thông tin bắt buộc</span>
      </div>

      <button className="btn btn-submit" type="button" onClick={handleSubmit}>
        <span>Gửi</span>
        <FiSend className="icon" />
      </button>
    </div>
  );
}

export default Register;
