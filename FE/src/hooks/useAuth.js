import { useState, useCallback } from "react";
import { useAxios } from "../hooks/useAxios";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // 초기값 null (확인 전 상태)
  const axios = useAxios();

  const checkAuth = useCallback(async () => {
    const token = sessionStorage.getItem("Authorization");
    if (token) {
      // console.log("성공");
      setIsAuthenticated(true); // 인증 성공 여부 설정
    } else {
      // console.log("실패");
      setIsAuthenticated(false); // 인증 실패 시 상태 false로 설정
    }
  }, [axios]);

  return { isAuthenticated, checkAuth };
};
