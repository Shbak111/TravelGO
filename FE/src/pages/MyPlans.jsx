import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAxios } from "../hooks/useAxios";
import PaginationBar from "../components/common/PaginationBar";
import { useNavigate } from "react-router-dom";

// 로딩 중 상태에서 데이터가 없는 경우 표시할 Skeleton UI
const PlanItems = ({ title, items, fetch, isPlanLoading }) => {
  return (
    <Section>
      <Title>{title}</Title>
      <ItemsContainer>
        {items?.list?.length === 0 ? (
          <Placeholder>글이 없습니다</Placeholder>
        ) : isPlanLoading ? (
          [...Array(5)].map((_, index) => (
            <SkeletonItem key={index}>
              <SkeletonTitle />
              <SkeletonContent />
              <SkeletonContent />
            </SkeletonItem>
          ))
        ) : (
          items?.list?.map((item, index) => (
            <PlanItem key={index} title={item?.myplan_title} content={item?.myplan_detail} idx={item?.myplan_id} />
          ))
        )}
      </ItemsContainer>
      <PaginationBar
        currentPage={items?.page_num}
        totalPages={items?.pages}
        hasNextPage={items?.has_next_page}
        hasPreviousPage={items?.has_previous_page}
        onPageChange={fetch}
      />
    </Section>
  );
};

const PlanItem = ({ title, content, idx }) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/mypage/myplan/${idx}`);
  };

  return (
    <ItemCard onClick={onClick}>
      <ItemTitle>{title}</ItemTitle>
      <ItemContent>{content}</ItemContent>
    </ItemCard>
  );
};

const ReviewItems = ({ title, items, fetch, isMyReviewLoading }) => {
  return (
    <Section>
      <Title>{title}</Title>
      <ItemsContainer>
        {items?.list?.length === 0 ? (
          <p>No reviews available</p>
        ) : isMyReviewLoading ? (
          [...Array(5)].map((_, index) => (
            <SkeletonItem key={index}>
              <SkeletonTitle />
              <SkeletonContent />
              <SkeletonContent />
            </SkeletonItem>
          ))
        ) : (
          items?.list?.map((item, index) => (
            <ReviewItem key={index} title={item?.review_title} content={item?.review_content} idx={item?.review_id} />
          ))
        )}
      </ItemsContainer>
      <PaginationBar
        currentPage={items?.page_num}
        totalPages={items?.pages}
        hasNextPage={items?.has_next_page}
        hasPreviousPage={items?.has_previous_page}
        onPageChange={fetch}
      />
    </Section>
  );
};

const ReviewItem = ({ title, content, idx }) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/review/detail/${idx}`);
  };
  return (
    <ItemCard onClick={onClick}>
      <ItemTitle>{title}</ItemTitle>
      <ItemContent>{content}</ItemContent>
    </ItemCard>
  );
};

function MyPlans() {
  const axios = useAxios();
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isPlanLoading, setPlanLoading] = useState(false);
  const [isMyReviewLoading, setMyReviewLoading] = useState(false);

  async function fetchPlans(page) {
    setPlanLoading(true);
    await axios
      .get("/myplans/user", {
        params: { page },
      })
      .then((res) => {
        if (res.status === 204) {
          setPlans([]);
        } else {
          console.log(res.data);
          setPlans(res.data);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setPlanLoading(false);
      });
  }

  async function fetchMyReviews(page) {
    setMyReviewLoading(true);
    await axios
      .get("/reviews/myreview", {
        params: { page },
      })
      .then((res) => {
        if (res.status === 204) {
          setReviews([]);
        } else {
          setReviews(res.data);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setMyReviewLoading(false);
      });
  }

  const handleReviewPageChange = (page) => {
    fetchMyReviews(page);
  };

  const handlePlanPageChange = (page) => {
    fetchPlans(page);
  };

  useEffect(() => {
    fetchPlans(1);
  }, []);

  useEffect(() => {
    fetchMyReviews(1);
  }, []);

  return (
    <PageContainer>
      <Container>
        <Header>
          <BackButton onClick={() => navigate(`/mypage`)}>뒤로가기</BackButton>
        </Header>
        <ReviewItems
          title="내가 쓴 리뷰"
          items={reviews}
          fetch={handleReviewPageChange}
          isMyReviewLoading={isMyReviewLoading}
        />
        <PlanItems title="내가 만든 플랜" items={plans} fetch={handlePlanPageChange} isPlanLoading={isPlanLoading} />
      </Container>
    </PageContainer>
  );
}

export default MyPlans;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 100vh;
`;
const Header = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const BackButton = styled.button`
  padding: 10px 15px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #003f7f;
  }
`;
const Container = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #000;
`;

const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  min-height: 330px;
  justify-content: flex-start;
  align-content: flex-start;
  background-color: #666; /* 어두운 배경 색상 */
  padding: 20px;
  border-radius: 10px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5); /* 파인 느낌 추가 */
`;

const ItemCard = styled.div`
  width: 200px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px); /* 호버 시 살짝 올라가는 효과 */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 효과 */
  }
`;

const ItemTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #555;
`;

const ItemContent = styled.div`
  font-size: 14px;
  color: #777;
`;

const Placeholder = styled.div`
  grid-column: span 5;
  text-align: center;
  font-size: 18px;
  color: #aaa;
  padding: 50px 0;
  background-color: #444; /* 배경색 변경 */
  border-radius: 10px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
`;

// 스켈레톤 UI 스타일 컴포넌트
const SkeletonItem = styled.div`
  width: 200px;
  height: 150px;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  margin: 10px;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(200%);
    }
  }
`;

const SkeletonTitle = styled.div`
  background: #e0e0e0;
  width: 80%;
  height: 20px;
  margin: 20px auto;
  border-radius: 4px;
`;

const SkeletonContent = styled.div`
  background: #e0e0e0;
  width: 90%;
  height: 14px;
  margin: 10px auto;
  border-radius: 4px;
`;
