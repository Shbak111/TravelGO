// src/hooks/useKakaoMap.js
import { useState, useEffect } from "react";

export const useKakaoMap = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchPlaces = async (keyword) => {
    if (!keyword.trim()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 카카오맵 Places 서비스 초기화
      const ps = new window.kakao.maps.services.Places();

      // Promise 형태로 변환
      const searchResult = await new Promise((resolve, reject) => {
        ps.keywordSearch(keyword, (data, status, pagination) => {
          if (status === window.kakao.maps.services.Status.OK) {
            resolve({ data, pagination });
          } else {
            reject(new Error("검색 결과를 찾을 수 없습니다."));
          }
        });
      });

      const formattedPlaces = searchResult.data.map((place) => ({
        id: place.id,
        name: place.place_name,
        address: place.address_name,
        phone: place.phone,
        lat: place.y,
        lng: place.x,
      }));

      setPlaces(formattedPlaces);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    places,
    loading,
    error,
    searchPlaces,
  };
};
