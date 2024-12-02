import styled from "styled-components";
import { useAxios } from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  border: none;
  background-color: #1a73e8;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #1557b0;
  }
`;
const LogoutButton = () => {
  const localAxios = useAxios();
  const navigate = useNavigate(); // useNavigate 훅 사용
  const handleLogout = async () => {
    try {
      await localAxios.post("/users/logout");
      sessionStorage.clear();
      console.log("로그아웃 성공!");

      // 메인 페이지로 이동
      navigate("/");
    } catch (error) {
      console.error("로그아웃 중 오류가 발생했습니다.", error);
    }
  };
  return <Button onClick={handleLogout}>로그아웃</Button>;
};

export default LogoutButton;
