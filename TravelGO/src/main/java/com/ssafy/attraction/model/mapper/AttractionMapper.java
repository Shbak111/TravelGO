package com.ssafy.attraction.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.ssafy.attraction.dto.Attraction;
import com.ssafy.attraction.dto.DetailAttractionResponse;

@Mapper
public interface AttractionMapper {

//	관광지 조회
	List<?> getAttractions(Attraction attraction);

//	id로 관광지 상세정보 조회
	DetailAttractionResponse getDetailAttraction(@Param("no") int no);

//	id로 관광지 유형 이름 요청
	String getContentTypeName(@Param("contentTypeId") int contentTypeId);

//	시도 정보 조회
	List<String> getSido();

//	관광지 유형 정보 조회
	List<String> getContentType();

//	구군 정보 조회
	List<?> getGugun(int areaCode);

}
