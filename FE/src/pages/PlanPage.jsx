import { useEffect, useState } from "react";
import { BoardContainer, Title, TopSection, WriteButton, SearchSection, Table } from "../styles/ReviewStyles.jsx";
import { useAxios } from "../hooks/useAxios.js";
import PaginationBar from "../components/common/PaginationBar.jsx";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useInput } from "../hooks/useInput.js";
import styled from "styled-components";

// 스켈레톤 UI를 위한 스타일드 컴포넌트
const SkeletonCell = styled.td`
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
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

const SkeletonContent = styled.div`
  background: #f0f0f0;
  height: 20px;
  border-radius: 4px;
  width: ${(props) => props.width || "100%"};
`;

function PlanPage() {
  const [isStartLoading, setStartLoading] = useState(false);
  const [isSearchLoading, setSearchLoading] = useState(false);
  const [plans, setPlans] = useState({});
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const navigate = useNavigate();
  const location = useLocation();

  const hideByDetail = location.pathname.includes("/detail");
  const hideByAdd = location.pathname.includes("/add");

  const keyWord = useInput();
  const axios = useAxios();

  const MIN_LOADING_TIME = 300;

  const SkeletonRow = () => (
    <tr>
      <SkeletonCell>
        <SkeletonContent width="50px" />
      </SkeletonCell>
      <SkeletonCell>
        <SkeletonContent width="200px" />
      </SkeletonCell>
      <SkeletonCell>
        <SkeletonContent width="100px" />
      </SkeletonCell>
      <SkeletonCell>
        <SkeletonContent width="50px" />
      </SkeletonCell>
      <SkeletonCell>
        <SkeletonContent width="100px" />
      </SkeletonCell>
    </tr>
  );

  const formatDateTime = (isoDateString) => {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  async function fetchPlans(page, keyword) {
    setStartLoading(true);
    const startTime = Date.now();

    try {
      const params = new URLSearchParams();
      if (keyword) params.append("keyword", keyword);
      // page가 숫자인 경우에만 추가
      if (typeof page === "number") {
        params.append("page", page);
      }
      params.append("size", 20);

      const response = await axios.get(`/plan-boards?${params}`);

      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < MIN_LOADING_TIME) {
        await new Promise((resolve) => setTimeout(resolve, MIN_LOADING_TIME - elapsedTime));
      }

      setPlans(response.data);
      setPageInfo({
        currentPage: response.data.page_num,
        totalPages: response.data.pages,
        hasNextPage: response.data.has_next_page,
        hasPreviousPage: response.data.has_previous_page,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setStartLoading(false);
    }
  }

  useEffect(() => {
    fetchPlans(1, keyWord.value);
  }, []);

  useEffect(() => {
    if (location.state?.refresh) {
      fetchPlans(location.state?.page, location.state?.keyWord);
    }
  }, [location.state]);

  const handlePageChange = (page) => {
    fetchPlans(page, keyWord.value);
  };

  return (
    <>
      {hideByAdd || hideByDetail ? (
        <Outlet />
      ) : (
        <BoardContainer>
          <Title>플랜 게시판</Title>

          <TopSection>
            <WriteButton
              onClick={() =>
                navigate("/plan/add", {
                  state: {
                    page: pageInfo.currentPage,
                    keyWord: keyWord.value,
                    refresh: true,
                  },
                })
              }
            >
              글쓰기
            </WriteButton>

            <SearchSection>
              <select>
                <option value="title">제목</option>
              </select>
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                {...keyWord}
                onKeyUp={(e) => {
                  if (e.key == "Enter") {
                    fetchPlans(1, keyWord.value);
                  }
                }}
              />
              <button onClick={() => fetchPlans(1, keyWord.value)}>검색</button>
            </SearchSection>
          </TopSection>

          <Table>
            <thead>
              <tr>
                <th>글번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>좋아요</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {isStartLoading || isSearchLoading
                ? // 스켈레톤 UI
                  [...Array(10)].map((_, index) => <SkeletonRow key={index} />)
                : plans?.list?.map((item, idx) => (
                    <tr
                      key={idx}
                      onClick={() =>
                        navigate(`/plan/detail/${item.plan_id}`, {
                          state: { page: pageInfo.currentPage, keyWord: keyWord.value },
                        })
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <td>{item.plan_id}</td>
                      <td>{item.plan_title}</td>
                      <td>{item.user_name}</td>
                      <td>{item.hit}</td>
                      <td>{formatDateTime(item.created_at)}</td>
                    </tr>
                  ))}
            </tbody>
          </Table>

          <PaginationBar
            currentPage={pageInfo.currentPage}
            totalPages={pageInfo.totalPages}
            hasNextPage={pageInfo.hasNextPage}
            hasPreviousPage={pageInfo.hasPreviousPage}
            onPageChange={handlePageChange}
          />
        </BoardContainer>
      )}
    </>
  );
}

export default PlanPage;
