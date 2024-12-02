import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAxios } from "../../hooks/useAxios";

const RANK_THRESHOLDS = [
  { exp: 0, rank: "아이언", color: "#A19D94" }, // 회색
  { exp: 1000, rank: "브론즈", color: "#CD7F32" }, // 구리색
  { exp: 5000, rank: "실버", color: "#C0C0C0" }, // 은색
  { exp: 15000, rank: "골드", color: "#FFD700" }, // 금색
  { exp: 35000, rank: "플레티넘", color: "#89CFF0" }, // 하늘색
  { exp: 70000, rank: "다이아몬드", color: "#B9F2FF" }, // 다이아몬드색
];

const getRankInfo = (exp) => {
  for (let i = RANK_THRESHOLDS.length - 1; i >= 0; i--) {
    if (exp >= RANK_THRESHOLDS[i].exp) {
      return RANK_THRESHOLDS[i];
    }
  }
  return RANK_THRESHOLDS[0]; // 기본값은 아이언
};

const ProfileSection = ({ user }) => {
  const navigate = useNavigate();
  const rankInfo = getRankInfo(user.rank_point); // user.exp는 사용자의 현재 경험치
  const axios = useAxios();
  const [planStat, setPlanStat] = useState(0);
  const [reviewStat, setReviewStat] = useState(0);
  const [hitStat, setHitStat] = useState(0);
  const [planLoading, setPlanLoading] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [hitLoading, setHitLoading] = useState(false);

  async function fetchPlanStat() {
    setPlanLoading(true);
    await axios
      .get("/stats/plans")
      .then((res) => {
        setPlanStat(res.data.user_plans_cnt);
      })
      .finally(() => {
        setPlanLoading(false);
      });
  }

  async function fetchReviewStat() {
    setReviewLoading(true);
    await axios
      .get("/stats/reviews")
      .then((res) => {
        setReviewStat(res.data.user_reviews_cnt);
      })
      .finally(() => {
        setReviewLoading(false);
      });
  }

  async function fetchHitStat() {
    setHitLoading(true);
    await axios
      .get("/stats/hits")
      .then((res) => {
        setHitStat(res.data.user_hits_cnt);
      })
      .finally(() => {
        setHitLoading(false);
      });
  }

  useEffect(() => {
    fetchPlanStat();
  }, []);

  useEffect(() => {
    fetchReviewStat();
  }, []);

  useEffect(() => {
    fetchHitStat();
  }, []);

  return (
    <ProfileContainer $backgroundImage={user.background_img}>
      <ProfileImage src={`http://localhost:8080${user.profile_img}`} alt="User Profile" />
      <UserInfo>
        <UserName>
          {user.user_name}
          <Rank $backgroundColor={rankInfo.color}>{rankInfo.rank}</Rank>
        </UserName>
        <Stats>
          {planLoading ? null : planStat ? (
            <StatItem>공유한 플랜: {planStat}</StatItem>
          ) : (
            <StatItem>공유한 플랜: {0}</StatItem>
          )}
          {reviewLoading ? null : reviewStat ? <StatItem>리뷰: {reviewStat}</StatItem> : <StatItem>리뷰: {0}</StatItem>}
          {hitLoading ? null : hitStat ? <StatItem>좋아요: {hitStat}</StatItem> : <StatItem>좋아요: {0}</StatItem>}
        </Stats>
      </UserInfo>
      <ButtonContainer>
        <ActionButton onClick={() => navigate("/mypage/item")}>아이템 보기</ActionButton>
        <ActionButton onClick={() => navigate("/mypage/plans")}>플랜 보기</ActionButton>
      </ButtonContainer>
    </ProfileContainer>
  );
};

export default ProfileSection;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding: 25px;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  /* 배경 이미지 설정 (props로 전달) */
  background-image: url("http://localhost:8080${(props) => props.$backgroundImage}");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  /* 텍스트 가독성을 위한 반투명한 오버레이 추가 */
  position: relative;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5); /* 어두운 반투명 배경 */
    border-radius: 15px;
    z-index: -1; /* 텍스트와 프로필 이미지를 가리지 않도록 */
  }
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 30px;
  border: 4px solid #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const UserInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 500px;

  /* 텍스트를 감싸는 어두운 배경 추가 */
  background: rgba(0, 0, 0, 0.6); /* 약간 더 어두운 배경 */
  padding: 15px 20px;
  border-radius: 10px;
`;

const UserName = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: #ffffff; /* 텍스트를 흰색으로 */
  display: flex;
  align-items: center;
`;

const Stats = styled.div`
  display: flex;
  gap: 20px;
`;

const StatItem = styled.div`
  font-size: 16px;
  color: #ffffff; /* 흰색 텍스트 */
`;

const Rank = styled.span`
  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) =>
    props.$backgroundColor === "#FFD700" || props.$backgroundColor === "#B9F2FF"
      ? "#000"
      : "#fff"}; // 골드일 때만 검정색 텍스트
  padding: 5px 10px;
  margin-left: 10px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border: ${(props) =>
    props.$backgroundColor === "#B9F2FF"
      ? "2px solid rgba(255,255,255,0.3)"
      : "none"}; // 다이아몬드 랭크일 때 특별한 테두리

  // 반짝이는 효과 (다이아몬드 랭크일 때만)
  ${(props) =>
    props.$backgroundColor === "#B9F2FF" &&
    `
       background: linear-gradient(
           45deg,
           ${props.$backgroundColor} 0%,
           #FFFFFF 50%,
           ${props.$backgroundColor} 100%
       );
       background-size: 200% 200%;
       animation: shimmer 3s infinite;
       
       @keyframes shimmer {
           0% { background-position: 0% 0%; }
           50% { background-position: 200% 200%; }
           100% { background-position: 0% 0%; }
       }
   `}
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 200px; /* 적절한 너비 설정 */
  margin-left: auto; /* 오른쪽 정렬 */
  gap: 10px; /* 버튼 간의 간격 */
`;

const ActionButton = styled.button`
  width: 70%; /* 버튼을 컨테이너의 너비에 맞춤 */
  margin: 10px 0; /* 위아래로 간격 추가 */
  padding: 12px 20px; /* 버튼 안쪽 여백 확대 */
  font-size: 16px;
  font-weight: 600;
  color: white;
  background-color: #3498db;
  border: none;
  border-radius: 8px; /* 더 부드러운 모서리 */
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background-color: #2980b9; /* 호버 시 어두운 파란색 */
    transform: translateY(-2px); /* 살짝 위로 올라가는 효과 */
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15); /* 더 강조된 그림자 */
  }

  &:active {
    transform: translateY(0); /* 클릭 시 원래 위치 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 클릭 상태에서는 기본 그림자 */
  }
`;
