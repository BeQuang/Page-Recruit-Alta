import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { CgDanger } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import { changePassword } from "../../firebase/userController";
import ModalSuccess from "../Login/ModalSuccess";

function ResetPass() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorInput, setErrorInput] = useState<boolean>(false);

  const [isModalSuccess, setIsModalSuccess] = useState<boolean>(false);

  const location = useLocation();
  const email = location.state?.email || ""; // Lấy email từ state

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setErrorInput(true);
    } else {
      setErrorInput(false);
      const res = await changePassword({ email, password });

      if (res) {
        setIsModalSuccess(true);
      }
    }
  };

  return (
    <>
      <div className="reset-pass-container">
        <h4>Tạo lại mật khẩu</h4>
        <Form.Group className="mb-3 mt-3" controlId="formPassword">
          <Form.Label>
            Mật khẩu<span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập mật khẩu"
            className={errorInput ? "is-error" : ""}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 mt-3" controlId="formConfirmPassword">
          <Form.Label>
            Xác nhận mật khẩu<span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập lại mật khẩu"
            className={errorInput ? "is-error" : ""}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        {errorInput ? (
          <div className="text-danger d-flex mb-3 error-text">
            <div className="icon-danger me-2">
              <CgDanger />
            </div>
            <span>Mật khẩu không trùng khớp .</span>
          </div>
        ) : null}
        <button className="btn btn-forgot-pass" onClick={() => handleSubmit()}>
          Xác nhận
        </button>
        <div>
          <Link to="/" className="back">
            Quay lại đăng nhập
          </Link>
        </div>
      </div>

      <ModalSuccess show={isModalSuccess} setShow={setIsModalSuccess} />
    </>
  );
}

export default ResetPass;
