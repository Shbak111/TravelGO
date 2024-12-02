package com.ssafy.attraction.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.pagehelper.PageInfo;
import com.ssafy.attraction.dto.Attraction;
import com.ssafy.attraction.dto.DetailAttractionResponse;
import com.ssafy.attraction.dto.GetGugun;
import com.ssafy.attraction.dto.GetSidoAndContentTypeResponse;
import com.ssafy.attraction.model.service.AttractionService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;



@RestController
@RequiredArgsConstructor
@RequestMapping("/attractions")
@Tag(name = "Attraction Controller", description = "관광지에 관한 요청을 처리하는 클래스")
public class AttractionController {
	private final AttractionService attractionService;
	
//	관광지 조회
	@Operation(summary = "관광지 조회", description = "도시, 구군, 카테고리별로 관광지 조회하기")
	@GetMapping // GET: /attractions?area-code={area-code}&si-gun-gu-code={si-gun-gu-code}&content-type-id={content-type-id}&keyword={keyword}
	public ResponseEntity<?> getAttractions(
			@RequestParam(value = "area-code", required = false, defaultValue = "0") Integer areaCode, 
			@RequestParam(value = "si-gun-gu-code", required = false, defaultValue = "0") Integer siGunGuCode,
			@RequestParam(value = "content-type-id", required = false, defaultValue = "0") Integer contentTypeId,
			@RequestParam(value = "keyword", required = false) String keyword,
			@RequestParam(value = "page", required = false, defaultValue = "1") int page,
	        @RequestParam(value = "size", required = false, defaultValue = "20") int size) {
		
//		파라미터 담기
		Attraction attraction = new Attraction();
		attraction.setAreaCode(areaCode);
		attraction.setSiGunGuCode(siGunGuCode);
		attraction.setContentTypeId(contentTypeId);
		attraction.setKeyword(keyword);
		
//		PageInfo 객체로 페이지 정보까지 받아오기
		PageInfo<?> response = attractionService.getAttractions(attraction, page, size);
	    return ResponseEntity.ok(response);
	}
	
//	관광지 상세 조회
	@Operation(summary = "특정 관광지 상세조회", description = "특정 관광지에대한 자세한 정보")
	@GetMapping("/{no}") //GET: /attractions/{no}
	public ResponseEntity<DetailAttractionResponse> getDetailAttractions(@PathVariable("no") int no) {
		DetailAttractionResponse response = attractionService.getDetailAttraction(no);
		
		return ResponseEntity.ok(response);
	}
	
//	도시, 관광지 유형 정보 가져오기
	@Operation(summary = "시도 정보와 관광지 유형 정보 조회", description = "시도 정보와 관광지 유형 정보 조회")
	@GetMapping("/filter")  //GET: /attractions/filter
	public ResponseEntity<?> getSidoAndContentType(){
		GetSidoAndContentTypeResponse response = attractionService.getSidoAndContentType();
		return ResponseEntity.ok(response);
	}
	
//	구군 정보 가져오기
	@Operation(summary = "구군 정보 조회", description = "시도 코드와 관련된 구군 정보 조회")
	@GetMapping("/filter/{area-code}")  //GET: /attractions/filter/{area-code}
	public ResponseEntity<?> getGugun(@PathVariable("area-code") int areaCode){
		GetGugun response = new GetGugun(attractionService.getGugun(areaCode));
		return ResponseEntity.ok(response);
	}
	
	
}
