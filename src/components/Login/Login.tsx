import "./Login.scss";
import logo5NTT from "../../assets/images/Logo-5NTT.svg";
import logoLogin from "../../assets/images/Logo-login.svg";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login-container">
      <div className="container">
        <div className="header d-flex justify-content-between align-items-start">
          <img src={logo5NTT} alt="NTT" className="imageNTT col-6" />
          <h3 className="title col-6">
            <span>Hệ thống tuyển dụng</span> <br /> và quản lý sinh viên thực
            tập
          </h3>
        </div>

        <div className="body d-flex align-items-center">
          <div className="col-6 child-outlet">
            <Outlet />
          </div>
          <img src={logoLogin} alt="logo" className="col-6" />
        </div>

        <Link to="/" className="back-home col-6">
          <span>Back home</span>
        </Link>
      </div>
    </div>
  );
}

export default Login;
