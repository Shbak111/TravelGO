package com.ssafy.myplan.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.ssafy.myplan.dto.AddMyPlanRequest;
import com.ssafy.myplan.dto.DetailMyPlanResponse;

@Mapper
public interface MyPlanMapper {

//	userId로 내 플랜 조회하기
	List<?> getMyPlan(@Param("userId") String userId);

//	myplanId로 내 플랜 상세 조회
	DetailMyPlanResponse getMyPlanDetail(@Param("myplanId") int myplanId);

//	myplanId로 특정 플랜 관광지들 조회
	List<?> getMyPlanAttractions(int myplanId);

//	내 플랜 등록하기
	int addMyPlan(AddMyPlanRequest request);

//	내 플랜 관광지 등록하기
	int addMyPlanAttractions(Map<String, Object> attraction);

//	myplanId인 플랜 수정하기
	int updateMyPlan(AddMyPlanRequest request);

//	myplan 관광지 모두 삭제하기
	int deleteMyPlanAttractions(int myplanId);

//	myplanId인 플랜 삭제하기
	int deleteMyPlan(int myplanId);

}
