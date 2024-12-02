package com.ssafy.attraction.model.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.ssafy.attraction.dto.Attraction;
import com.ssafy.attraction.dto.DetailAttractionResponse;
import com.ssafy.attraction.dto.GetSidoAndContentTypeResponse;
import com.ssafy.attraction.model.mapper.AttractionMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AttractionServiceImpl implements AttractionService {
	private final AttractionMapper attractionMapper;

//	관광지 조회 요청 (title과 addr1, 이미지를 담은 리스트 반환)
	@Override
	public PageInfo<?> getAttractions(Attraction attraction, int page, int size) {
        PageHelper.startPage(page, size);  // 페이지 설정
        List<?> list = attractionMapper.getAttractions(attraction);
        
//		조회한 관광지가 없을 때
		if(list.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.NO_CONTENT, "No Content");
		}
        return new PageInfo<>(list);  // PageInfo로 감싸서 반환
    }

//	관광지 상세 정보 조회 요청
	@Override
	public DetailAttractionResponse getDetailAttraction(int no) {
		DetailAttractionResponse response = attractionMapper.getDetailAttraction(no);
		
//		관광지 유형 요청
		String name = attractionMapper.getContentTypeName(response.getContentTypeId());
		response.setContentTypeName(name);
		
		return response;
	}

//	시도 정보와 관광지 유형 정보 조회
	@Override
	public GetSidoAndContentTypeResponse getSidoAndContentType() {
		List<?> sido = attractionMapper.getSido();
		List<?> contentType = attractionMapper.getContentType();		
		
		GetSidoAndContentTypeResponse response = new GetSidoAndContentTypeResponse(sido, contentType);
		return response;
	}

//	시도 코드에 관한 구군 정보 조회
	@Override
	public List<?> getGugun(int areaCode) {
		List<?> list = attractionMapper.getGugun(areaCode);
		return list;
	}
	
}
