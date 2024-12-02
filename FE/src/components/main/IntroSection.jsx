import styled from "styled-components";

const IntroSection = styled.section`
  width: 100%;
  height: 60vh;
  background-image: url("http://localhost:8080/assets/main_background_img.png");
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
`;

const IntroTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const IntroButton = styled.button`
  padding: 12px 24px;
  font-size: 1.2rem;
  color: white;
  background-color: #1a73e8;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1557b0;
  }
`;

const Intro = ({ onStart }) => (
  <IntroSection>
    <IntroTitle>새로운 여행 플랜을 지금 시작하세요!</IntroTitle>
    <IntroButton onClick={onStart}>관광지 둘러보기</IntroButton>
  </IntroSection>
);

export default Intro;
