import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Map, MapMarker, CustomOverlayMap, Polyline } from "react-kakao-maps-sdk"; // Kakao Map 컴포넌트
import { useAxios } from "../hooks/useAxios.js";
import PaginationBar from "../components/common/PaginationBar.jsx";
import Modal from "../components/attraction/Modal.jsx";
import {
  Container,
  DeleteButton,
  FilterBar,
  FilterSelect,
  Header,
  LeftPanel,
  MapContainer,
  PanelTitle,
  PlaceAddress,
  PlaceContact,
  PlaceItem,
  PlaceList,
  PlaceOrder,
  PlaceTitle,
  RightPanel,
  SearchBox,
  SearchButton,
  SearchInput,
  SelectButton,
  PlanListButton,
  TotalDistance,
  UpdateButton,
  PlanTitleInput,
  PlanDescriptionTextarea,
  InputLabel,
  PlanInputContainer,
  ButtonWrapper,
} from "../styles/attraction/AttractionStyle.jsx";

const MyPlanUpdate = () => {
  const axios = useAxios();
  const params = useParams();
  const mapRef = useRef(); // Kakao Map 객체를 참조할 변수
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [cityOptions, setCityOptions] = useState([]); // 도시 옵션
  const [districtOptions, setDistrictOptions] = useState([]); // 구/군 옵션
  const [categoryOptions, setCategoryOptions] = useState([]); // 카테고리 옵션
  const [city, setCity] = useState(""); // 도시 필터
  const [district, setDistrict] = useState(""); // 구/군 필터
  const [category, setCategory] = useState(""); // 카테고리 필터
  const [searchResults, setSearchResults] = useState([]); // 검색된 관광지 결과
  const [selectedPlaces, setSelectedPlaces] = useState([]); // 사용자가 선택한 관광지
  const [mapCenter, setMapCenter] = useState({ lat: 37.5665, lng: 126.978 }); // 지도 중심 좌표
  const [selectedMarker, setSelectedMarker] = useState(null); // 클릭된 마커 정보
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(false); // 우측 패널 표시 여부
  const [currentPosition, setCurrentPosition] = useState(null); // 현재 위치
  const [totalDistance, setTotalDistance] = useState(0); // 총 거리
  const [selectedPlace, setSelectedPlace] = useState(null); // 클릭된 관광지 정보
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const [planTitle, setPlanTitle] = useState(""); // 플랜 제목
  const [planDescription, setPlanDescription] = useState(""); // 플랜 상세 설명

  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  // Kakao Map 유틸리티를 이용한 두 지점 간 거리 계산 함수
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371e3; // 지구 반지름 (단위: 미터)
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // 거리 (단위: 미터)
  };

  const fetchPlanDetails = async () => {
    try {
      const response = await axios.get(`/myplans/detail/${params.myplan_id}`);

      const { myplan_title, myplan_detail, attractions } = response.data;

      setPlanTitle(myplan_title);
      setPlanDescription(myplan_detail);
      setSelectedPlaces(attractions);
      if (attractions.length > 0) {
        const bounds = new kakao.maps.LatLngBounds();
        attractions.forEach((place) => {
          bounds.extend(new kakao.maps.LatLng(place.latitude, place.longitude));
        });

        // 지도 객체가 있으면 bounds 적용
        if (mapRef.current) {
          mapRef.current.setBounds(bounds); // 지도 이동 및 배율 조정
        }

        setMapCenter({
          lat: attractions[0].latitude,
          lng: attractions[0].longitude,
        }); // 첫 번째 장소를 중심으로 설정
      }
      calculateTotalDistance();
    } catch (error) {
      console.error("플랜 상세 정보를 불러오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    // 도시 및 카테고리 데이터 로드
    const fetchFilters = async () => {
      try {
        const response = await axios.get("/attractions/filter");
        const { sido, content_type } = response.data; // 서버에서 도시 및 카테고리 정보 가져옴
        setCityOptions(sido);
        setCategoryOptions(content_type);
      } catch (error) {
        console.error("도시 및 카테고리 정보를 가져오지 못했습니다.", error);
      }
    };

    // 현재 위치
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude }); // 현재 위치 설정
        setMapCenter({ lat: latitude, lng: longitude }); // 지도 중심을 현재 위치로 설정
      },
      (error) => {
        console.error("현재 위치를 가져올 수 없습니다.", error);
      }
    );

    fetchFilters();
    fetchPlanDetails();
    handleSearch();
  }, []);

  //구군 정보 요청 함수
  const getGugun = async (e) => {
    const selectedCityCode = e.target.value;
    setCity(selectedCityCode);
    setDistrict(""); // 구/군 초기화
    setDistrictOptions([]); // 구/군 옵션 초기화

    if (selectedCityCode) {
      try {
        const response = await axios.get(`/attractions/filter/${selectedCityCode}`);
        setDistrictOptions(response.data.gugun); // 응답 데이터를 구/군 옵션으로 설정
      } catch (error) {
        console.error("구/군 정보를 가져오는 중 오류가 발생했습니다.", error);
      }
    }
  };

  const calculateTotalDistance = () => {
    let distance = 0;
    if (selectedPlaces.length > 1) {
      for (let i = 0; i < selectedPlaces.length - 1; i++) {
        const curr = selectedPlaces[i];
        const next = selectedPlaces[i + 1];
        distance += calculateDistance(curr.latitude, curr.longitude, next.latitude, next.longitude);
      }
    }
    setTotalDistance((distance / 1000).toFixed(2)); // 단위: km
  };
  // 총 거리 계산
  useEffect(() => {
    const bounds = new kakao.maps.LatLngBounds();
    selectedPlaces.forEach((place) => {
      bounds.extend(new kakao.maps.LatLng(place.latitude, place.longitude));
    });
    calculateTotalDistance();
  }, [selectedPlaces]);

  //관광지 검색
  const handleSearch = async (page) => {
    try {
      const params = new URLSearchParams();
      if (city) params.append("area-code", city);
      if (district) params.append("si-gun-gu-code", district);
      if (category) params.append("content-type-id", category);
      if (searchKeyword) params.append("keyword", searchKeyword);
      // page가 숫자인 경우에만 추가
      if (typeof page === "number") {
        params.append("page", page);
      }
      params.append("size", 5);

      const response = await axios.get(`/attractions?${params.toString()}`);

      const { list, page_num, pages, has_next_page, has_previous_page } = response.data;

      setSearchResults(list); // 검색 결과 업데이트

      setPageInfo({
        currentPage: page_num,
        totalPages: pages,
        hasNextPage: has_next_page,
        hasPreviousPage: has_previous_page,
      });
      if (list.length > 0) {
        updateMapBounds(list); // 검색 결과에 따라 지도 중심 및 배율 업데이트
      } else {
        console.log("검색 결과가 없습니다.");
      }
    } catch (error) {
      console.error("검색 결과를 가져오는 중 오류가 발생했습니다.", error);
    }
  };

  // 페이지 이동
  const handlePageChange = (page_num) => {
    handleSearch(page_num);
  };

  // 관광지 클릭 시 지도 중심 이동, 자세한 정보
  const handlePlaceClick = async (place) => {
    try {
      // 지도 중심 좌표 상태 업데이트
      if (place.latitude !== 0 && place.longitude !== 0) {
        setMapCenter({ lat: place.latitude, lng: place.longitude });
      }

      // 서버로 관광지 상세 정보 요청
      const response = await axios.get(`/attractions/${place.no}`);
      const detailedPlace = response.data;

      // 선택된 장소 데이터 설정 (추가 정보 포함)
      setSelectedPlace({
        ...place,
        content_type_name: detailedPlace.content_type_name,
      });

      // 모달 열기
      setIsModalOpen(true);
    } catch (error) {
      console.error("관광지 상세 정보를 가져오는 데 실패했습니다.", error);
    }
  };

  // 지도 경계 업데이트 함수
  const updateMapBounds = (places) => {
    if (places.length === 0) return;

    const bounds = new kakao.maps.LatLngBounds();

    places.forEach((place) => {
      if (place.latitude !== 0 && place.longitude !== 0) {
        bounds.extend(new kakao.maps.LatLng(place.latitude, place.longitude));
      }
    });

    // 지도 객체가 있으면 bounds 적용
    if (mapRef.current) {
      mapRef.current.setBounds(bounds); // 지도 이동 및 배율 조정
    }
  };

  // 관광지 선택
  const handleSelectPlace = (place, event) => {
    event.stopPropagation();
    const alreadySelected = selectedPlaces.some((selected) => selected.no === place.no); // 중복 확인
    if (!alreadySelected) {
      setSelectedPlaces((prev) => [...prev, place]); // 중복되지 않은 경우에만 추가
    } else {
      console.log("이미 선택된 관광지입니다."); // 중복 선택 시 메시지 출력
    }
  };

  // 관광지 삭제
  const handleDelete = (index) => {
    setSelectedPlaces((prevPlaces) => prevPlaces.filter((_, i) => i !== index)); // 특정 관광지를 삭제
  };

  // 수정 요청
  const handleUpdatePlan = async () => {
    try {
      console.log(selectedPlaces);

      const placeIds = selectedPlaces.map((place) => place.no);

      await axios.put(`/myplans`, {
        myplan_id: params.myplan_id,
        myplan_title: planTitle,
        myplan_detail: planDescription,
        distance: totalDistance,
        attractions: placeIds,
      });

      alert("플랜이 성공적으로 업데이트되었습니다.");
      console.log(params.myplan_id);

      navigate(-1, { state: { refresh: true }, replace: true });
    } catch (error) {
      console.error("플랜 업데이트 중 오류 발생:", error);
      alert("플랜 업데이트에 실패했습니다.");
    }
  };

  return (
    <Container>
      <Header>
        <FilterBar>
          {/* 도시, 구/군, 카테고리 필터 */}
          <FilterSelect value={city} onChange={getGugun}>
            <option value="">도시 선택</option>
            {cityOptions.map((city) => (
              <option key={city.sido_code} value={city.sido_code}>
                {city.sido_name}
              </option>
            ))}
          </FilterSelect>
          <FilterSelect
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            disabled={!city} // 도시가 선택되지 않으면 비활성화
          >
            <option value="">구/군 선택</option>
            {districtOptions.map((option) => (
              <option key={option.gugun_code} value={option.gugun_code}>
                {option.gugun_name}
              </option>
            ))}
          </FilterSelect>
          <FilterSelect value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">카테고리 선택</option>
            {categoryOptions.map((option) => (
              <option key={option.content_type_id} value={option.content_type_id}>
                {option.content_type_name}
              </option>
            ))}
          </FilterSelect>
          <SearchBox>
            <SearchInput
              type="text"
              placeholder="장소 검색"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyUp={(e) => {
                if (e.key == "Enter") {
                  handleSearch();
                }
              }}
            />
            <SearchButton onClick={handleSearch}>검색</SearchButton>
            <PlanListButton onClick={() => setIsRightPanelVisible((prev) => !prev)}>플랜 리스트</PlanListButton>
          </SearchBox>
        </FilterBar>
      </Header>

      <div style={{ display: "flex", flex: 1 }}>
        {/* 검색 결과 패널 */}
        <LeftPanel>
          <PanelTitle>검색 결과</PanelTitle>
          <PlaceList style={{ maxHeight: "500px", overflowY: "auto" }}>
            {searchResults.map((place) => (
              <PlaceItem key={place.no} onClick={() => handlePlaceClick(place)}>
                <img
                  src={place.first_image1 || "http://localhost:8080/assets/attraction_img.png"} // 이미지 경로, 없을 경우 기본 이미지 표시
                  alt={place.title}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    display: "block",
                    margin: "0 auto",
                  }}
                />
                <PlaceTitle>{place.title}</PlaceTitle>
                <PlaceAddress>{place.addr1}</PlaceAddress>
                <PlaceContact>전화: {place.phone || "정보 없음"}</PlaceContact>
                <SelectButton onClick={(event) => handleSelectPlace(place, event)}>선택하기</SelectButton>
              </PlaceItem>
            ))}
          </PlaceList>

          {/* 페이지네이션 */}
          <PaginationBar
            currentPage={pageInfo.currentPage}
            totalPages={pageInfo.totalPages}
            hasNextPage={pageInfo.hasNextPage}
            hasPreviousPage={pageInfo.hasPreviousPage}
            onPageChange={handlePageChange}
          />
        </LeftPanel>

        {/* 지도 */}
        <MapContainer style={{ flex: isRightPanelVisible ? 0.7 : 1 }}>
          <Map
            ref={mapRef} // ref 설정
            center={mapCenter} // 기본 중심
            style={{ width: "100%", height: "100%" }}
            level={3} // 기본 확대 레벨, bounds 적용 시 무시됨
            onCreate={(map) => {
              mapRef.current = map; // Kakao Map 객체를 ref에 저장
            }}
          >
            {/* 현재 위치 마커 표시 */}
            {currentPosition && (
              <MapMarker
                position={currentPosition}
                title="현재 위치"
                image={{
                  src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 현재 위치 마커 아이콘
                  size: { width: 24, height: 35 },
                }}
              />
            )}

            {/* 검색된 마커 표시 */}
            {searchResults.map((marker) => (
              <MapMarker
                key={marker.no} // 고유 식별자로 "no" 사용
                position={{ lat: marker.latitude, lng: marker.longitude }} // latitude와 longitude를 position으로 설정
                title={marker.title} // 관광지 이름 표시
                onClick={() => {
                  setMapCenter({ lat: marker.latitude, lng: marker.longitude });
                  setSelectedMarker(marker);
                }} // 마커 클릭 시 정보 표시
              />
            ))}

            {/* 선택된 마커는 다른 색상 */}
            {selectedPlaces.map((place, index) => (
              <MapMarker
                key={place.id}
                position={{ lat: place.latitude, lng: place.longitude }}
                title={`${index + 1}: ${place.title}`}
                image={{
                  src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                  size: { width: 24, height: 35 },
                }}
              />
            ))}
            {/* 선택된 경로 표시 */}
            {selectedPlaces.length > 1 && ( // 선택된 장소가 2개 이상일 때만 경로 표시
              <Polyline
                path={selectedPlaces.map((place) => ({
                  lat: place.latitude,
                  lng: place.longitude,
                }))} // 선택된 관광지의 경로만 포함
                strokeWeight={5} // 선 두께
                strokeColor="#3498db" // 선 색상
                strokeOpacity={0.8} // 선 불투명도
                strokeStyle="solid" // 선 스타일
              />
            )}

            {/* 마커 클릭 시 정보 표시 */}
            {selectedMarker && (
              <CustomOverlayMap
                position={{ lat: selectedMarker.latitude, lng: selectedMarker.longitude }} // latitude와 longitude를 position으로 설정
                yAnchor={1.2} // 마커 위로 표시
              >
                <div
                  style={{
                    background: "#fff",
                    padding: "10px",
                    borderRadius: "4px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    position: "relative",
                    width: "200px", // 창 너비 설정
                    wordWrap: "break-word", // 텍스트 줄바꿈 처리
                    overflow: "hidden", // 가로 스크롤 방지
                    textOverflow: "ellipsis", // 텍스트 넘칠 경우 생략
                    whiteSpace: "normal", // 텍스트 줄바꿈 허용
                  }}
                >
                  {/* 닫기 버튼 */}
                  <button
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      background: "rgba(0, 0, 0, 0.7)", // 어두운 반투명 배경
                      color: "#fff", // 흰색 텍스트
                      border: "none",
                      borderRadius: "50%",
                      width: "24px",
                      height: "24px",
                      fontSize: "16px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => setSelectedMarker(null)}
                  >
                    ✕
                  </button>
                  {/* 마커 정보 */}
                  <img
                    src={selectedMarker.first_image1 || "http://localhost:8080/assets/attraction_img.png"} // 이미지 경로, 없을 경우 기본 이미지 표시
                    alt={selectedMarker.title}
                    style={{
                      width: "100%",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      marginBottom: "8px",
                    }}
                  />
                  <h4 style={{ margin: "5px 0", fontSize: "16px", fontWeight: "bold" }}>{selectedMarker.title}</h4>
                  <p style={{ margin: "5px 0", fontSize: "14px", color: "#666" }}>{selectedMarker.addr1}</p>
                  <p style={{ margin: "5px 0", fontSize: "14px", color: "#666" }}>
                    {selectedMarker.phone || "전화번호 없음"}
                  </p>
                  {/* 선택 버튼 */}
                  <button
                    style={{
                      marginTop: "10px",
                      padding: "8px 16px",
                      background: "#1A73E8", // 파란색 배경
                      color: "#fff", // 흰색 텍스트
                      border: "none",
                      borderRadius: "4px",
                      fontSize: "14px",
                      cursor: "pointer",
                      display: "block",
                      width: "100%",
                    }}
                    onClick={(event) => handleSelectPlace(selectedMarker, event)} // 선택 함수 호출
                  >
                    선택하기
                  </button>
                </div>
              </CustomOverlayMap>
            )}
          </Map>
        </MapContainer>

        <PlanInputContainer>
          <InputLabel htmlFor="planTitle">플랜 제목</InputLabel>
          <PlanTitleInput
            id="planTitle"
            type="text"
            value={planTitle}
            onChange={(e) => setPlanTitle(e.target.value)}
            placeholder="플랜 제목을 입력하세요"
          />

          <InputLabel htmlFor="planDescription" style={{ marginTop: "20px" }}>
            플랜 설명
          </InputLabel>
          <PlanDescriptionTextarea
            id="planDescription"
            value={planDescription}
            onChange={(e) => setPlanDescription(e.target.value)}
            placeholder="플랜 설명을 입력하세요"
          />

          <ButtonWrapper>
            <UpdateButton onClick={handleUpdatePlan}>플랜 수정</UpdateButton>
          </ButtonWrapper>
        </PlanInputContainer>
        {/* 선택된 관광지 패널 */}
        {isRightPanelVisible && (
          <RightPanel>
            <PanelTitle>선택된 관광지</PanelTitle>
            <PlaceList style={{ maxHeight: "500px", overflowY: "auto" }}>
              {/* 총 거리 표시 */}
              {selectedPlaces.length > 1 && <TotalDistance>총 거리: {totalDistance} km</TotalDistance>}
              {selectedPlaces.map((place, index) => (
                <PlaceItem
                  key={place.no}
                  onClick={() => {
                    if (place.latitude !== 0 && place.longitude !== 0) {
                      setMapCenter({ lat: place.latitude, lng: place.longitude });
                    }
                  }}
                >
                  <img
                    src={place.first_image1 || "http://localhost:8080/assets/attraction_img.png"} // 이미지 경로, 없을 경우 기본 이미지 표시
                    alt={place.title}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      display: "block",
                      margin: "0 auto",
                    }}
                  />
                  <PlaceOrder>{index + 1}</PlaceOrder>
                  <PlaceTitle>{place.title}</PlaceTitle>
                  <PlaceAddress>{place.addr1}</PlaceAddress>
                  <PlaceContact>전화: {place.phone || "정보 없음"}</PlaceContact>
                  <DeleteButton
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDelete(index);
                    }}
                  >
                    삭제
                  </DeleteButton>
                </PlaceItem>
              ))}
            </PlaceList>
          </RightPanel>
        )}
        {isModalOpen && (
          <Modal
            place={selectedPlace}
            onClose={() => setIsModalOpen(false)} // 모달 닫기
          />
        )}
      </div>
    </Container>
  );
};

export default MyPlanUpdate;
