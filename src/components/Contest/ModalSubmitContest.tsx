import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Contest.scss";
import { createResultContest } from "../../firebase/contestController";
import { useDispatch } from "react-redux";
import { updateFullTime } from "../../redux/slices/titleContest.slice";
import { ResultSubmit } from "../../Types/contest";

interface ModalSubmitContestProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  resultSubmit: ResultSubmit;
  setResultSubmit: React.Dispatch<React.SetStateAction<ResultSubmit>>;
  remainingTime: number;
  setRemainingTime: React.Dispatch<React.SetStateAction<number>>;
  title: string;
}

function ModalSubmitContest({
  show,
  setShow,
  resultSubmit,
  setResultSubmit,
  remainingTime,
  setRemainingTime,
  title,
}: ModalSubmitContestProps) {
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = async () => {
    setResultSubmit((prevState) => ({
      ...prevState,
      submitted: true,
    }));
    await createResultContest(resultSubmit);
    setRemainingTime(0);
    dispatch(updateFullTime({ title, newFullTime: 0 }));
    setShow(false);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered={true}
      className="modal-submit-contest-container"
    >
      <Modal.Body>
        <h4>Nộp bài thi</h4>
        <p>Bạn có chắc muốn nộp bài thi không</p>
        <div>
          <Button
            variant="primary"
            onClick={handleClose}
            className="btn-un-submit"
          >
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            className="btn-submit"
          >
            Xác nhận
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalSubmitContest;
