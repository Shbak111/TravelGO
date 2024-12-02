import { useNavigate, useParams } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";

function MyPlanDetail() {
  const params = useParams();
  const axios = useAxios();
  const navigate = useNavigate();
  const [isDetailLoading, setDetailLoading] = useState(false);
  const [detail, setDetail] = useState();

  async function fetchDetail() {
    setDetailLoading(true);
    await axios
      .get(`/myplans/detail/${params.myplan_id}`)
      .then((res) => {
        console.log(res.data);
        setDetail(res.data);
      })
      .finally(() => {
        setDetailLoading(false);
      });
  }

  useEffect(() => {
    fetchDetail();
  }, []);

  const handleBack = () => {
    navigate(`/mypage/plans`, { replace: true });
  };

  // 삭제 핸들러
  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/myplans/${params.myplan_id}`);
      alert("플랜이 성공적으로 삭제되었습니다.");
      navigate("/mypage/plans", { state: { refresh: true } });
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 수정 핸들러
  const handleEdit = () => {
    navigate(`/mypage/myplan/update/${params.myplan_id}`);
  };

  return (
    <>
      {isDetailLoading ? (
        <LoaderWrapper>
          <ClipLoader />
        </LoaderWrapper>
      ) : (
        <PlanDetailContainer>
          <HeaderSection>
            <BackButton type="button" onClick={handleBack}>
              뒤로가기
            </BackButton>
            <PlanTitle>{detail?.myplan_title}</PlanTitle>
            <PlanActions>
              <EditButton onClick={handleEdit}>수정</EditButton>
              <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
            </PlanActions>
          </HeaderSection>
          <Divider />

          <PlanContent>
            <AttractionsContainer>
              <AttractionsTitle>방문할 장소</AttractionsTitle>
              <AttractionsGrid>
                {detail?.attractions?.map((attraction, index) => (
                  <AttractionCard key={attraction.id}>
                    <CardHeader>
                      <span>
                        {index + 1}. {attraction.title}
                      </span>
                      <ContentType>{attraction.content_type_name}</ContentType>
                    </CardHeader>
                    <CardImage
                      src={attraction.first_image1 || "http://localhost:8080/assets/attraction_img.png"}
                      alt={attraction.title}
                    />
                    <CardContent>
                      <p>
                        {attraction.sido_name}/{attraction.gugun_name}
                      </p>
                      <p>주소: {attraction.addr1}</p>
                    </CardContent>
                  </AttractionCard>
                ))}
              </AttractionsGrid>
            </AttractionsContainer>
            <Divider />
            <h3>총 거리: {detail?.distance}km</h3>
            <PlanParagraph>{detail?.myplan_detail}</PlanParagraph>
          </PlanContent>
        </PlanDetailContainer>
      )}
    </>
  );
}

// 스타일 컴포넌트
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const PlanDetailContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-family: "Arial", sans-serif;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const PlanTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%;
`;

const BackButton = styled(Button)`
  background-color: #e0e0e0;
  color: #666;

  &:hover {
    background-color: #d0d0d0;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 2px solid #ddd;
  margin: 15px 0;
`;

const PlanContent = styled.div`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #333;
  position: relative;
`;

const PlanParagraph = styled.p`
  white-space: pre-wrap;
  margin-bottom: 20px;
`;

const AttractionsContainer = styled.div`
  margin-top: 30px;
`;

const AttractionsTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const AttractionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
`;

const AttractionCard = styled.div`
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background: #f4f4f4;
  font-weight: bold;
  color: #333;
  border-bottom: 1px solid #ddd;
`;

const ContentType = styled.span`
  font-size: 0.9rem;
  color: #777;
`;

const CardImage = styled.img`
  width: 100%;
  height: auto; /* 자동 높이로 조정하여 잘리지 않게 함 */
  max-height: 200px; /* 최대 높이를 제한 */
  object-fit: contain; /* 이미지를 잘리지 않고 비율에 맞게 조정 */
  background-color: #f0f0f0; /* 비율에 맞지 않는 이미지를 대비해 배경색 추가 */
`;

const CardContent = styled.div`
  padding: 15px;
  font-size: 0.9rem;
  color: #555;
`;

const PlanActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  justify-content: flex-end;
`;

const EditButton = styled(Button)`
  background-color: #ffc107;
  color: #fff;

  &:hover {
    background-color: #e0a800;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;
  color: #fff;

  &:hover {
    background-color: #c82333;
  }
`;
export default MyPlanDetail;
