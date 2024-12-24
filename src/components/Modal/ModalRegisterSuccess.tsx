import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IoClose } from "react-icons/io5";
import "./Modal.scss";
import notice1 from "../../assets/images/notice1.svg";
import notice2 from "../../assets/images/notice2.svg";

interface ModalRegisterSuccessProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalRegisterSuccess({ show, setShow }: ModalRegisterSuccessProps) {
  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered={true}
        className="modal-register-success-container"
      >
        <div className="icon-close" onClick={() => handleClose()}>
          {" "}
          <IoClose />
        </div>
        <Modal.Body>
          <h2>Thông báo</h2>
          <p>Bạn đã đăng ký thành công.</p>
          <p>Vui lòng đợi phản hồi qua gmail của bạn!</p>

          <Button
            variant="primary"
            onClick={handleClose}
            className="btn-closed"
          >
            Đóng
          </Button>
        </Modal.Body>
        <img src={notice1} alt="notice1" className="notice1" />
        <img src={notice2} alt="notice2" className="notice2" />
      </Modal>
    </>
  );
}

export default ModalRegisterSuccess;
