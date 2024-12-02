import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "../stores/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, checkAuth } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true); // 로딩 상태 시작
      console.log("ProtectedRoute1");
      await checkAuth(); // AuthContext 상태 동기화
      setIsLoading(false); // 로딩 상태 종료
    };

    initialize();
  }, []); // checkAuth가 변경될 때만 호출

  if (isLoading) {
    // 로딩 상태일 때 로딩 화면 표시
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // 인증되지 않은 상태면 알림창을 띄우고 /login으로 이동
    console.log("ProtectedRoute2");
    alert("로그인이 필요합니다.");
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
