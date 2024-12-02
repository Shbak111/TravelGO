import React, { useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";
import { ClipLoader } from "react-spinners";
import ProfileSection from "../components/mypages/ProfileSection";
import ExperienceBar from "../components/mypages/ExperienceBar";
import BadgeGallery from "../components/mypages/BadgeGallery";
import styled from "styled-components";

function MyPage() {
  const [isUserLoading, setUserLoading] = useState(false);
  const [isBadgeLoading, setBadgeLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [badges, setBadges] = useState([]);
  const axios = useAxios();

  async function fetchUser() {
    setUserLoading(true);
    await axios
      .get("/users/mypage")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {})
      .finally(() => {
        setUserLoading(false);
      });
  }

  async function fetchMyBadges(page) {
    setBadgeLoading(true);
    await axios
      .get("/badges/mybadge", {
        params: { page },
      })
      .then((res) => {
        console.log(res.data);
        setBadges(res.data);
      })
      .catch(() => {})
      .finally(() => {
        setBadgeLoading(false);
      });
  }

  useEffect(() => {
    fetchUser();
    fetchMyBadges(1);
  }, []);

  const handlePageChange = (page) => {
    fetchMyBadges(page);
  };

  return (
    <PageContainer>
      {isUserLoading || isBadgeLoading ? (
        <ClipLoader />
      ) : (
        <>
          <ProfileSection user={user} />
          <ExperienceBar currentExp={user?.rank_point} />
          <BadgeGallery badges={badges} handlePageChange={handlePageChange} />
        </>
      )}
    </PageContainer>
  );
}

export default MyPage;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background: #f0f2f5;
  min-height: 100vh;
`;
