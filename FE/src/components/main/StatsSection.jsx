import styled from "styled-components";

const Stats = ({ totalPlans, totalUsers, totalAttractions, planLoading, userLoading, attractionLoading }) => (
  <StatsSection>
    <StatsTitle>활동 통계</StatsTitle>
    <StatsGrid>
      <StatCard>
        {planLoading ? null : totalPlans ? <StatNumber>{totalPlans}</StatNumber> : <StatNumber>{0}</StatNumber>}
        <StatLabel>공유된 플랜</StatLabel>
      </StatCard>
      <StatCard>
        {userLoading ? null : totalUsers ? <StatNumber>{totalUsers}</StatNumber> : <StatNumber>{0}</StatNumber>}
        <StatLabel>사용자</StatLabel>
      </StatCard>
      <StatCard>
        {attractionLoading ? null : totalAttractions ? (
          <StatNumber>{totalAttractions}</StatNumber>
        ) : (
          <StatNumber>{0}</StatNumber>
        )}
        <StatLabel>총 관광지</StatLabel>
      </StatCard>
    </StatsGrid>
  </StatsSection>
);

export default Stats;

const StatsSection = styled.section`
  width: 100%;
  padding: 40px 20px;
  background-color: #f9f9f9;
  text-align: center;
`;

const StatsTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 30px;
  color: #333;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  justify-content: center;
`;

const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* 애니메이션 추가 */

  &:hover {
    transform: translateY(-10px); /* 위로 살짝 올라가는 효과 */
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); /* 그림자 강조 */
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1a73e8;
  margin-bottom: 10px;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #666;
`;
