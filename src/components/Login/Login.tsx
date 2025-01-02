import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./Login.scss";
import logo5NTT from "../../assets/images/Logo-5NTT.svg";
import logoLogin from "../../assets/images/Logo-login.svg";
import { ThreeCircles } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { LoadingProvider } from "./ContextLoading";

function Login() {
  const [loading, setLoading] = useState<boolean>(false);

  if (loading) {
    return (
      <div className="loading-container">
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#f26d21"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        <h1>Đang đăng nhập...</h1>
      </div>
    );
  }

  return (
    <LoadingProvider setLoading={setLoading}>
      <div className="login-container">
        <div className="container">
          <div className="header d-flex justify-content-between align-items-start">
            <img src={logo5NTT} alt="NTT" className="col-8 col-md-4" />
            <h3 className="title col-6 d-none d-md-block">
              <span>Hệ thống tuyển dụng</span> <br /> và quản lý sinh viên thực
              tập
            </h3>
          </div>

          <div className="body d-flex align-items-center">
            <div className="col-12 col-md-6 child-outlet">
              <Outlet />
            </div>
            <img
              src={logoLogin}
              alt="logo"
              className="col-6 d-none d-md-block"
            />
          </div>

          <div className="back-home">
            <Link to="/">
              <span>Back home</span>
            </Link>
          </div>
        </div>
      </div>
    </LoadingProvider>
  );
}

export default Login;
