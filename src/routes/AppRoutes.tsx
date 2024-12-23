/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import NotFound from "../page/NotFound/NotFound";
import Recruit from "../page/Recruit/Recruit";
import Admin from "../page/Admin/Admin";
import LoginForm from "../components/Login/LoginForm";
import ForgotPass from "../components/ForgotPass/ForgotPass";
import Contest from "../components/Contest/Contest";
import Process from "../components/Process/Process";
import ChoiceContest from "../components/Contest/ChoiceContest";
import PrivateRoutes from "./PrivateRoute";
import { auth } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { ThreeCircles } from "react-loader-spinner";
import useAuthStateChanged from "./useAuthStateChanged";
import Login from "../components/Login/Login";
import Home from "../page/Home/Home";
import User from "../page/User/User";
import JD from "../components/JD/JD";
import Register from "../components/Register/Register";
import RegisterRecruit from "../components/Register/RegisterRecruit";
import ManagerRecruit from "../components/Manager/ManagerRecruit";
import ManagerIntern from "../components/Manager/ManagerIntern";

function AppRoutes() {
  const [user, setUser] = useState<any>(null); // Lưu trạng thái người dùng
  const [loading, setLoading] = useState<boolean>(true); // Ban đầu, loading là true
  const userInfo = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); // Khởi tạo useNavigate hook

  // Sử dụng useEffect để kiểm tra một lần khi trang được load
  useAuthStateChanged(dispatch, setLoading, setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Chỉ điều hướng khi không phải route hợp lệ
          if (userInfo?.user?.option) {
            const currentPath = window.location.pathname;
            if (
              userInfo.user.option === "Sinh viên" &&
              !currentPath.startsWith("/user")
            ) {
              navigate("/user");
            } else if (
              userInfo.user.option === "Doanh nghiệp" &&
              !currentPath.startsWith("/recruit")
            ) {
              navigate("/recruit");
            } else if (
              userInfo.user.option === "Quản trị viên" &&
              !currentPath.startsWith("/admin")
            ) {
              navigate("/admin");
            }
          }
        } catch (err) {
          console.error("Error fetching user or contest data:", err);
        } finally {
          setLoading(false); // Kết thúc loading sau khi hoàn tất
        }
      }
    });

    // Cleanup subscription khi component bị unmount
    return () => unsubscribe();
  }, [userInfo?.user?.option, navigate]);

  // Nếu đang loading, không render routes, chỉ hiển thị loading
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
        <h1>Loading data...</h1>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<JD />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="/login" element={<Login />}>
        <Route index element={<LoginForm />} />
        <Route path="/login/forgot-pass" element={<ForgotPass />} />
      </Route>

      {/* Các route dành cho Sinh viên */}
      {userInfo?.user?.option === "Sinh viên" && (
        <Route
          path="/user"
          element={
            <PrivateRoutes>
              <User />
            </PrivateRoutes>
          }
        >
          <Route index element={<ChoiceContest />} />
          <Route path="contest" element={<Contest />} />
          <Route path="process" element={<Process />} />
        </Route>
      )}

      {/* Các route dành cho Doanh nghiệp */}
      {userInfo?.user?.option === "Doanh nghiệp" && (
        <Route
          path="/recruit"
          element={
            <PrivateRoutes>
              <Recruit />
            </PrivateRoutes>
          }
        >
          <Route index element={<JD />} />
          <Route path="register" element={<RegisterRecruit />} />
        </Route>
      )}

      {/* Các route dành cho Quản trị viên */}
      {userInfo?.user?.option === "Quản trị viên" && (
        <Route
          path="/admin"
          element={
            <PrivateRoutes>
              <Admin />
            </PrivateRoutes>
          }
        >
          <Route index element={<ManagerRecruit />} />
          <Route path="intern" element={<ManagerIntern />} />
        </Route>
      )}

      {/* Route mặc định cho tất cả */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
