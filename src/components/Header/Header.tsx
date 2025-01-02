import { useState, useEffect } from "react";
import { FaCircle, FaBars } from "react-icons/fa";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const handleCloseMenu = () => setIsMobileMenuOpen(false);

  const handleMenuClick = (action: (() => void) | undefined) => {
    if (action) action();
    handleCloseMenu();
  };

  return (
    <div className="header-container">
      {/* Logo */}
      <div className="d-flex justify-content-between align-items-center w-100">
        <img src={logo5NTT} alt="NTT" className="w-80" />
        {/* Nút toggle cho mobile */}
        <button
          className="btn btn-toggle d-md-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FaBars />
        </button>
      </div>

      {/* Action menu cho PC */}
      <div
        className={`action col-md-6 ${
          type === "ADMIN" ? "admin" : ""
        } d-none d-md-flex`}
      >
        <div
          className={!isActionActive ? "item active" : "item"}
          onClick={() =>
            handleMenuClick(handleActionContest || handleActionRequest)
          }
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
            onClick={() =>
              handleMenuClick(handleActionProcess || handleActionInternShip)
            }
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

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={handleCloseMenu}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <button className="btn-close" onClick={handleCloseMenu}>
              &times;
            </button>

            <div className="mobile-action">
              <div
                className={!isActionActive ? "item active" : "item"}
                onClick={() =>
                  handleMenuClick(handleActionContest || handleActionRequest)
                }
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
                  onClick={() =>
                    handleMenuClick(
                      handleActionProcess || handleActionInternShip
                    )
                  }
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
            </div>
            <hr />
            <div className="mobile-user">
              {isLoggedIn ? (
                <div className="avatar d-flex align-items-center">
                  <span className="name">{user?.user?.name}</span>
                  <button className="btn-logout" onClick={handleLogout}>
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <div className="d-flex justify-content-center">
                  <button className="btn btn-login" onClick={handleLogout}>
                    Đăng nhập
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderComponent;
