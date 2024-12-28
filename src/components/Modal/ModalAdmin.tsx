import Modal from "react-bootstrap/Modal";
import { IoClose } from "react-icons/io5";
import Dropdown from "../Dropdown/Dropdown";
import { useEffect, useState } from "react";
import FormInput from "../Input/FormInput"; // Import new FormInput component
import FileInput from "../Input/FileInput"; // Import new FileInput component
import { provincesWithText } from "../../Types/dataCountry";
import { validateFormAdmin } from "../Validate/Validate";
import { createJobData, updateJobData } from "../../firebase/adminController";
import { JobAdmin } from "../../Types/admin";
import ErrorInput from "../Input/ErrorInput"; // Import new ErrorText component
import { Form } from "react-bootstrap";

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
    } else resetData();
  }, [job, show]);

  const resetData = () => {
    setName("");
    setEmail("");
    setWork("");
    setDescription("");
    setLocation("");
    setPhone("");
    setSelectedFile(null);
    setSelectedLogo(null);
    setErrorInput(0);
  };

  const handleClose = () => {
    resetData();
    setShow(false);
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
    if (type === "CREATE") {
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
    } else if (type === "UPDATE" && job) {
      await updateJobData(job.id, work, description, location, selectedFile);
    }
    await onJobUpdated();
    resetData();
    setShow(false);
  };

  return (
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
          <FormInput
            id="name"
            label="Tên công ty"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errorInput === 1}
            disabled={type === "UPDATE"}
          />
          <FormInput
            id="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errorInput === 2}
            disabled={type === "UPDATE"}
          />
        </div>
        <div className="row mb-3">
          <FormInput
            id="work"
            label="Công việc"
            value={work}
            onChange={(e) => setWork(e.target.value)}
            error={errorInput === 3}
          />
          <FormInput
            id="description"
            label="Mô tả"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={errorInput === 4}
          />
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
              <ErrorInput
                errorCode={5}
                errorMessage="Vui lòng chọn nơi làm việc"
              />
            )}
          </div>
          <FormInput
            id="phone"
            label="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={errorInput === 6}
            disabled={type === "UPDATE"}
          />
        </div>
        <div className="row mb-3">
          <FileInput
            id="inputFile"
            label="Chọn file"
            selectedFile={selectedFile}
            onChange={(e) =>
              setSelectedFile(e.target.files ? e.target.files[0] : null)
            }
            triggerFileInput={() =>
              document.getElementById("inputFile")?.click()
            }
            error={errorInput === 7 && type !== "UPDATE"}
          />
          <FileInput
            id="inputLogo"
            label="Chọn logo"
            selectedFile={selectedLogo}
            onChange={(e) =>
              setSelectedLogo(e.target.files ? e.target.files[0] : null)
            }
            triggerFileInput={() =>
              document.getElementById("inputLogo")?.click()
            }
            error={errorInput === 8 && type !== "UPDATE"}
            disabled={type === "UPDATE"}
          />
        </div>
        {errorInput !== 0 && (
          <div className="notice">
            <span className="text-danger">*</span>
            <span> Là những thông tin bắt buộc</span>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-confirm" onClick={handleConfirm}>
          {type === "UPDATE" ? "Cập nhật" : "Xác nhận"}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAdmin;
