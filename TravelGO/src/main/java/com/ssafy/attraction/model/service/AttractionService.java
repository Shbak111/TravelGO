package com.ssafy.attraction.model.service;

import java.util.List;

import com.github.pagehelper.PageInfo;
import com.ssafy.attraction.dto.Attraction;
import com.ssafy.attraction.dto.DetailAttractionResponse;
import com.ssafy.attraction.dto.GetSidoAndContentTypeResponse;

public interface AttractionService {

	/**
	 * 지역별 카테고리별 키워드별로 관광지 조회
	 * @param size 
	 * @param page 
	 * @param Attraction
	 * @return PageInfo
	 */
	PageInfo<?> getAttractions(Attraction attraction, int page, int size);

	/**
	 * 관광지 상세정보 조회
	 * @param no
	 * @return DetailAttractionResponse
	 */
	DetailAttractionResponse getDetailAttraction(int no);

	/**
	 * 시도 정보와 관광지 유형 정보 조회
	 * @return
	 */
	GetSidoAndContentTypeResponse getSidoAndContentType();

	/**
	 * 시도 코드에 관한 구군 정보 조회
	 * @param areaCode
	 * @return List
	 */
	List<?> getGugun(int areaCode);

}
