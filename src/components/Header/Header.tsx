import { useState, useEffect } from "react";
import { FaCircle } from "react-icons/fa";
import { RiUserSearchLine } from "react-icons/ri";
import { RiBook2Line } from "react-icons/ri";
import noImage from "../../assets/images/noImage.png";
import logo5NTT from "../../assets/images/Logo-5NTT.svg";
import "./Header.scss";

interface HeaderComponentProps {
  isActionActive: boolean;
  handleActionRequest?: () => void;
  handleActionInternShip?: () => void;
  handleActionContest?: () => void;
  handleActionProcess?: () => void;
  user: {
    user: { id: string; name: string | null; avatarUrl: string | null } | null;
  };
  handleLogout: () => void;
  type: string;
  isLoggedIn?: boolean;
}

const HeaderComponent = ({
  isActionActive,
  handleActionRequest,
  handleActionInternShip,
  handleActionContest,
  handleActionProcess,
  user,
  handleLogout,
  type,
  isLoggedIn,
}: HeaderComponentProps) => {
  const [listText, setListText] = useState<string[]>([]);

  useEffect(() => {
    if (type === "RECRUIT") {
      setListText(["Tìm kiếm việc làm", "Doanh nghiệp đăng ký"]);
    } else if (type === "ADMIN") {
      setListText(["Yêu cầu tuyển dụng", "Quản lý thực tập sinh"]);
    } else if (type === "HOME") {
      setListText(["Xem JD yêu cầu tuyển dụng", "Đăng ký trực tuyến"]);
    }
  }, [type]);

  return (
    <div className="header-container d-flex justify-content-between align-items-start">
      <img src={logo5NTT} alt="NTT" className="imageNTT col-6" />
      <div className="action col-6">
        <div
          className={!isActionActive ? "item active" : "item"}
          onClick={handleActionContest || handleActionRequest}
        >
          <div className="title">
            <div className="icon">
              <RiUserSearchLine />
            </div>
            <span className="text">{listText[0]}</span>
          </div>
          <div className="text-center fs-10 point">
            <FaCircle />
          </div>
        </div>
        <div
          className={isActionActive ? "item active" : "item"}
          onClick={handleActionProcess || handleActionInternShip}
        >
          <div className="title">
            <div className="icon">
              <RiBook2Line />
            </div>
            <span className="text">{listText[1]}</span>
          </div>
          <div className="text-center fs-10 point">
            <FaCircle />
          </div>
        </div>
        {/* Hiển thị nút đăng nhập hoặc avatar dựa vào isLoggedIn */}
        {isLoggedIn ? (
          <div className="avatar">
            <img
              src={user?.user?.avatarUrl || noImage}
              alt="Avatar"
              className="img"
            />
            <span className="name">{user?.user?.name}</span>
            <div className="setting">
              <div onClick={handleLogout}>Logout</div>
            </div>
          </div>
        ) : (
          <div>
            <button className="btn btn-login" onClick={handleLogout}>
              Đăng nhập
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderComponent;
