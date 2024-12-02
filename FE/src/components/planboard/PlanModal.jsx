import styled from "styled-components";

const PlanModal = ({ plans, onSelect, onClose }) => (
  <ModalContainer>
    <ModalContent>
      <h2>내 플랜 목록</h2>
      {plans.map((plan) => (
        <PlanItem key={plan.myplan_id} onClick={() => onSelect(plan)}>
          <PlanTitle>{plan.myplan_title}</PlanTitle>
          <PlanDetails>
            <DetailRow>
              <Label>내용:</Label>
              <Value>{plan.myplan_detail}</Value>
            </DetailRow>
            <DetailRow>
              <Label>작성일:</Label>
              <Value>{plan.created_at || "알 수 없음"}</Value>
            </DetailRow>
          </PlanDetails>
        </PlanItem>
      ))}
      <CloseButton onClick={onClose}>닫기</CloseButton>
    </ModalContent>
  </ModalContainer>
);

export default PlanModal;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  width: 90%;
  max-width: 600px;
  max-height: 80%;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
`;

const PlanList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 20px;
`;

const PlanItem = styled.div`
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #f9f9f9;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e8f0fe;
    border-color: #4a90e2;
  }
`;

const PlanTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
`;

const PlanDetails = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const DetailRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.3rem;
`;

const Label = styled.span`
  font-weight: bold;
  color: #444;
`;

const Value = styled.span`
  color: #666;
`;

const CloseButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.8rem;
  border: none;
  background-color: #1a73e8;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #1557b0;
  }
`;
