import ReactDOM from "react-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useAxios } from "../../hooks/useAxios";
import ReactMarkdown from "react-markdown";

const PlanAiModel = ({ isOpen, onClose, places = [] }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");
  const axios = useAxios();

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const fetchData = async () => {
    try {
      setLoading(true);
      let prompt = "";
      places.forEach((item, idx) => {
        prompt += item?.title + " ";
      });
      prompt += `이 순서대로 여행을 하고자 하는데, 어떤지 5점 만점으로 평가해줘. 그리고 다음에 오는 형식대로 결과를 말해줘.
            1. 여행 일정의 순서
                [여행일정]
            평가:
            이유: 
            2. 이동수단 추천
            []에서 []:
            이동 수단: 
            소요 시간:
            평가: 
            (여행지가 있다면 2번을 반복)
            3. 전반적인 난이도
            평가:
            이유:
            4. 종합 평가
            총점: 
            평가:
            5. 결론`;
      prompt += `총점과 평가는 늘 별5개를 기준으로 평가해. 그리고 평가할땐 냉정하게 힘들거 같으면 힘들거 같다고 구체적으로 비평해줘. 그리고 마크다운을 사용해서 좀 더 보기좋게 만들어줘`;
      prompt += `추가로 이동수단 추천을 할때 [] 이 사이에 내가 준 여행지 명을 넣어줘, 각 번호들 사이에 줄을 그어서 구분해줘`;

      const response = await axios
        .post("/ai/ask", {
          content: prompt,
        })
        .then((res) => JSON.parse(res.data.response))
        .then((data) => {
          setData(data.choices[0].message.content);
        });
    } catch (error) {
      console.error(error);
      setData("평가 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <Overlay onClick={onClose} />
      <ModalContainer>
        <CloseButton onClick={onClose}>✕</CloseButton>
        <Title>AI 평가</Title>
        {loading ? (
          <LoadingContainer>
            <LoadingText>AI가 평가하는 중입니다...</LoadingText>
            <LoadingSpinner />
          </LoadingContainer>
        ) : data ? (
          <ContentContainer>
            <ReactMarkdown>{data}</ReactMarkdown>
          </ContentContainer>
        ) : (
          <EmptyState>결과를 불러올 수 없습니다.</EmptyState>
        )}
      </ModalContainer>
    </>,
    document.getElementById("modal-root")
  );
};

export default PlanAiModel;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
  height: 700px;
  background-color: #ffffff; /* 외부 배경 하얀색 */
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 24px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  font-size: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  color: #666;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: bold;
  color: #2c3e50; /* 더 깊은 색감 */
  margin-bottom: 16px;
  text-align: center;
`;

const LoadingContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background-color: #fcfcfd; /* 로딩 배경 강조 */
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  padding: 20px;
`;

const LoadingText = styled.p`
  font-size: 18px;
  color: #34495e;
  font-weight: 500;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 6px solid #e5e5e5;
  border-top: 6px solid #3498db; /* 눈에 띄는 색상 */
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  background-color: #f4f4f4; /* 데이터 영역 약간 어두운 배경 */
  border-radius: 12px;
  padding: 24px;
  line-height: 1.6;
  overflow-y: auto;
  white-space: pre-wrap;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  color: #7f8c8d;
  font-size: 16px;
  font-weight: 500;
  padding: 24px;
  background-color: #f9f9f9;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
`;
