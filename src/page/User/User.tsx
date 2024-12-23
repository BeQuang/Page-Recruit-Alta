import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import logo5NTT from "../../assets/images/Logo-5NTT.svg";
import noImage from "../../assets/images/noImage.png";
import { RiUserSearchLine } from "react-icons/ri";
import { FaCircle } from "react-icons/fa";
import { RiBook2Line } from "react-icons/ri";
import "./User.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Contest } from "../../Types/contest";
import { auth } from "../../firebase/firebase";

function User() {
  const [isActionActive, setIsActionActive] = useState<boolean>(false);
  const navigate = useNavigate();

  // Lấy dữ liệu user từ Redux Store
  const defaultUser = { id: "", name: "", avatarUrl: "" };
  const user = useSelector((state: RootState) => state.user) || defaultUser;

  const listTitleContest: Contest[] =
    useSelector((state: RootState) => state.titleContest.contests) || [];

  useEffect(() => {
    if (window.location.pathname === "/user/process") {
      setIsActionActive(true);
    }
  }, []);

  // Kiểm tra nếu có ít nhất một contest có timeCurrent !== 0
  const isAnyTimeCurrentNotZero = listTitleContest.some(
    (contest) => contest.timeCurrent !== 0
  );

  const handleActionContest = () => {
    if (isAnyTimeCurrentNotZero) {
      return;
    }
    setIsActionActive(false);
    navigate("/user");
  };

  const handleActionProcess = () => {
    if (isAnyTimeCurrentNotZero) {
      return;
    }
    setIsActionActive(true);
    navigate("/user/process");
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
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
                // Vô hiệu hóa khi có ít nhất một contest có timeCurrent !== 0
                style={{
                  pointerEvents: isAnyTimeCurrentNotZero ? "none" : "auto",
                }}
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
                // Vô hiệu hóa khi có ít nhất một contest có timeCurrent !== 0
                style={{
                  pointerEvents: isAnyTimeCurrentNotZero ? "none" : "auto",
                }}
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
              <div
                className="avatar" // Vô hiệu hóa khi có ít nhất một contest có timeCurrent !== 0
                style={{
                  pointerEvents: isAnyTimeCurrentNotZero ? "none" : "auto",
                }}
              >
                <img
                  src={user?.user?.avatarUrl || noImage}
                  alt="metoo"
                  className="img"
                />
                <span className="name">{user?.user?.name}</span>
                <div className="setting">
                  <div onClick={() => handleLogout()}>Logout</div>
                </div>
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
