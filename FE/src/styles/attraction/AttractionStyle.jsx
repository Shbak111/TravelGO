import styled from "styled-components";

// 패널 제목 스타일
export const PanelTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

// 장소 리스트 컨테이너
export const PlaceList = styled.div`
  flex: 1;
  overflow-y: auto; /* 세로 스크롤 활성화 */
  margin-bottom: 20px;
`;

// 장소 아이템 스타일
export const PlaceItem = styled.div`
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: #f8f9fa; /* 밝은 회색 배경 */
  opacity: 0;
  transform: translateY(10px);
  animation: fadeIn 0.5s ease-in-out forwards; /* 애니메이션 추가 */
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05); /* 살짝 확대 */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  }
  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// 장소 이름 스타일
export const PlaceTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
`;

// 장소 주소 스타일
export const PlaceAddress = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

// 장소 연락처 스타일
export const PlaceContact = styled.p`
  font-size: 14px;
  color: #666;
`;

// 삭제 버튼 스타일
export const DeleteButton = styled.button`
  padding: 5px 10px;
  background-color: #dc3545; /* 빨간색 */
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: #c82333; /* 어두운 빨간색 */
  }
`;

// 플랜 등록 버튼 스타일
export const AddPlanButton = styled.button`
  padding: 15px;
  background-color: #28a745; /* 녹색 */
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #218838; /* 어두운 녹색 */
  }
`;
// 플랜 등록 버튼 스타일
export const UpdateButton = styled.button`
  padding: 15px;
  background-color: #28a745; /* 녹색 */
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #218838; /* 어두운 녹색 */
  }
`;

// 필터 입력 필드 스타일
export const FilterInput = styled.input`
  flex: 1;
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

// 장소 순서 표시 스타일
export const PlaceOrder = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
`;

// 페이지 상단 헤더 스타일
export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
  animation: fadeIn 0.5s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

// 전체 레이아웃 컨테이너 스타일
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* 화면 높이 100% */
  width: 100%; /* 화면 너비 100% */
`;

// 필터 바 스타일
export const FilterBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px; /* 요소 간 간격 */
  margin-bottom: 20px;
`;

// 필터 Select Box 스타일
export const FilterSelect = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: #fff; /* 흰색 배경 */
  min-width: 150px; /* 최소 너비 설정 */
  height: 40px; /* 높이 통일 */
`;

// 검색 박스 스타일
export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* 검색 입력과 버튼 간 간격 */
`;

// 검색 입력 필드 스타일
export const SearchInput = styled.input`
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 300px; /* 너비 유지 */
  height: 40px;
  transition: box-shadow 0.3s, transform 0.3s;

  &:focus {
    box-shadow: 0 0 10px #3498db;
    transform: scale(1.02);
  }
`;

// 검색 버튼 스타일
export const SearchButton = styled.button`
  padding: 0 20px;
  background-color: #3498db; /* 파란색 */
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  height: 40px; /* 높이 통일 */
  transition: background-color 0.3s, transform 0.3s; /* 애니메이션 추가 */

  &:hover {
    background-color: #2980b9; /* 어두운 파란색 */
    transform: scale(1.1); /* 버튼 확대 효과 */
  }
  &:active {
    transform: scale(0.95); /* 클릭 시 축소 효과 */
  }
`;

// 좌측 패널 스타일
export const LeftPanel = styled.div`
  flex: 0.3; /* 좌측 패널 크기 */
  padding: 20px;
  border-right: 1px solid #ddd; /* 패널 구분선 */
  overflow-y: auto;
  background-color: #f1f1f1; /* 밝은 회색 배경 */
  animation: fadeInLeft 0.5s ease-in-out;

  @keyframes fadeInLeft {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

// 지도 영역 스타일
export const MapContainer = styled.div`
  flex: 0.4; /* 지도 영역 크기 */
  height: 90%; /* 패널 높이 전체 사용 */
  border-radius: 10px; /* 모서리 둥글게 */
  overflow: hidden; /* 내부 초과 요소 숨김 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 그림자 추가 */
  animation: zoomIn 0.5s ease-out; /* 애니메이션 추가 */

  @keyframes zoomIn {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

// 선택 버튼 스타일
export const SelectButton = styled.button`
  margin-top: 10px;
  padding: 5px 15px;
  background-color: #2ecc71; /* 초록색 */
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #27ae60; /* 어두운 초록색 */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 버튼 그림자 효과 */
  }
`;

// 우측 패널 토글 버튼 스타일
export const RightPanelToggle = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #3498db; /* 파란색 */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  z-index: 1000;

  &:hover {
    background-color: #2980b9; /* 어두운 파란색 */
  }
`;

// 플랜 리스트 버튼 스타일
export const PlanListButton = styled.button`
  margin-left: 15px;
  padding: 10px 20px;
  background-color: #3498db; /* 파란색 */
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9; /* 어두운 파란색 */
  }
`;

// 우측 패널 스타일
export const RightPanel = styled.div`
  flex: 0.3; /* 패널 크기 */
  padding: 20px;
  border-left: 1px solid #ddd; /* 패널 구분선 */
  overflow-y: auto; /* 세로 스크롤 */
  background-color: #f9f9f9; /* 밝은 회색 배경 */
  transform: translateX(100%);
  animation: slideIn 0.5s ease-in-out forwards; /* 애니메이션 추가 */

  @keyframes slideIn {
    to {
      transform: translateX(0);
    }
  }
`;

export const TotalDistance = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  color: #333;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// 플랜 제목 입력 필드 스타일
export const PlanTitleInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 10px;
  font-size: 24px; // 제목을 더 크게
  font-weight: bold; // 강조
  border: 2px solid #ddd; // 더 두껍고 선명한 테두리
  border-radius: 6px;
  outline: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // 약간의 그림자
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #3498db; // 포커스 시 파란색 테두리
    box-shadow: 0 4px 8px rgba(52, 152, 219, 0.2); // 포커스 시 더 강한 그림자
  }
`;

// 플랜 설명 입력 필드 스타일
export const PlanDescriptionTextarea = styled.textarea`
  width: 100%;
  min-height: 100px; // 최소 높이
  padding: 15px;
  font-size: 16px;
  line-height: 1.6;
  border: 2px solid #ddd;
  border-radius: 6px;
  outline: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  resize: vertical; // 사용자가 높이 조절 가능
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #3498db;
    box-shadow: 0 4px 8px rgba(52, 152, 219, 0.2);
  }
`;

// 입력 섹션 컨테이너 스타일
export const InputSection = styled.div`
  margin-bottom: 20px; // 섹션 간 여백
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9; // 밝은 배경색
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// 입력 라벨 스타일
export const InputLabel = styled.label`
  display: block; // 라벨과 입력란을 블록으로 분리
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

// 플랜 입력 컨테이너 스타일
export const PlanInputContainer = styled.div`
  margin: 20px auto; // 전체 컨테이너 중앙 정렬
  padding: 20px;
  max-width: 600px; // 적당한 너비 설정
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #ffffff; // 흰 배경
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // 부드러운 그림자
`;

// 버튼을 하단에 정렬하는 컨테이너 스타일
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end; // 버튼을 오른쪽 정렬
  margin-top: 20px; // 버튼과 입력 필드 사이 간격
`;
