import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IoClose } from "react-icons/io5";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

interface ModalSuccessProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalSuccess({ show, setShow }: ModalSuccessProps) {
  const handleClose = () => {
    navigate("/");
    setShow(false);
  };
  const navigate = useNavigate();

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered={true}
        className="modal-success-container"
      >
        <div className="icon-close" onClick={() => handleClose()}>
          {" "}
          <IoClose />
        </div>
        <Modal.Body>
          <h4>Tạo mật khẩu thành công</h4>
          <p>Đăng nhập ngay để bắt đầu</p>
          <p>nhận được các cơ hội sự nghiệp lý tưởng</p>

          <Button variant="primary" onClick={handleClose} className="btn-login">
            Đăng nhập ngay
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalSuccess;
