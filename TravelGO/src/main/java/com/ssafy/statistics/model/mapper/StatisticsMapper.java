package com.ssafy.statistics.model.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface StatisticsMapper {
	// 메인화면 통계
	public int countAllPlanBoard();
	public int countAllUsers();
	public int countAllAttractions();
	
	// 유저 통계
	public int countUserPlan(String userId);
	public int countUserReview(String userId);
	public int countUserHits(String userId);
}
