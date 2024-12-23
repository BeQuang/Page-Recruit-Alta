/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { FaCircle } from "react-icons/fa";
import { RiUserSearchLine, RiBook2Line } from "react-icons/ri";
import noImage from "../../assets/images/noImage.png";
import logo5NTT from "../../assets/images/Logo-5NTT.svg";
import "./Header.scss";

interface HeaderComponentProps {
  isActionActive: boolean;
  setIsActionActive: (value: boolean) => void;
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
  setIsActionActive,
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
    switch (type) {
      case "RECRUIT":
        setListText(["Tìm kiếm việc làm", "Doanh nghiệp đăng ký"]);
        if (window.location.pathname === "/recruit/register") {
          setIsActionActive(true);
        }
        break;
      case "ADMIN":
        setListText(["Yêu cầu tuyển dụng"]);
        if (window.location.pathname === "/admin/intern") {
          setIsActionActive(true);
        }
        break;
      case "HOME":
        setListText(["Xem JD yêu cầu tuyển dụng", "Đăng ký trực tuyến"]);
        if (window.location.pathname === "/register") {
          setIsActionActive(true);
        }
        break;
      default:
        setListText([]);
    }
  }, [type, setIsActionActive]);

  return (
    <div className="header-container d-flex justify-content-between align-items-start">
      <img src={logo5NTT} alt="NTT" className="imageNTT col-6" />

      <div className={`action col-6 ${type === "ADMIN" ? "admin" : ""}`}>
        <div
          className={!isActionActive ? "item active" : "item"}
          onClick={handleActionContest || handleActionRequest}
        >
          <div className="title">
            <div className="icon">
              <RiUserSearchLine />
            </div>
            <span className="text">{listText[0] || "Hành động 1"}</span>
          </div>
          <div className="text-center fs-10 point">
            <FaCircle />
          </div>
        </div>

        {(type === "RECRUIT" || type === "HOME") && (
          <div
            className={isActionActive ? "item active" : "item"}
            onClick={handleActionProcess || handleActionInternShip}
          >
            <div className="title">
              <div className="icon">
                <RiBook2Line />
              </div>
              <span className="text">{listText[1] || "Hành động 2"}</span>
            </div>
            <div className="text-center fs-10 point">
              <FaCircle />
            </div>
          </div>
        )}

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
