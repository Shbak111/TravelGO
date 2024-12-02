package com.ssafy.myplan.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.ssafy.myplan.dto.AddMyPlanRequest;
import com.ssafy.myplan.dto.DetailMyPlanResponse;
import com.ssafy.myplan.model.mapper.MyPlanMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MyPlanServiceImpl implements MyPlanService {
	private final MyPlanMapper myPlanMapper;

//	내 플랜 조회하기
	@Override
	public PageInfo<?> getMyPlan(String userId,int page,int size) {
		PageHelper.startPage(page,size);
		
		List<?> list = myPlanMapper.getMyPlan(userId);
		
		return new PageInfo<>(list);
	}

//	특정 플랜 상세 조회하기
	@Override
	public DetailMyPlanResponse getMyPlan(int myplanId) {
		DetailMyPlanResponse response = myPlanMapper.getMyPlanDetail(myplanId);
		List<?> list = myPlanMapper.getMyPlanAttractions(myplanId);
		response.setAttractions(list);
		return response;
	}

//	내 플랜 등록하기
	@Transactional
	@Override
	public int addMyPlan(AddMyPlanRequest request) {
//		특정 정보가 없다면 예외처리
		System.out.println(request.getMyplanTitle());
		if(request.getAttractions().isEmpty() || request.getMyplanTitle().length() == 0 || request.getMyplanDetail().length() == 0) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request");
		}
		
//		myplans 테이블에 등록
		int cnt = myPlanMapper.addMyPlan(request);
		
//		myplan_attractions 테이블에 등록한 플랜 관광지들을 등록
		List<Integer> list = request.getAttractions();
		for(int i = 0; i < list.size(); i++) {
			Map<String, Object> attraction = new HashMap<>();
			attraction.put("myplanId", request.getMyplanId());
			attraction.put("attractionId", list.get(i));
			attraction.put("myplanOrder", i+1);
			myPlanMapper.addMyPlanAttractions(attraction);
		}
		return cnt;
	}

//	특정 플랜 수정하기
	@Transactional
	@Override
	public int updateMyPlan(AddMyPlanRequest request) {
//		등록한 관광지가 없다면 예외처리
		if(request.getAttractions().isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Attraction is empty");
		}
		
//		myplans 테이블 수정
		int cnt = myPlanMapper.updateMyPlan(request);
		
//		수정할 플랜이 없으면 예외 처리
		if(cnt == 0) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No plan");
		}
		
//		기존 관광지 삭제
		myPlanMapper.deleteMyPlanAttractions(request.getMyplanId());
		
//		새로운 관광지 등록
		List<Integer> list = request.getAttractions();
		for(int i = 0; i < list.size(); i++) {
			Map<String, Object> attraction = new HashMap<>();
			attraction.put("myplanId", request.getMyplanId());
			attraction.put("attractionId", list.get(i));
			attraction.put("myplanOrder", i+1);
			myPlanMapper.addMyPlanAttractions(attraction);
		}
		return cnt;
	}

//	특정 플랜 삭제하기
	@Transactional
	@Override
	public int deleteMyPlan(int myplanId) {
//		myplanId인 플랜 삭제
		int cnt = myPlanMapper.deleteMyPlan(myplanId);
		
//		삭제한 플랜이 없으면 예외 처리
		if(cnt == 0) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No plan");
		}
		return cnt;
	}
}
