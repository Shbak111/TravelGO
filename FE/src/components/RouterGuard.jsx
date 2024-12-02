import { Navigate, Outlet } from "react-router-dom";

const RouteGuard = ({ requiresAuth }) => {
  const token = sessionStorage.getItem("Authorization"); // 로그인 토큰 확인

  // 로그인 필요하지만 토큰이 없을 경우
  if (requiresAuth && !token) {
    return <Navigate to="/login" replace />;
  }

  // 토큰이 있거나 로그인 불필요한 라우트일 경우
  return <Outlet />;
};

export default RouteGuard;
