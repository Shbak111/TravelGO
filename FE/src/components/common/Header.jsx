import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../stores/AuthContext";
import LogoutButton from "../LogoutButton";

const HeaderContainer = styled.header`
  width: 100%;
  height: 70px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

const HeaderWrapper = styled.div`
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: 700;
  color: #1a73e8;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;
  flex-shrink: 0;
  padding: 8px 0;

  &:hover {
    color: #1557b0;
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 40px;
  height: 100%;
  margin: 0 20px;
  flex-grow: 1;
  justify-content: center;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #424242;
  font-size: 16px;
  font-weight: 500;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 12px;
  position: relative;
  transition: color 0.2s ease;

  &:hover {
    color: #1a73e8;
  }

  &:after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #1a73e8;
    transform: scaleX(0);
    transition: transform 0.25s ease;
    transform-origin: center;
  }

  &:hover:after {
    transform: scaleX(1);
  }

  &.active {
    color: #1a73e8;

    &:after {
      transform: scaleX(1);
    }
  }
`;

const AuthSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
`;

const AuthButton = styled(Link)`
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  ${(props) =>
    props.$primary
      ? `
    background-color: #1A73E8;
    color: white;
    
    &:hover {
      background-color: #1557B0;
    }
  `
      : `
    color: #666;
    
    &:hover {
      background-color: #f5f5f5;
      color: #333;
    }
  `}
`;

// Content Wrapper for pages to handle header height
export const ContentWrapper = styled.div`
  padding-top: 70px; // Same as header height
`;

// Header 컴포넌트
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // 초기 상태를 null로 설정
  const { isAuthenticated, checkAuth } = useAuthContext();
  const [userName, setUserName] = useState(""); // 사용자 이름 상태 추가
  useNavigate();

  useEffect(() => {
    checkAuth(); // 컴포넌트가 마운트될 때 인증 상태 확인
  }, [sessionStorage.getItem("Authorization")]);

  useEffect(() => {
    if (isAuthenticated !== null) {
      setIsLoggedIn(isAuthenticated); // 인증 상태가 변경될 때 동기화
    }
  }, [isAuthenticated]);

  return (
    <div>
      <HeaderContainer>
        <HeaderWrapper>
          <Logo to="/">TravelGo</Logo>

          <Navigation>
            <NavLink to="/attraction">지역별관광지</NavLink>
            <NavLink to="/plan">플랜게시판</NavLink>
            <NavLink to="/review">리뷰게시판</NavLink>
            <NavLink to="/shop">상점</NavLink>
          </Navigation>

          <AuthSection>
            {isLoggedIn ? (
              <>
                <span>안녕하세요, {sessionStorage.getItem("UserName")}님!</span>
                <LogoutButton />
                <AuthButton to="/mypage" $primary>
                  마이페이지
                </AuthButton>
              </>
            ) : (
              <>
                <AuthButton to="/login">로그인</AuthButton>
                <AuthButton to="/signup" $primary>
                  회원가입
                </AuthButton>
              </>
            )}
          </AuthSection>
        </HeaderWrapper>
      </HeaderContainer>
    </div>
  );
};

export default Header;
