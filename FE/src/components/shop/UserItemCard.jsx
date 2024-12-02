import styled from "styled-components";

const UserItemCard = ({ image, title, type, description, price, onUse }) => {
  return (
    <Card>
      <Image src={`http://localhost:8080${image}`} alt={title} />
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Description>가격: {price}</Description>
      <Description>타입: {type === 1 ? "프로필" : "배경"}</Description>
      <Button onClick={onUse}>적용하기</Button>
    </Card>
  );
};

export default UserItemCard;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  margin: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 8px 0;
  text-align: center;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 16px 0;
  text-align: center;
`;

const Button = styled.button`
  background-color: #6b5b95;
  color: white;
  border: none;
  padding: 8px 24px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #574b7c;
  }
`;
