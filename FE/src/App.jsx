import { Outlet } from "react-router-dom";
import Header from "./components/common/Header";
import BadgeChecker from "./components/common/BadgeChecker";
import styled from "styled-components";
import { AuthProvider } from "./stores/AuthContext";

const MainContent = styled.main`
  padding-top: 70px; // Header의 높이만큼 상단 패딩 추가
  width: 100%;
  margin: 0 auto;
`;

function App() {
  return (
    <div>
      <AuthProvider>
        <Header />
        <BadgeChecker />
        <MainContent>
          <Outlet />
        </MainContent>
      </AuthProvider>
    </div>
  );
}

export default App;
