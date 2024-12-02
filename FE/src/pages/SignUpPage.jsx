import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import { useAuthContext } from "../stores/AuthContext";
import styled from "styled-components";

const SignUpPage = () => {
  const [user_id, setUserId] = useState("");
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // useNavigate 훅 사용
  const axios = useAxios();
  const { checkAuth } = useAuthContext(); // AuthContext의 login 함수 사용
  const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;

  const grantBadge = async (user_id, badge_name) => {
    try {
      await axios.post("/badges/add", {
        user_id,
        badge_name,
      });
    } catch (error) {
      console.log("배지 획득 에러");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!specialCharacterRegex.test(password)) {
      setMessage("비밀번호는 특수문자를 포함하여야 합니다.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (user_id.length < 4 || user_id.length > 20) {
      setMessage("아이디 길이는 4이상 20이하이여야 합니다.");
      return;
    }

    try {
      const response = await axios.post("/users/signup", { user_id, user_name, password });
      if (response.status === 201) {
        alert("회원가입이 완료되었습니다.");
        checkAuth();

        // 신규 가입 배지 트리거 동작
        grantBadge(user_id, "register");
        navigate("/");
      }
    } catch (error) {
      if (error.status === 409) {
        alert("이미 있는 아이디 입니다.");
      } else {
        alert("회원가입 오류.");
      }
    }
  };

  return (
    <Container>
      <SignUpWrapper>
        <LeftSection>
          <WelcomeText>
            <h1>환영합니다!</h1>
            <p>지금 가입하고 TravelGo의 모든 서비스를 이용해보세요.</p>
          </WelcomeText>
          <Illustration src="http://localhost:8080/assets/travel_image.png" alt="회원가입 일러스트" />
        </LeftSection>
        <RightSection>
          <Title>회원가입</Title>
          <Form onSubmit={handleSignUp}>
            <Input
              type="text"
              placeholder="아이디"
              value={user_id}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="이름"
              value={user_name}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button type="submit">회원가입</Button>
          </Form>
          {message && <Message>{message}</Message>}
          <LoginPrompt>
            이미 계정이 있으신가요? <LoginLink to="/login">로그인</LoginLink>
          </LoginPrompt>
        </RightSection>
      </SignUpWrapper>
    </Container>
  );
};

export default SignUpPage;

// 스타일드 컴포넌트
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #4fc3f7, #1a73e8);
`;

const SignUpWrapper = styled.div`
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

const LoginPrompt = styled.p`
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #666;
`;

const LoginLink = styled(Link)`
  color: #1a73e8;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
