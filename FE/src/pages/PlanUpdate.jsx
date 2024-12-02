import { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import { ClipLoader } from "react-spinners";
import PlanModal from "../components/planboard/PlanModal";

function PlanUpdate() {
  const params = useParams();
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [myplans, setMyplans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null); // 선택된 플랜 정보
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const axios = useAxios();

  const [isEditLoading, setEditLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPlan) {
      alert("내 플랜을 선택해주세요.");
      return;
    }

    setEditLoading(true);

    try {
      await axios.put(`/plan-boards`, {
        plan_id: params.plan_id,
        plan_title: title,
        plan_detail: detail,
        myplan_id: selectedPlan.myplan_id,
      });
      alert("글이 성공적으로 수정되었습니다.");
      navigate(`/plan/detail/${params.plan_id}`, {
        state: {
          page: location.state.page,
          keyWord: location.state.keyWord,
          refresh: true,
        },
      }); // 상세 페이지로 이동
    } catch (e) {
      console.error(e);
      alert("글 수정 중 오류가 발생했습니다.");
    } finally {
      setEditLoading(false);
    }
  };

  const handleBack = () => {
    navigate(`/plan/detail/${params.plan_id}`, {
      state: {
        page: location.state.page,
        keyWord: location.state.keyWord,
        refresh: true,
      },
    });
  };

  const fetchInitialData = async () => {
    setEditLoading(true);
    try {
      // 초기 데이터 불러오기
      const response = await axios.get(`/plan-boards/detail/${params.plan_id}`);
      const plan = response.data;
      setTitle(plan.plan_title);
      setDetail(plan.plan_detail);

      const res = await axios.get(`/myplans/detail/${plan.myplan_id}`);
      const myplan = res.data;
      setSelectedPlan({
        myplan_detail: myplan.myplan_detail,
        myplan_id: myplan.myplan_id,
        myplan_title: myplan.myplan_title,
        created_at: myplan.created_at,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setEditLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();

    const fetchUserPlans = async () => {
      try {
        const response = await axios.get("/myplans/user");
        setMyplans(response.data.list);
      } catch (e) {
        console.error(e);
      }
    };

    fetchUserPlans();
  }, []);

  return (
    <PlanContainer>
      <Title>내 플랜 글 수정</Title>
      {isEditLoading ? <ClipLoader /> : null}
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="title">제목</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요"
            required
          />
        </InputGroup>

        <InputGroup>
          <Label>선택된 플랜</Label>
          {selectedPlan ? (
            <SelectedPlanCard>
              <PlanTitle>{selectedPlan.myplan_title}</PlanTitle>
              <PlanDetail>{selectedPlan.myplan_detail}</PlanDetail>
              <PlanInfo>
                <InfoRow>
                  <InfoLabel>작성일:</InfoLabel>
                  <InfoValue>{selectedPlan.created_at || "알 수 없음"}</InfoValue>
                </InfoRow>
              </PlanInfo>
            </SelectedPlanCard>
          ) : (
            <NoPlanSelected>선택된 플랜이 없습니다.</NoPlanSelected>
          )}
          <Label>내 플랜 선택</Label>
          <Button type="button" onClick={() => setIsModalOpen(true)}>
            내 플랜 선택하기
          </Button>
        </InputGroup>

        {/* 내 플랜 선택 모달 */}
        {isModalOpen && (
          <PlanModal
            plans={myplans}
            onSelect={(plan) => {
              setSelectedPlan(plan);
              setIsModalOpen(false);
            }}
            onClose={() => setIsModalOpen(false)}
          />
        )}

        <InputGroup>
          <Label htmlFor="detail">내용</Label>
          <TextArea
            id="detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="내용을 입력해주세요"
            required
          />
        </InputGroup>

        <ButtonGroup>
          <BackButton type="button" onClick={handleBack}>
            뒤로가기
          </BackButton>
          <SubmitButton type="submit">수정완료</SubmitButton>
        </ButtonGroup>
      </Form>
    </PlanContainer>
  );
}

// 기존 스타일은 동일
const PlanContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #666;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1rem;
  min-height: 300px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SubmitButton = styled(Button)`
  background-color: #4a90e2;
  color: white;
  flex: 1;

  &:hover {
    background-color: #357abd;
  }
`;

const BackButton = styled(Button)`
  background-color: #e0e0e0;
  color: #666;

  &:hover {
    background-color: #d0d0d0;
  }
`;

const SelectedPlanCard = styled.div`
  border: 1px solid #e0e0e0;
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const PlanTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
`;

const PlanDetail = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
`;

const PlanInfo = styled.div`
  margin-top: 1rem;
  font-size: 0.9rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const InfoLabel = styled.span`
  font-weight: bold;
  color: #444;
`;

const InfoValue = styled.span`
  color: #666;
`;

const NoPlanSelected = styled.p`
  color: #999;
  font-size: 0.9rem;
  font-style: italic;
`;

export default PlanUpdate;
