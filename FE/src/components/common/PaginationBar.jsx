import React from "react";
import styled from "styled-components";

const PaginationBar = ({ currentPage, totalPages, hasNextPage, hasPreviousPage, onPageChange }) => {
  // 유효한 페이지인지 확인 (0이나 음수일 경우 1페이지로 고정)
  const validPage = currentPage <= 0 ? 1 : currentPage;

  // 현재 페이지 그룹 계산
  const pageGroupSize = 5;
  const currentGroup = Math.floor((validPage - 1) / pageGroupSize);
  const startPage = currentGroup * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  // 페이지 번호 배열 생성
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  // 이전/다음 페이지 그룹 여부 확인
  const hasNextGroup = endPage < totalPages;
  const hasPrevGroup = startPage > 1;

  // 페이지 변경 핸들러 수정
  const handlePageChange = (page) => {
    // 유효하지 않은 페이지(0 이하)는 1페이지로 고정
    const safePage = page <= 0 ? 1 : Math.min(page, totalPages);
    onPageChange(safePage);
  };

  return (
    <PaginationWrapper>
      {/* First Page Button */}
      <Button onClick={() => handlePageChange(1)} $disabled={validPage === 1} $active={false}>
        {"<<"}
      </Button>

      {/* Previous Group Button */}
      <Button onClick={() => handlePageChange(startPage - 1)} $disabled={startPage === 1} $active={false}>
        {"<"}
      </Button>

      {/* Page Numbers */}
      {pageNumbers.map((pageNum) => (
        <PageButton key={pageNum} onClick={() => handlePageChange(pageNum)} $active={pageNum === validPage}>
          {pageNum}
        </PageButton>
      ))}

      {/* Next Group Button */}
      <Button onClick={() => handlePageChange(endPage + 1)} $disabled={endPage === totalPages} $active={false}>
        {">"}
      </Button>

      {/* Last Page Button */}
      <Button onClick={() => handlePageChange(totalPages)} $disabled={validPage === totalPages} $active={false}>
        {">>"}
      </Button>
    </PaginationWrapper>
  );
};

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 16px 0;
`;

const Button = styled.button`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: ${(props) => (props.$active ? "#007BFF" : "#fff")};
  color: ${(props) => (props.$active ? "#fff" : "#007BFF")};
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.$disabled ? 0.6 : 1)};
  pointer-events: ${(props) => (props.$disabled ? "none" : "auto")};
  transition: background-color 0.3s, color 0.3s, transform 0.2s;

  &:hover {
    background-color: ${(props) => (props.$disabled ? "#f0f0f0" : "#007BFF")};
    color: ${(props) => (props.$disabled ? "#aaa" : "#fff")};
    transform: ${(props) => (props.$disabled ? "none" : "scale(1.05)")};
  }
`;

const PageButton = styled(Button)`
  background-color: ${(props) => (props.$active ? "#007BFF" : "#f9f9f9")};
  color: ${(props) => (props.$active ? "#fff" : "#333")};
  border-color: ${(props) => (props.$active ? "#007BFF" : "#ddd")};
`;
export default PaginationBar;
