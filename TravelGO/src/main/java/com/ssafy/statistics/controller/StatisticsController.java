package com.ssafy.statistics.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.statistics.model.service.StatisticsService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/stats")
public class StatisticsController {
	private final StatisticsService statService;
	
	@GetMapping("/planboard")
	public ResponseEntity<?> getPlanboardCnt() {
		int cnt = statService.countAllPlanBoard();
		
		Map<String, Object> response = new HashMap<>();
		response.put("planboard_cnt", cnt);
		
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/users")
	public ResponseEntity<?> getUsersCnt() {
		int cnt = statService.countAllUsers();
		
		Map<String, Object> response = new HashMap<>();
		response.put("users_cnt", cnt);
		
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/attractions")
	public ResponseEntity<?> getAttractionsCnt() {
		int cnt = statService.countAllAttractions();
		
		Map<String, Object> response = new HashMap<>();
		response.put("attractions_cnt", cnt);
		
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/plans")
	public ResponseEntity<?> getUserPlansCnt(HttpServletRequest request) {
		String userId = (String) request.getAttribute("userId");
		
		int cnt = statService.countUserPlan(userId);
		
		Map<String, Object> response = new HashMap<>();
		response.put("user_plans_cnt", cnt);
		
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/reviews")
	public ResponseEntity<?> getUserReviewsCnt(HttpServletRequest request) {
		String userId = (String) request.getAttribute("userId");
		
		int cnt = statService.countUserReview(userId);
		
		Map<String, Object> response = new HashMap<>();
		response.put("user_reviews_cnt", cnt);
		
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/hits")
	public ResponseEntity<?> getUserHitsCnt(HttpServletRequest request) {
		String userId = (String) request.getAttribute("userId");
		
		int cnt = statService.countUserHits(userId);
		
		Map<String, Object> response = new HashMap<>();
		response.put("user_hits_cnt", cnt);
		
		return ResponseEntity.ok(response);
	}
}
