import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IoClose } from "react-icons/io5";
import "./Modal.scss";
import { JobAdmin } from "../../Types/admin";
import {
  deleteJobData,
  updateJobIsActive,
} from "../../firebase/adminController";

interface ModalConfirmProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  job: JobAdmin | null;
  setJob: React.Dispatch<React.SetStateAction<JobAdmin | null>>;
  onJobUpdated: () => void;
}

function ModalConfirm({
  show,
  setShow,
  type,
  job,
  setJob,
  onJobUpdated,
}: ModalConfirmProps) {
  const handleClose = () => {
    setShow(false);
    setJob(null);
  };

  // Xác định thông báo hiển thị
  const getMessage = () => {
    if (type === "ISACTIVE") {
      if (job?.isActive) {
        return "Bạn chắc chắn muốn ẩn công việc này không?";
      } else {
        return "Bạn chắc chắn muốn hiển thị công việc này không?";
      }
    } else if (type === "DELETE") {
      return "Bạn chắc chắn muốn xóa vĩnh viễn công việc này không?";
    }
    return "Thông báo không xác định.";
  };

  const handleConfirm = async () => {
    try {
      if (!job) {
        console.error("Job is null");
        return;
      }

      if (type === "ISACTIVE") {
        await updateJobIsActive(job.id, !job.isActive);
        onJobUpdated();
      } else if (type === "DELETE") {
        await deleteJobData(job.id);
        onJobUpdated();
      }

      setShow(false);
      setJob(null);
    } catch (error) {
      console.error("Error handling confirm action:", error);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered={true}
        className="modal-confirm-container"
      >
        <div className="icon-close" onClick={() => handleClose()}>
          {" "}
          <IoClose />
        </div>
        <Modal.Body>
          <h2>Thông báo</h2>
          <p>{getMessage()}</p>

          <div className="d-flex">
            <Button onClick={handleClose} className="btn-closed">
              Hủy
            </Button>
            <Button onClick={handleConfirm} className="btn-confirm">
              Xác nhận
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalConfirm;
