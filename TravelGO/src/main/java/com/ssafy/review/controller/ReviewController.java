package com.ssafy.review.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.github.pagehelper.PageInfo;
import com.ssafy.review.dto.Hit;
import com.ssafy.review.dto.Review;
import com.ssafy.review.dto.ReviewComments;
import com.ssafy.review.model.service.ReviewService;
import com.ssafy.util.FileStorageUtil;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reviews")
@Tag(name = "Review Controller", description = "리뷰 조회, 삭제, 등록, 수정 등을 담당하는 컨트롤러")
public class ReviewController {
	private final ReviewService service;
	private final FileStorageUtil fileStorageUtil;
	
	@Operation(summary = "전체 조회", description = "리뷰 전체를 조회하는 메서드")
	@GetMapping("/list")
	public ResponseEntity<?> selectAllReviews(
			@RequestParam(value = "page", defaultValue = "1") int page,
			@RequestParam(value = "size", defaultValue = "10") int size
			){
		
		PageInfo<?> response = service.selectAllReviews(page, size);
		
		return ResponseEntity.ok(response);
	}
	
	@Operation(summary = "내 리뷰 조회", description = "내가 작성한 리뷰를 조회하는 메서드")
	@GetMapping("/myreview")
	public ResponseEntity<?> selectMyReviews(
			HttpServletRequest request,
			@RequestParam(value = "page", defaultValue = "1") int page,
			@RequestParam(value = "size", defaultValue = "10") int size) {
		String userId = (String) request.getAttribute("userId");
		
		PageInfo<?> response = service.selectMyReviews(userId,page,size);
		
		return ResponseEntity.ok(response);
	}
	
	@Operation(summary = "리뷰 등록", description = "리뷰를 등록하는 메서드")
	@PostMapping("/add")
	public ResponseEntity<?> add(@RequestParam("review_title") String reviewTitle,
	        @RequestParam("review_content") String reviewContent,
	        @RequestParam(value = "image", required = false) MultipartFile imageFile, 
	        HttpServletRequest request){
		
		String userId = (String) request.getAttribute("userId");
		Review review = new Review();
		review.setUserId(userId);
	    review.setReviewTitle(reviewTitle);
	    review.setReviewContent(reviewContent);
		
	 // 이미지 처리
	    if (imageFile != null && !imageFile.isEmpty()) {
	        try {
	            String imagePath = fileStorageUtil.saveFile(imageFile);
	            review.setImagePath(imagePath);
	        } catch (IOException e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이미지 업로드 실패");
	        }
	    }
	    
		int cnt = service.add(review);
		
		System.out.println("추가시도한 review 정보: " + review);
		System.out.println("추가된 행 개수: "+ cnt);
		
		return ResponseEntity.status(201).body("등록 성공!");
	}
	
	@Operation(summary = "리뷰 상세조회", description = "리뷰를 상세조회하는 메서드")
	@GetMapping("/detail/{review-id}")
	public ResponseEntity<Review> detail(@PathVariable("review-id") int reviewId){
		Review review = service.detail(reviewId);
		
		return ResponseEntity.ok(review);
		
	}
	
	@Operation(summary = "리뷰 삭제", description = "리뷰를 삭제하는 메서드")
	@DeleteMapping("/delete/{review-id}")
	public ResponseEntity<?> delete(@PathVariable("review-id") int reviewId){
		int cnt = service.delete(reviewId);
		
		System.out.println("삭제된 행 개수: "+ cnt);
		
		return ResponseEntity.noContent().build();
	}
	
	@Operation(summary = "리뷰 수정", description = "리뷰를 수정하는 메서드")
	@PutMapping("/update")
	public ResponseEntity<?> update(
			@RequestParam("review_id") int reviewId,
	        @RequestParam("review_title") String reviewTitle,
	        @RequestParam("review_content") String reviewContent,
	        @RequestParam(value = "isImageDeleted", required = false) boolean isImageDeleted,
	        @RequestPart(value = "newImage", required = false) MultipartFile newImage,
	        HttpServletRequest request
			){
		
		String userId = (String) request.getAttribute("userId");
		
		// 기존 리뷰 정보 수정
	    Review review = new Review();
	    review.setReviewId(reviewId);
	    review.setReviewTitle(reviewTitle);
	    review.setReviewContent(reviewContent);
	    review.setUserId(userId);
	   
		int cnt = service.update(review, isImageDeleted, newImage);
		
		return ResponseEntity.noContent().build();
	}
	
	@Operation(summary = "리뷰 검색", description = "리뷰 검색하는 메서드")
	@GetMapping("/search/{keyword}")
	public ResponseEntity<?> searchReviewByKeyword(
			@PathVariable("keyword") String keyword,
			@RequestParam(value = "page", defaultValue = "1") int page,
			@RequestParam(value = "size", defaultValue = "10") int size
			){
		
		PageInfo<?> response = service.searchReviewsByKeyword(keyword, page, size);
		return ResponseEntity.ok(response);
		
	}
	
	@Operation(summary = "좋아요 조회", description = "좋아요 수, 좋아요 표시한 유저의 목록을 가져오는 메서드")
	@GetMapping("/hits/{review-id}")
	public ResponseEntity<Map<String,Object>> hits(@PathVariable("review-id") int reviewId){
		List<Hit> list = service.findAllHits(reviewId);
		
		Map<String, Object> response = new HashMap<>();
		response.put("hits", list);
		
		return ResponseEntity.ok(response);
	}
	
	@Operation(summary = "좋아요 여부", description = "해당 유저가 해당 게시글에 좋아요 클릭 했는지 확인하는 메서드")
	@GetMapping("/check/{review-id}")
	public ResponseEntity<?> check(
			@PathVariable("review-id") int reviewId,
			HttpServletRequest request){
		String userId = (String) request.getAttribute("userId");
		
		Hit hit = service.checkLike(reviewId, userId);
		
		return ResponseEntity.ok(hit);
	}
	
	@Operation(summary = "좋아요 증가", description = "좋아요 수를 증가시키고, 좋아요 테이블에 추가하는 메서드")
	@PostMapping("/hits/{review-id}")
	public ResponseEntity<?> hitUp(
			@PathVariable("review-id") int reviewId,
			HttpServletRequest request
			){
		String userId = (String) request.getAttribute("userId");
		
		Hit hit = new Hit(userId, reviewId);
		int cnt = service.addHitAndUpdateReviewHit(hit);
		
		return ResponseEntity.status(201).body("좋아요 추가 완료.");
	}
	
	@Operation(summary = "좋아요 취소", description = "좋아요 수를 감소시키고, 좋아요 테이블에서 삭제하는 메서드")
	@DeleteMapping("/hits/{review-id}")
	public ResponseEntity<?> hitDown(
			@PathVariable("review-id") int reviewId,
			HttpServletRequest request
			){
		String userId = (String) request.getAttribute("userId");
		
		Hit hit = new Hit(userId, reviewId);
		
		int cnt = service.deleteHitAndUpdateReivewHit(hit);
		
		return ResponseEntity.noContent().build();
	}
	
//	특정 글의 댓글 조회하기
	@Operation(summary = "특정 글의 댓글 조회", description = "특정 글의 모든 댓글 조회")
	@GetMapping("/comment/{review-id}")
	public ResponseEntity<?> selectComments(@PathVariable("review-id") int reviewId) {
		List<?> response = service.selectComments(reviewId);
		return ResponseEntity.ok(response);
	}
	
//	특정 글에 댓글 작성하기
	@Operation(summary = "특정 글에 댓글 작성", description = "특정 글에 댓글을 작성")
	@PostMapping("/comment")
	public ResponseEntity<?> addComments(@RequestBody ReviewComments reviewCommentsRequest, HttpServletRequest request) {
		String userId = (String) request.getAttribute("userId");	
		reviewCommentsRequest.setUserId(userId);
		int cnt = service.addComments(reviewCommentsRequest);
		return ResponseEntity.status(201).build();
	}
	
//	특정 글에 댓글 수정하기
	@Operation(summary = "특정 댓글 수정하기", description = "특정 댓글을 수정")
	@PutMapping("/comment")
	public ResponseEntity<?> updateComments(@RequestBody ReviewComments reviewCommentsRequest, HttpServletRequest request) {
		String userId = (String) request.getAttribute("userId");	
		reviewCommentsRequest.setUserId(userId);
		int cnt = service.updateComments(reviewCommentsRequest);
		return ResponseEntity.noContent().build();
	}
	
//	특정 댓글 삭제하기
	@Operation(summary = "특정 댓글 삭제하기", description = "특정 댓글 삭제하기")
	@DeleteMapping("/comment/{comment-id}")
	public ResponseEntity<?> updateComments(@PathVariable("comment-id") int commentId) {
		int cnt = service.deleteComments(commentId);
		return ResponseEntity.noContent().build();
	}
	
}
