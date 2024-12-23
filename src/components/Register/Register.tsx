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
import { validRegisterOnline } from "../Validate/Validate";
import { CgDanger } from "react-icons/cg";
import ModalRegisterSuccess from "../../Modal/ModalRegisterSuccess";

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

  const [errorInput, setErrorInput] = useState<number>(0);
  const [isModalSuccess, setIsModalSuccess] = useState<boolean>(false);

  const resetData = () => {
    setSelectedFile(null);
    setSelectedDate(null);
    setLocation("");
    setShape("");
    setImplement("");
    setKnown("");
    setName("");
    setSchool("");
    setSpecialized("");
    setEmail("");
    setPhone("");
    setErrorInput(0);
  };

  const handleSubmit = async () => {
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

    const checkValidInput = validRegisterOnline({
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
    });

    if (checkValidInput !== 0) {
      setErrorInput(checkValidInput);
      return;
    }

    // Gọi hàm lưu dữ liệu
    await saveDataToFirestore(formData);
    setErrorInput(0);
    setIsModalSuccess(true);
    resetData();
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
    <>
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
              {errorInput === 11 ? (
                <div className="text-danger d-flex error-text">
                  <div className="icon-danger me-2">
                    <CgDanger />
                  </div>
                  <span>Vui lòng chọn file</span>
                </div>
              ) : null}
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
                  className={errorInput === 1 ? "is-error" : ""}
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
                  className={errorInput === 4 ? "is-error" : ""}
                />
                {errorInput === 4 ? (
                  <div className="text-danger d-flex error-text">
                    <div className="icon-danger me-2">
                      <CgDanger />
                    </div>
                    <span>Email không hợp lệ</span>
                  </div>
                ) : null}
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
              {errorInput === 10 ? (
                <div className="text-danger d-flex error-text">
                  <div className="icon-danger me-2">
                    <CgDanger />
                  </div>
                  <span>Vui lòng chọn ngày sinh</span>
                </div>
              ) : null}
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
                  className={errorInput === 5 ? "is-error" : ""}
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
              {errorInput === 6 ? (
                <div className="text-danger d-flex error-text">
                  <div className="icon-danger me-2">
                    <CgDanger />
                  </div>
                  <span>Vui lòng chọn vị trí ứng tuyển</span>
                </div>
              ) : null}
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
              {errorInput === 7 ? (
                <div className="text-danger d-flex error-text">
                  <div className="icon-danger me-2">
                    <CgDanger />
                  </div>
                  <span>Vui lòng chọn hình thức đăng ký</span>
                </div>
              ) : null}
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
              {errorInput === 8 ? (
                <div className="text-danger d-flex error-text">
                  <div className="icon-danger me-2">
                    <CgDanger />
                  </div>
                  <span>Vui lòng chọn hình thức thực hiện</span>
                </div>
              ) : null}
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
              {errorInput === 9 ? (
                <div className="text-danger d-flex error-text">
                  <div className="icon-danger me-2">
                    <CgDanger />
                  </div>
                  <span>Vui lòng chọn lý do</span>
                </div>
              ) : null}
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
                  className={errorInput === 2 ? "is-error" : ""}
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
                  className={errorInput === 3 ? "is-error" : ""}
                />
              </Form.Group>
            </div>
          </div>
        </div>

        {errorInput ? (
          <div className="notice">
            <span className="text-danger">*</span>
            <span> Là những thông tin bắt buộc</span>
          </div>
        ) : null}

        <button className="btn btn-submit" type="button" onClick={handleSubmit}>
          <span>Gửi</span>
          <FiSend className="icon" />
        </button>
      </div>

      <ModalRegisterSuccess show={isModalSuccess} setShow={setIsModalSuccess} />
    </>
  );
}

export default Register;
