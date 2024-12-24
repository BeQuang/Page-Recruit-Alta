import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IoClose } from "react-icons/io5";
import "./Modal.scss";
import Dropdown from "../Dropdown/Dropdown";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { CgDanger } from "react-icons/cg";
import { TiCloudStorageOutline } from "react-icons/ti";
import { provincesWithText } from "../../Types/dataCountry";
import { validateFormAdmin } from "../Validate/Validate";
import { createJobData } from "../../firebase/adminController";

interface ModalAdminProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalAdmin({ show, setShow }: ModalAdminProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [work, setWork] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string | string[]>("");
  const [phone, setPhone] = useState<string>("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedLogo, setSelectedLogo] = useState<File | null>(null);

  const [errorInput, setErrorInput] = useState<number>(0);

  const handleClose = () => {
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
        <div className="title-admin">Thêm vị trí tuyển dụng</div>
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
                />
                {errorInput === 2 ? (
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

          <div className="row mb-3">
            <div className="col-6">
              <Form.Group controlId="work">
                <Form.Label>
                  Công việc<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập Công việc"
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
                  placeholder="Nhập Mô tả"
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
                value={Array.isArray(location) ? location.join(", ") : location} // Hiển thị danh sách nếu là mảng
                listOptions={provincesWithText}
                setType={(value) => setLocation(value)} // Đảm bảo kiểu đúng
                title="Chọn vị trí"
                multiple={true}
              />
              {errorInput === 5 ? (
                <div className="text-danger d-flex error-text">
                  <div className="icon-danger me-2">
                    <CgDanger />
                  </div>
                  <span>Vui lòng chọn nơi làm việc</span>
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
                  className={errorInput === 6 ? "is-error" : ""}
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
              {errorInput === 7 ? (
                <div className="text-danger d-flex error-text">
                  <div className="icon-danger me-2">
                    <CgDanger />
                  </div>
                  <span>Vui lòng chọn file</span>
                </div>
              ) : null}
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
                />
                <button
                  type="button"
                  className="btn btn-file"
                  onClick={triggerLogoInput}
                >
                  Chọn logo
                </button>
              </div>
              {errorInput === 8 ? (
                <div className="text-danger d-flex error-text">
                  <div className="icon-danger me-2">
                    <CgDanger />
                  </div>
                  <span>Vui lòng chọn file</span>
                </div>
              ) : null}
            </div>
          </div>
          {errorInput ? (
            <div className="notice">
              <span className="text-danger">*</span>
              <span> Là những thông tin bắt buộc</span>
            </div>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-confirm" onClick={() => handleConfirm()}>
            Xác nhận
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAdmin;
