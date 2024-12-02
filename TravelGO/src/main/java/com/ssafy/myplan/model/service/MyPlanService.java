package com.ssafy.myplan.model.service;

import com.github.pagehelper.PageInfo;
import com.ssafy.myplan.dto.AddMyPlanRequest;
import com.ssafy.myplan.dto.DetailMyPlanResponse;

public interface MyPlanService {

	/**
	 * 내 모든 플랜 조회
	 * @param userId
	 * @return List
	 */
	PageInfo<?> getMyPlan(String userId,int page,int size);

	/**
	 * myplanId로 내 플랜 상세 조회
	 * @param myplanId
	 * @return
	 */
	DetailMyPlanResponse getMyPlan(int myplanId);

	/**
	 * 내 플랜 등록
	 * @param request
	 * @return int
	 */
	int addMyPlan(AddMyPlanRequest request);

	/**
	 * 특정 플랜 수정
	 * @param request
	 * @return
	 */
	int updateMyPlan(AddMyPlanRequest request);

	/**
	 * 특정 플랜 삭제
	 * @param myplanId
	 * @return
	 */
	int deleteMyPlan(int myplanId);

}
