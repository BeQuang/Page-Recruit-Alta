import Modal from "react-bootstrap/Modal";
import { IoClose } from "react-icons/io5";
import "./Modal.scss";
import Dropdown from "../Dropdown/Dropdown";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { CgDanger } from "react-icons/cg";
import { TiCloudStorageOutline } from "react-icons/ti";
import { provincesWithText } from "../../Types/dataCountry";
import { validateFormAdmin } from "../Validate/Validate";
import { createJobData, updateJobData } from "../../firebase/adminController";
import { JobAdmin } from "../../Types/admin";

interface ModalAdminProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  job: JobAdmin | null;
  onJobUpdated: () => void; // Hàm callback mới
}

function ModalAdmin({
  show,
  setShow,
  type,
  job,
  onJobUpdated,
}: ModalAdminProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [work, setWork] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string | string[]>("");
  const [phone, setPhone] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedLogo, setSelectedLogo] = useState<File | null>(null);
  const [errorInput, setErrorInput] = useState<number>(0);

  useEffect(() => {
    if (job) {
      setName(job.company);
      setEmail(job.email);
      setWork(job.work);
      setDescription(job.request);
      setLocation(
        Array.isArray(job.country)
          ? job.country
          : job.country
          ? [job.country]
          : []
      );
      setPhone(job.phone);
    }
  }, [job]);

  const resetData = () => {
    setName("");
    setEmail("");
    setWork("");
    setDescription("");
    setLocation("");
    setPhone("");
    setSelectedFile(null);
    setSelectedLogo(null);
  };

  const handleClose = () => {
    resetData();
    setShow(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedLogo(event.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("inputFile")?.click();
  };

  const triggerLogoInput = () => {
    document.getElementById("inputLogo")?.click();
  };

  const handleConfirm = async () => {
    const checkValidInput = validateFormAdmin(
      name,
      email,
      work,
      description,
      location,
      phone,
      selectedFile,
      selectedLogo
    );

    if (checkValidInput !== 0) {
      setErrorInput(checkValidInput);
      return;
    }
    console.log(type);
    // Kiểm tra nếu là CREATE
    if (type === "CREATE") {
      // Gọi API tạo công việc mới
      await createJobData(
        name,
        email,
        work,
        description,
        location,
        phone,
        selectedFile,
        selectedLogo
      );
    }
    // Kiểm tra nếu là UPDATE
    else if (type === "UPDATE" && job) {
      console.log("Update");
      // Gọi API cập nhật công việc
      await updateJobData(
        job.id, // Truyền ID job cần cập nhật
        work, // Cập nhật công việc
        description, // Cập nhật mô tả
        location, // Cập nhật nơi làm việc
        selectedFile // Cập nhật file nếu có
      );
    }
    await onJobUpdated();
    setErrorInput(0);
    resetData();
    setShow(false);
  };

  const handleUpdateAdmin = async () => {
    if (job) {
      console.log(job.id);
      await updateJobData(
        job.id, // Truyền ID job cần cập nhật
        work, // Cập nhật công việc
        description, // Cập nhật mô tả
        location, // Cập nhật nơi làm việc
        selectedFile // Cập nhật file nếu có
      );
    }

    await onJobUpdated();
    setErrorInput(0);
    resetData();
    setShow(false);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        className="modal-admin-container"
        size="lg"
      >
        <div className="title-admin">
          {type === "CREATE"
            ? "Thêm vị trí tuyển dụng"
            : "Cập nhật vị trí tuyển dụng"}
        </div>
        <Modal.Body>
          <div className="row mb-3">
            <div className="col-6">
              <Form.Group controlId="name">
                <Form.Label>
                  Tên công ty<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên công ty"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={errorInput === 1 ? "is-error" : ""}
                  disabled={type === "UPDATE"}
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
                  className={errorInput === 2 ? "is-error" : ""}
                  disabled={type === "UPDATE"}
                />
                {errorInput === 2 && (
                  <div className="text-danger d-flex error-text">
                    <div className="icon-danger me-2">
                      <CgDanger />
                    </div>
                    <span>Email không hợp lệ</span>
                  </div>
                )}
              </Form.Group>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-6">
              <Form.Group controlId="work">
                <Form.Label>
                  Công việc<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập công việc"
                  value={work}
                  onChange={(e) => setWork(e.target.value)}
                  className={errorInput === 3 ? "is-error" : ""}
                />
              </Form.Group>
            </div>
            <div className="col-6">
              <Form.Group controlId="description">
                <Form.Label>
                  Mô tả<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập mô tả"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={errorInput === 4 ? "is-error" : ""}
                />
              </Form.Group>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-6">
              <Form.Label>
                Nơi làm việc<span className="text-danger">*</span>
              </Form.Label>
              <Dropdown
                value={Array.isArray(location) ? location.join(", ") : location}
                listOptions={provincesWithText}
                setType={(value) => setLocation(value)}
                title="Chọn vị trí"
                multiple={true}
              />
              {errorInput === 5 && (
                <div className="text-danger d-flex error-text">
                  <div className="icon-danger me-2">
                    <CgDanger />
                  </div>
                  <span>Vui lòng chọn nơi làm việc</span>
                </div>
              )}
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
                  className={errorInput === 6 ? "is-error" : ""}
                  disabled={type === "UPDATE"}
                />
              </Form.Group>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-6">
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
              {errorInput === 7 && type !== "UPDATE" && (
                <div className="text-danger d-flex error-text">
                  <div className="icon-danger me-2">
                    <CgDanger />
                  </div>
                  <span>Vui lòng chọn file</span>
                </div>
              )}
            </div>
            <div className="col-6">
              <Form.Label htmlFor="inputLogo">
                Chọn logo<span className="text-danger">*</span>
              </Form.Label>
              <div className="input-file">
                {selectedLogo ? (
                  <span className="file-name">{selectedLogo.name}</span>
                ) : (
                  <TiCloudStorageOutline className="icon" />
                )}
                <Form.Control
                  type="file"
                  id="inputLogo"
                  onChange={handleLogoChange}
                  style={{ display: "none" }}
                  disabled={type === "UPDATE"}
                />
                <button
                  type="button"
                  className="btn btn-file"
                  onClick={triggerLogoInput}
                  disabled={type === "UPDATE"}
                >
                  Chọn logo
                </button>
              </div>
              {errorInput === 8 && type !== "UPDATE" && (
                <div className="text-danger d-flex error-text">
                  <div className="icon-danger me-2">
                    <CgDanger />
                  </div>
                  <span>Vui lòng chọn file</span>
                </div>
              )}
            </div>
          </div>
          {errorInput !== 0 && (
            <div className="notice">
              <span className="text-danger">*</span>
              <span> Là những thông tin bắt buộc</span>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-confirm"
            onClick={type === "UPDATE" ? handleUpdateAdmin : handleConfirm}
          >
            {type === "UPDATE" ? "Cập nhật" : "Xác nhận"}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAdmin;
