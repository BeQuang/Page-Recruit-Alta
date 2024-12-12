import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import logo5NTT from "../../assets/images/Logo-5NTT.svg";
import { RiUserSearchLine } from "react-icons/ri";
import { FaCircle } from "react-icons/fa";
import { RiBook2Line } from "react-icons/ri";
import "./User.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function User() {
  const [isActionActive, setIsActionActive] = useState<boolean>(false);
  const navigate = useNavigate();

  // Lấy dữ liệu user từ Redux Store
  const defaultUser = { id: "", name: "", avatarUrl: "" };
  const user = useSelector((state: RootState) => state.user) || defaultUser;
  console.log(user);

  const handleActionContest = () => {
    setIsActionActive(false);
    navigate("/user");
  };

  const handleActionProcess = () => {
    setIsActionActive(true);
    navigate("/user/process");
  };

  return (
    <div className="user-container">
      <div className="contest-container">
        <div className="container">
          <div className="header d-flex justify-content-between align-items-start">
            <img src={logo5NTT} alt="NTT" className="imageNTT col-6" />
            <div className="action col-6">
              <div
                className={!isActionActive ? "item active" : "item"}
                onClick={() => handleActionContest()}
              >
                <div className="title">
                  <div className="icon">
                    <RiUserSearchLine />
                  </div>
                  <span className="text">Thi trắc nghiệm</span>
                </div>
                <div className="text-center fs-10 point">
                  <FaCircle />
                </div>
              </div>
              <div
                className={isActionActive ? "item active" : "item"}
                onClick={() => handleActionProcess()}
              >
                <div className="title">
                  <div className="icon">
                    <RiBook2Line />
                  </div>
                  <span className="text">Tiến trình học tập</span>
                </div>
                <div className="text-center fs-10 point">
                  <FaCircle />
                </div>
              </div>
              <div className="avatar">
                <img src={user?.avatarUrl} alt="metoo" className="img" />
                <span className="name">{user?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="body-contest-container">
        <div className="container">
          <Outlet />
        </div>
      </div>

      <div className="footer-contest-container">
        <span>Alta Software - Training Team 2024</span>
      </div>
    </div>
  );
}

export default User;
