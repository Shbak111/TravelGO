package com.ssafy.planboard.controller;

import java.util.List;

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
import com.ssafy.planboard.dto.AddPlanBoard;
import com.ssafy.planboard.dto.DetailPlanBoardResponse;
import com.ssafy.planboard.dto.PlanComments;
import com.ssafy.planboard.model.service.PlanBoardService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
@RequestMapping("/plan-boards")
@Tag(name = "Plan Board Controller", description = "여행 플랜 게시판 관련 요청을 처리하는 클래스")
public class PlanBoardController {
	private final PlanBoardService planBoardService;
	
//	플랜 게시판 조회
	@Operation(summary = "플랜 게시판 조회", description = "플랜 게시판 글 조회")
	@GetMapping
	public ResponseEntity<?> getPlanBoard(
			@RequestParam(value = "keyword", required = false) String keyword,
			@RequestParam(value = "page", required = false, defaultValue = "1") int page,
	        @RequestParam(value = "size", required = false, defaultValue = "20") int size) {
		
//		PageInfo 객체로 페이지 정보까지 받아오기
		PageInfo<?> response = planBoardService.getPlanBoard(keyword, page, size);
		return ResponseEntity.ok(response);
	}
	
//	특정 글 상세 조회
	@Operation(summary = "플랜 게시판 특정 글 상세 조회", description = "planId로 글 상세 조회")
	@GetMapping("/detail/{plan-id}")
	public ResponseEntity<?> getPlanBoardDetail(@PathVariable("plan-id") int planId) {
		DetailPlanBoardResponse response = planBoardService.getPlanBoardDetail(planId);
		return ResponseEntity.ok(response);
	}
	
//	글 작성
	@Operation(summary = "플랜 게시판 글쓰기", description = "글 작성하기")
	@PostMapping
	public ResponseEntity<?> addPlanBoard(@RequestBody AddPlanBoard planBoardRequest, HttpServletRequest request){
		String userId = (String) request.getAttribute("userId");
		planBoardRequest.setUserId(userId);
		int cnt = planBoardService.addPlanBoard(planBoardRequest);
		return ResponseEntity.status(201).body("등록 성공!");
	}
	
//	글 수정	
	@Operation(summary = "플랜 게시판 글 수정하기", description = "글 수정하기")
	@PutMapping
	public ResponseEntity<?> updatePlanBoard(@RequestBody AddPlanBoard request){
		int cnt = planBoardService.updatePlanBoard(request);
		return ResponseEntity.noContent().build();
	}
	
//	글 삭제
	@Operation(summary = "플랜 게시판 글 삭제하기", description = "글 삭제하기")
	@DeleteMapping("/{plan-id}")
	public ResponseEntity<?> deletePlanBoard(@PathVariable("plan-id") int planId){
		int cnt = planBoardService.deletePlanBoard(planId);
		return ResponseEntity.noContent().build();
	}
	
//	특정 글에 내가 좋아요 했는지 여부
	@Operation(summary = "특정 글 좋아요 여부", description = "좋아요 한 글인지 확인")
	@GetMapping("/hit/{plan-id}")
	public ResponseEntity<?> getHit(@PathVariable("plan-id") int planId, HttpServletRequest request) {
		String userId = (String) request.getAttribute("userId");
		planBoardService.getHit(userId, planId);
		return ResponseEntity.status(200).build();
	}
	
//	특정 글에 좋아요 하기
	@Operation(summary = "특정 글 좋아요 등록", description = "좋아요 누르기")
	@PostMapping("/hit/{plan-id}")
	public ResponseEntity<?> addHit(@PathVariable("plan-id") int planId, HttpServletRequest request) {
		String userId = (String) request.getAttribute("userId");		
		planBoardService.addHit(userId, planId);
		return ResponseEntity.status(201).body("좋아요 성공");
	}
	
//	특정 글에 좋아요 취소하기
	@Operation(summary = "특정 글 좋아요 취소하기", description = "좋아요 취소")
	@DeleteMapping("/hit/{plan-id}")
	public ResponseEntity<?> deleteHit(@PathVariable("plan-id") int planId, HttpServletRequest request) {
		String userId = (String) request.getAttribute("userId");		
		planBoardService.deleteHit(userId, planId);
		return ResponseEntity.noContent().build();
	}
	
//	특정 글의 댓글 조회하기
	@Operation(summary = "특정 글의 댓글 조회", description = "특정 글의 모든 댓글 조회")
	@GetMapping("/comment/{plan-id}")
	public ResponseEntity<?> selectComments(@PathVariable("plan-id") int planId) {
		List<?> response = planBoardService.selectComments(planId);
		return ResponseEntity.ok(response);
	}
	
//	특정 글에 댓글 작성하기
	@Operation(summary = "특정 글에 댓글 작성", description = "특정 글에 댓글을 작성")
	@PostMapping("/comment")
	public ResponseEntity<?> addComments(@RequestBody PlanComments planCommentsRequest, HttpServletRequest request) {
		String userId = (String) request.getAttribute("userId");	
		planCommentsRequest.setUserId(userId);
		int cnt = planBoardService.addComments(planCommentsRequest);
		return ResponseEntity.status(201).build();
	}
	
//	특정 글에 댓글 수정하기
	@Operation(summary = "특정 댓글 수정하기", description = "특정 댓글을 수정")
	@PutMapping("/comment")
	public ResponseEntity<?> updateComments(@RequestBody PlanComments planCommentsRequest, HttpServletRequest request) {
		String userId = (String) request.getAttribute("userId");	
		planCommentsRequest.setUserId(userId);
		int cnt = planBoardService.updateComments(planCommentsRequest);
		return ResponseEntity.noContent().build();
	}
	
//	특정 댓글 삭제하기
	@Operation(summary = "특정 댓글 삭제하기", description = "특정 댓글 삭제하기")
	@DeleteMapping("/comment/{comment-id}")
	public ResponseEntity<?> updateComments(@PathVariable("comment-id") int commentId) {
		int cnt = planBoardService.deleteComments(commentId);
		return ResponseEntity.noContent().build();
	}
	
}
