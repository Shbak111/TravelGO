package com.ssafy.badge.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.pagehelper.PageInfo;
import com.ssafy.badge.dto.UserAndBadgeName;
import com.ssafy.badge.model.service.BadgeService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/badges")
@Tag(name = "BadgeController", description = "뱃지를 관리하는 컨트롤러")
public class BadgeController {
	
	private final BadgeService service;
	
	@GetMapping("/list")
	@Operation(summary = "모든 뱃지 조회", description = "존재하는 모든 뱃지의 정보를 조회함")
	public ResponseEntity<?> selectAll(
			@RequestParam(value = "page", required = false, defaultValue = "1") int page,
	        @RequestParam(value = "size", required = false, defaultValue = "20") int size) {
		
		PageInfo<?> response = service.selectAllBadges(page, size);
		
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/mybadge")
	@Operation(summary = "유저 뱃지 조회", description = "유저가 가진 모든 뱃지 정보 조회")
	public ResponseEntity<?> selectAllMyBadge(
			HttpServletRequest request,
			@RequestParam(value = "page", required = false, defaultValue = "1") int page,
	        @RequestParam(value = "size", required = false, defaultValue = "20") int size) {
		String userId = (String) request.getAttribute("userId");
		PageInfo<?> response = service.selectAllMyBadges(userId, page, size);
		
		return ResponseEntity.ok(response);
	}
	
	@PostMapping("/add")
	@Operation(summary = "유저에게 뱃지 추가", description = "특정 조건을 만족했을 때, 유저에게 뱃지 추가")
	public ResponseEntity<?> add(@RequestBody UserAndBadgeName ids){
		
		int cnt = service.addBadgeForUser(ids);
		
		return ResponseEntity.ok("뱃지 추가 성공!");
	}
	
	@GetMapping("/check")
	@Operation(summary = "획득한 배지가 있는지 확인", description ="새로 받은 배지가 있는지 확인")
	public ResponseEntity<?> check(HttpServletRequest request){
		String userId = (String) request.getAttribute("userId");
		int cnt = service.checkNewBadges(userId);
		return ResponseEntity.ok(cnt);
	}
	
}
