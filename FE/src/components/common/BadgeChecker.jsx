import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAxios } from "../../hooks/useAxios";

const BadgeChecker = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axios = useAxios();

  const checkBadges = async () => {
    try {
      const response = await axios.get("/badges/check");
      if (response.data > 0) {
        alert(`${response.data}개의 새로운 배지 획득🎉`);
      }
    } catch (error) {
      if (error.status === 401 || error.response.status === 401) {
        if (error.response.data === "Invalid refreshToken") {
          alert("세션이 만료되었습니다.");
          navigate("/login", { refresh: true });
        }
      } else console.error("배지 확인 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("Authorization")) checkBadges(); // 라우트 변경 시 배지 확인
  }, [location.pathname]); // 라우트 변경 시 트리거

  return null; // 화면에 렌더링할 내용 없음
};

export default BadgeChecker;
