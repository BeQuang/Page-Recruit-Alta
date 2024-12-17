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
import User from "../components/User/User";
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

function AppRoutes() {
  const [user, setUser] = useState<any>(null); // Lưu trạng thái người dùng
  const [loading, setLoading] = useState<boolean>(true); // Ban đầu, loading là true
  const userInfo = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); // Khởi tạo useNavigate hook

  // Sử dụng useEffect để kiểm tra một lần khi trang được load
  useAuthStateChanged(dispatch, setLoading, setUser);

  useEffect(() => {
    // Kiểm tra trạng thái người dùng khi app load
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        if (userInfo?.user?.option) {
          if (userInfo.user.option === "Sinh viên") {
            navigate("/user"); // Điều hướng đến trang user
          } else if (userInfo.user.option === "Doanh nghiệp") {
            navigate("/recruit"); // Điều hướng đến trang recruit
          } else if (userInfo.user.option === "Quản trị viên") {
            navigate("/admin"); // Điều hướng đến trang admin
          }
        }
      }
    });

    // Cleanup subscription khi component bị unmount
    return () => unsubscribe();
  }, [userInfo?.user?.option]);

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
          <Route path="/user/contest" element={<Contest />} />
          <Route path="/user/process" element={<Process />} />
        </Route>
      )}

      {/* Các route dành cho Doanh nghiệp */}
      {userInfo?.user?.option === "Doanh nghiệp" && (
        <Route path="/recruit" element={<Recruit />} />
      )}

      {/* Các route dành cho Quản trị viên */}
      {userInfo?.user?.option === "Quản trị viên" && (
        <Route path="/admin" element={<Admin />} />
      )}

      {/* Route mặc định cho tất cả */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
