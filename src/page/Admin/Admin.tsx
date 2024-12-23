import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { auth } from "../../firebase/firebase";
import HeaderComponent from "../../components/Header/Header";
import "./Admin.scss";

function Admin() {
  const [isActionActive, setIsActionActive] = useState<boolean>(false);
  const navigate = useNavigate();

  const defaultUser = { id: "", name: "", avatarUrl: "" };
  const user = useSelector((state: RootState) => state.user) || defaultUser;

  const handleActionRequest = () => {
    setIsActionActive(false);
    navigate("/admin");
  };

  const handleActionInternShip = () => {
    setIsActionActive(true);
    navigate("/admin/intern");
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  return (
    <div className="admin-container">
      <div className="manager-container">
        <div className="container">
          <HeaderComponent
            isActionActive={isActionActive}
            setIsActionActive={setIsActionActive}
            handleActionRequest={handleActionRequest}
            handleActionInternShip={handleActionInternShip}
            user={user}
            handleLogout={handleLogout}
            type="ADMIN"
            isLoggedIn={true}
          />
        </div>
      </div>

      <div className="body-manager-container">
        <div className="container">
          <Outlet />
        </div>
      </div>

      <div className="footer-manager-container">
        <span>Alta Software - Training Team 2024</span>
      </div>
    </div>
  );
}

export default Admin;
