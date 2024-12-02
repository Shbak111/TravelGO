package com.ssafy.statistics.model.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ssafy.statistics.model.mapper.StatisticsMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StatisticsServiceImpl implements StatisticsService {
	private final StatisticsMapper statMapper;
	
	@Override
	public int countAllPlanBoard() {
		int cnt = statMapper.countAllPlanBoard();
		
		if(cnt == 0) {
			throw new ResponseStatusException(HttpStatus.NO_CONTENT);
		}
		
		return cnt;
	}

	@Override
	public int countAllUsers() {
		int cnt = statMapper.countAllUsers();
		
		if(cnt == 0) {
			throw new ResponseStatusException(HttpStatus.NO_CONTENT);
		}
		
		return cnt;
	}

	@Override
	public int countAllAttractions() {
		int cnt = statMapper.countAllAttractions();
		
		if(cnt == 0) {
			throw new ResponseStatusException(HttpStatus.NO_CONTENT);
		}
		
		return cnt;
	}

	@Override
	public int countUserPlan(String userId) {
		int cnt = statMapper.countUserPlan(userId);
		
		if(cnt == 0) {
			throw new ResponseStatusException(HttpStatus.NO_CONTENT);
		}
		
		return cnt;
	}
	
	@Override
	public int countUserReview(String userId) {
		int cnt = statMapper.countUserReview(userId);
		
		if(cnt == 0) {
			throw new ResponseStatusException(HttpStatus.NO_CONTENT);
		}
		
		return cnt;
	}

	@Override
	public int countUserHits(String userId) {
		int cnt = statMapper.countUserHits(userId);
		
		if(cnt == 0) {
			throw new ResponseStatusException(HttpStatus.NO_CONTENT);
		}
		
		return cnt;
	}
}
