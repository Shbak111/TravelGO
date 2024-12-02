package com.ssafy.myplan.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.pagehelper.PageInfo;
import com.ssafy.myplan.dto.AddMyPlanRequest;
import com.ssafy.myplan.dto.DetailMyPlanResponse;
import com.ssafy.myplan.model.service.MyPlanService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/myplans")
@Tag(name = "Plan Controller", description = "여행 플랜 관련 요청을 처리하는 클래스")
public class MyPlanController {
	private final MyPlanService myPlanService;
	
	@Operation(summary = ("유저 플랜 모두 조회"), description = ("userId로 유저 플랜 조회하기"))
	@GetMapping("/user")
	public ResponseEntity<?> getMyPlan(
			HttpServletRequest request,
			@RequestParam(value = "page", defaultValue = "1") int page,
			@RequestParam(value = "size", defaultValue = "10") int size
			) {
		String userId = (String) request.getAttribute("userId");
		PageInfo<?> response = myPlanService.getMyPlan(userId, page, size);
		
		return ResponseEntity.ok(response);
	}
	
	@Operation(summary = ("특정 플랜 상세 조회"), description = ("myplanId로 플랜 상세 조회하기"))
	@GetMapping("/detail/{myplan-id}")
	public ResponseEntity<DetailMyPlanResponse> getMyPlanDetail(@PathVariable("myplan-id") int myplanId) {
		DetailMyPlanResponse response = myPlanService.getMyPlan(myplanId);
		return ResponseEntity.ok(response);
	}
	
	@Operation(summary = ("내 플랜 등록하기"), description = ("내 플랜 등록하기"))
	@PostMapping
	public ResponseEntity<?> addMyPlan(@RequestBody AddMyPlanRequest myPlanRequest, HttpServletRequest request) {
		String userId = (String) request.getAttribute("userId");
		myPlanRequest.setUserId(userId);
		int cnt = myPlanService.addMyPlan(myPlanRequest);
		return ResponseEntity.status(201).body("등록성공!");
	}
	
	@Operation(summary = ("내 플랜 수정하기"), description = ("myplanId인 플랜 수정하기"))
	@PutMapping
	public ResponseEntity<Void> updateMyPlan(@RequestBody AddMyPlanRequest myPlanRequest, HttpServletRequest request){
		String userId = (String) request.getAttribute("userId");
		myPlanRequest.setUserId(userId);
		int cnt = myPlanService.updateMyPlan(myPlanRequest);
		return ResponseEntity.noContent().build();
	}
	
	@Operation(summary = ("내 플랜 삭제하기"), description = ("myplanId인 플랜 삭제하기"))
	@DeleteMapping("/{myplan-id}")
	public ResponseEntity<Void> deleteMyPlan(@PathVariable("myplan-id") int myplanId){
		int cnt = myPlanService.deleteMyPlan(myplanId);
		return ResponseEntity.noContent().build();
	}
	
}
