import { Outlet, useNavigate } from "react-router-dom";
import "./Home.scss";
import { useState } from "react";
import HeaderComponent from "../../components/Header/Header";

function Home() {
  const [isActionActive, setIsActionActive] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleActionJD = () => {
    setIsActionActive(false);
    navigate("/");
  };

  const handleActionRegister = () => {
    setIsActionActive(true);
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="home-container">
      <div className="bg-white">
        <div className="container">
          <HeaderComponent
            isActionActive={isActionActive}
            handleActionRequest={handleActionJD}
            handleActionInternShip={handleActionRegister}
            handleLogout={handleLogin}
            user={{ user: null }} // Đây là ví dụ, bạn có thể truyền thông tin người dùng vào nếu cần
            type="HOME" // Hoặc "ADMIN", tuỳ vào yêu cầu của bạn
            isLoggedIn={false}
          />
        </div>
      </div>
      <div className="body-home-container">
        <div className="container">
          <Outlet />
        </div>
      </div>

      <div className="footer-home-container">
        <span>Alta Software - Training Team 2024</span>
      </div>
    </div>
  );
}

export default Home;
