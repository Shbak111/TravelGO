import { useNavigate } from "react-router-dom";
import Intro from "../components/main/IntroSection";
import Stats from "../components/main/StatsSection";
import { useAxios } from "../hooks/useAxios";
import { useEffect, useState } from "react";

const MainPage = () => {
  const navigate = useNavigate();
  const axios = useAxios();
  const [planStat, setPlanStat] = useState(0);
  const [userStat, setUserStat] = useState(0);
  const [attractionStat, setAttractionStat] = useState(0);
  const [planLoading, setPlanLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [attractionLoading, setAttractionLoading] = useState(false);

  async function fetchPlanStat() {
    setPlanLoading(true);
    await axios
      .get("/stats/planboard")
      .then((res) => {
        setPlanStat(res.data.planboard_cnt);
      })
      .finally(() => setPlanLoading(false));
  }

  async function fetchUserStat() {
    setUserLoading(true);
    await axios
      .get("/stats/users")
      .then((res) => {
        setUserStat(res.data.users_cnt);
      })
      .finally(() => setUserLoading(false));
  }

  async function fetchAttractionStat() {
    setAttractionLoading(true);
    await axios
      .get("/stats/attractions")
      .then((res) => {
        setAttractionStat(res.data.attractions_cnt);
      })
      .finally(() => setAttractionLoading(false));
  }

  useEffect(() => {
    fetchPlanStat();
  }, []);

  useEffect(() => {
    fetchUserStat();
  }, []);

  useEffect(() => {
    fetchAttractionStat();
  }, []);

  const handleStart = () => {
    navigate("/attraction");
  };

  return (
    <div>
      <Intro onStart={handleStart} />
      <Stats
        totalPlans={planStat}
        totalUsers={userStat}
        totalAttractions={attractionStat}
        planLoading={planLoading}
        userLoading={userLoading}
        attractionLoading={attractionLoading}
      />
    </div>
  );
};

export default MainPage;
