/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

interface PrivateRoutesProps {
  children: React.ReactNode; // Định nghĩa kiểu dữ liệu cho children
}

function PrivateRoutes({ children }: PrivateRoutesProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // `null` để thể hiện trạng thái chưa xác định

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Người dùng đã đăng nhập
        setIsAuthenticated(true);
      } else {
        // Người dùng chưa đăng nhập
        setIsAuthenticated(false);
      }
    });

    // Cleanup subscription khi component bị unmount
    return () => unsubscribe();
  }, [auth]);

  if (isAuthenticated === null) {
    // Hiển thị loading hoặc trạng thái chờ
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default PrivateRoutes;
