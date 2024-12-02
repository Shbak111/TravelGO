import styled from "styled-components";
import ItemCard from "../components/shop/ItemCard";
import { useAxios } from "../hooks/useAxios";
import { useEffect, useState } from "react";
import PaginationBar from "../components/common/PaginationBar";

const ShopPage = () => {
  const axios = useAxios();
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
      .get("/items/list")
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

  async function purchaseItem(idx) {
    try {
      await axios.post(`/items/purchase/${idx}`);
      alert("구매 성공!!!");
    } catch (error) {
      if (error.response.status === 400) {
        alert("마일리지가 부족합니다!!");
      } else if (error.response.status === 409) {
        alert("이미 구매한 아이템입니다.");
      }
    }
  }

  const onPurchase = async (idx) => {
    await purchaseItem(idx);
    fetchMileage();
  };

  return (
    <PageContainer>
      <PageTitle>마일리지 상점 💎:{mileage}</PageTitle>

      <ItemsGrid>
        {items?.map((item, index) => (
          <ItemCard
            key={index}
            idx={item?.item_id}
            type={item?.item_type}
            image={item?.item_img}
            title={item?.item_name}
            price={item?.price}
            description={item?.item_description}
            onPurchase={() => onPurchase(item?.item_id)}
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

export default ShopPage;

// ShopPage.js
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const PageTitle = styled.h1`
  text-align: center;
  font-size: 24px;
  margin-bottom: 40px;
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  justify-items: center;
  margin-bottom: 40px;
`;
