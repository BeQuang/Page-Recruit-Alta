import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import NotFound from "../page/NotFound/NotFound";
import Home from "../page/Home/Home";
import Recruit from "../page/Recruit/Recruit";
import Project from "../page/Project/Project";
import LoginForm from "../components/Login/LoginForm";
import ForgotPass from "../components/ForgotPass/ForgotPass";
import ResetPass from "../components/ForgotPass/ResetPass";
import User from "../components/User/User";
import Contest from "../components/Contest/Contest";
import Process from "../components/Process/Process";
import ChoiceContest from "../components/Contest/ChoiceContest";
import PrivateRoutes from "./PrivateRoute";
import { auth } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { ThreeCircles } from "react-loader-spinner";
import useAuthStateChanged from "./useAuthStateChanged";

function AppRoutes() {
  const [user, setUser] = useState<any>(null); // Lưu trạng thái người dùng
  const [loading, setLoading] = useState<boolean>(false); // Thêm state loading để theo dõi trạng thái fetch

  const dispatch = useDispatch<AppDispatch>();

  useAuthStateChanged(dispatch, setLoading, setUser);

  // Kiểm tra trạng thái người dùng khi app load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Cập nhật trạng thái người dùng khi thay đổi
    });

    // Cleanup subscription khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      <Route
        path="/login"
        element={!user ? <Home /> : <Navigate to="/user" replace />}
      >
        <Route index element={<LoginForm />} />
        <Route path="/login/forgot-pass" element={<ForgotPass />} />
        <Route path="/login/reset-pass" element={<ResetPass />} />
      </Route>

      <Route
        path="/user"
        element={
          loading ? (
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
          ) : (
            <PrivateRoutes>
              <User />
            </PrivateRoutes>
          )
        }
      >
        <Route index element={<ChoiceContest />} />
        <Route path="/user/contest" element={<Contest />} />
        <Route path="/user/process" element={<Process />} />
      </Route>

      <Route path="/project" element={<Project />} />
      <Route path="/recruit" element={<Recruit />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
