import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { auth } from "../../firebase/firebase";
import HeaderComponent from "../../components/Header/Header";
import "./Recruit.scss";

function Recruit() {
  const [isActionActive, setIsActionActive] = useState<boolean>(false);
  const navigate = useNavigate();

  const defaultUser = { id: "", name: "", avatarUrl: "" };
  const user = useSelector((state: RootState) => state.user) || defaultUser;

  const handleActionContest = () => {
    setIsActionActive(false);
    navigate("/recruit");
  };

  const handleActionProcess = () => {
    setIsActionActive(true);
    navigate("/recruit/register");
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  return (
    <div className="recruit-container">
      <div className="JD-container">
        <div className="container">
          <HeaderComponent
            isActionActive={isActionActive}
            handleActionContest={handleActionContest}
            handleActionProcess={handleActionProcess}
            user={user}
            handleLogout={handleLogout}
            type="RECRUIT"
            isLoggedIn={true}
          />
        </div>
      </div>

      <div className="body-recruit-container">
        <div className="container">
          <Outlet />
        </div>
      </div>

      <div className="footer-recruit-container">
        <span>Alta Software - Training Team 2024</span>
      </div>
    </div>
  );
}

export default Recruit;
