import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import styled from "styled-components";

const LoginPage = () => {
  const [user_id, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // useNavigate 훅 사용
  const localAxios = useAxios();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await localAxios.post("/users/login", { user_id, password });
      const accessToken = response.headers.authorization;
      if (accessToken) {
        alert(`${response.headers.username}님 환영합니다!`);
        // 메인 페이지로 이동
        navigate(-1);
      }
    } catch (error) {
      setMessage("로그인 실패. 이메일과 비밀번호를 확인하세요.");
      console.error(error);
    }
  };

  return (
    <Container>
      <LoginWrapper>
        <LeftSection>
          <WelcomeText>
            <h1>반갑습니다!</h1>
            <p>TravelGo와 함께 멋진 여행 플랜을 시작하세요.</p>
          </WelcomeText>
          <Illustration src="http://localhost:8080/assets/travel_image.png" alt="여행 일러스트" />
        </LeftSection>
        <RightSection>
          <Title>로그인</Title>
          <Form onSubmit={handleLogin}>
            <Input
              type="text"
              placeholder="아이디"
              value={user_id}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit">로그인</Button>
          </Form>
          {message && <Message>{message}</Message>}
          <SignupPrompt>
            아직 계정이 없으신가요? <SignupLink to="/signup">회원가입</SignupLink>
          </SignupPrompt>
        </RightSection>
      </LoginWrapper>
    </Container>
  );
};

export default LoginPage;

// 스타일드 컴포넌트
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a73e8, #4fc3f7);
`;

const LoginWrapper = styled.div`
  display: flex;
  width: 900px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
`;

const LeftSection = styled.div`
  flex: 1;
  background-color: #f5faff;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WelcomeText = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
    color: #1a73e8;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.2rem;
    color: #555;
  }
`;

const Illustration = styled.img`
  max-width: 80%;
  height: auto;
`;

const RightSection = styled.div`
  flex: 1;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #1a73e8;
    box-shadow: 0 0 5px rgba(26, 115, 232, 0.5);
  }
`;

const Button = styled.button`
  padding: 0.8rem;
  background-color: #1a73e8;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1557b0;
  }
`;

const Message = styled.p`
  margin-top: 1rem;
  color: #d32f2f;
  font-size: 0.9rem;
`;

const SignupPrompt = styled.p`
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #666;
`;

const SignupLink = styled(Link)`
  color: #1a73e8;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
