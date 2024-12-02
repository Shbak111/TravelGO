import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PaginationBar from "../common/PaginationBar"; // PaginationBar 컴포넌트 경로에 맞게 수정
import defaultImage from "../../assets/image.jpg";

const BadgeGallery = ({ badges, handlePageChange }) => {
  const hasBadges = badges?.list?.length > 0;

  return (
    <BadgeContainer>
      <BadgeGrid isEmpty={!hasBadges}>
        {hasBadges ? (
          badges.list.map((badge, index) => (
            <BadgeWrapper key={index}>
              <Badge src={badge ? `http://localhost:8080${badge?.badge_img}` : defaultImage} alt={`image.jpg`} />
              {badge?.badge_detail && <Tooltip>{badge?.badge_detail}</Tooltip>}
            </BadgeWrapper>
          ))
        ) : (
          <EmptyMessage>가지고 있는 배지가 없습니다!!!</EmptyMessage>
        )}
      </BadgeGrid>

      <PaginationBar
        currentPage={badges.page_num}
        totalPages={badges.pages}
        hasNextPage={badges.has_next_page}
        hasPreviousPage={badges.has_previous_page}
        onPageChange={handlePageChange}
      />
    </BadgeContainer>
  );
};

export default BadgeGallery;

const BadgeContainer = styled.div`
  width: 100%;
  padding: 20px;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const BadgeWrapper = styled.div`
  position: relative; /* 툴팁의 위치를 배지 기준으로 설정 */
  display: inline-block;

  &:hover div {
    opacity: 1;
    visibility: visible;
    transform: translateY(-10px); /* 살짝 위로 이동 */
  }
`;

const BadgeGrid = styled.div`
  display: ${({ isEmpty }) => (isEmpty ? "flex" : "grid")};
  grid-template-columns: ${({ isEmpty }) => (isEmpty ? "none" : "repeat(5, 1fr)")};
  justify-content: ${({ isEmpty }) => (isEmpty ? "center" : "initial")};
  align-items: ${({ isEmpty }) => (isEmpty ? "center" : "initial")};
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  min-height: 240px; // 2줄 보장
`;

const Badge = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 50%;
  background-color: #f5f5f5;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: 105%; /* 배지 바로 위에 표시 */
  left: 6%; /* 배지의 중앙 정렬 */
  width: max-content;
  max-width: 200px;
  padding: 8px 12px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  font-size: 0.875rem;
  text-align: center;
  border-radius: 8px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease;
  white-space: pre-wrap;

  /* 삼각형 모양 추가 */
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
  }
`;

const EmptyMessage = styled.div`
  font-size: 1.2rem;
  color: #6c757d;
  text-align: center;
`;
