import styled from "styled-components";
import { useAxios } from "../hooks/useAxios";
import { useEffect, useState } from "react";
import PaginationBar from "../components/common/PaginationBar";
import UserItemCard from "../components/shop/UserItemCard";
import { useNavigate } from "react-router-dom";

const MyPageUpdate = () => {
  const axios = useAxios();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [mileage, setMileage] = useState(0);
  const [isItemLoading, setIsItemLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  async function fetchItems(page) {
    setIsItemLoading(true);
    await axios
      .get("/items/list/user")
      .then((res) => {
        console.log(res.data.list);
        setItems(res.data.list);
        setPageInfo({
          currentPage: res.data.page_num,
          totalPages: res.data.pages,
          hasNextPage: res.data.has_next_page,
          hasPreviousPage: res.data.has_previous_page,
        });
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsItemLoading(false);
      });
  }

  async function fetchMileage() {
    await axios
      .get("/users/mypage")
      .then((res) => {
        setMileage(res.data.mileage);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    fetchMileage();
    fetchItems(1);
  }, []);

  const handlePageChange = (page) => {
    fetchItems(page);
  };

  async function fetchProfile(img) {
    await axios
      .patch(`/items/patch/profile`, {
        profile_img: img,
      })
      .then(() => {
        alert("프로필 변경 완료");
        navigate("/mypage");
      });
  }

  async function fetchBackground(img) {
    await axios
      .patch(`/items/patch/background`, {
        background_img: img,
      })
      .then(() => {
        alert("배경 변경 완료");
        navigate("/mypage");
      });
  }

  const onUse = async (type, img) => {
    if (type === 1) {
      fetchProfile(img);
    } else {
      fetchBackground(img);
    }
  };

  return (
    <PageContainer>
      <Header>
        <PageTitle>내 아이템</PageTitle>
        <BackButton onClick={() => navigate(-1)}>뒤로가기</BackButton>
      </Header>
      💎:{mileage}
      <ItemsGrid>
        {items?.map((item, index) => (
          <UserItemCard
            key={index}
            idx={item?.item_id}
            image={item?.item_img}
            type={item?.item_type}
            title={item?.item_name}
            price={item?.price}
            description={item?.item_description}
            onUse={() => onUse(item?.item_type, item?.item_img)}
          />
        ))}
      </ItemsGrid>
      {/* 페이지네이션은 이미 구현되어 있다고 가정 */}
      <PaginationBar
        currentPage={pageInfo.currentPage}
        totalPages={pageInfo.totalPages}
        hasNextPage={pageInfo.hasNextPage}
        hasPreviousPage={pageInfo.hasPreviousPage}
        onPageChange={handlePageChange}
      />
    </PageContainer>
  );
};

export default MyPageUpdate;

// ShopPage.js
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 제목은 중앙, 버튼은 오른쪽 끝 */
  margin-bottom: 40px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  text-align: center;
  flex: 1; /* 제목을 중앙에 정렬하기 위해 flex-grow 사용 */
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

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  justify-items: center;
  margin-bottom: 40px;
`;
