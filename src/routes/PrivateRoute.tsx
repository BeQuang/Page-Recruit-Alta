/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface PrivateRoutesProps {
  children: React.ReactNode; // Định nghĩa kiểu dữ liệu cho children
}

function PrivateRoutes({ children }: PrivateRoutesProps) {
  // Lấy dữ liệu user từ Redux Store
  const defaultUser = { id: "", name: "", avatarUrl: "" };
  const user = useSelector((state: RootState) => state.user) || defaultUser;

  if (user && user.id && user.id.trim() !== "") {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default PrivateRoutes;
