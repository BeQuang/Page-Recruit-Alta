import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import "./ForgotPass.scss";
import { CgDanger } from "react-icons/cg";
import { checkEmailExit, resetPassword } from "../../firebase/userController";
import { useNavigate } from "react-router-dom";

function ForgotPass() {
  const [email, setEmail] = useState<string>("");
  const [errorInput, setErrorInput] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (email: string) => {
    const res = await checkEmailExit(email);
    if (res) {
      setErrorInput(false);
      await resetPassword(email);
      navigate("/login");
    } else {
      setErrorInput(true);
    }
  };

  return (
    <div className="forgot-pass-container">
      <h4>Quên mật khẩu</h4>
      <p>Vui lòng nhập địa chỉ email đã đăng kí để yêu cầu</p>
      <p>khôi phục lại mật khẩu</p>
      <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
        <Form.Label>
          Email<span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="email"
          placeholder="Nhập email của bạn"
          className={errorInput ? "is-error" : ""}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      {errorInput ? (
        <div className="text-danger d-flex mb-3 error-text">
          <div className="icon-danger me-2">
            <CgDanger />
          </div>
          <span>Email này chưa đăng kí tài khoản.</span>
        </div>
      ) : null}
      <button
        className="btn btn-forgot-pass"
        onClick={() => handleSubmit(email)}
      >
        Xác nhận
      </button>
      <div>
        <Link to="/login" className="back">
          Quay lại đăng nhập
        </Link>
      </div>
    </div>
  );
}

export default ForgotPass;
