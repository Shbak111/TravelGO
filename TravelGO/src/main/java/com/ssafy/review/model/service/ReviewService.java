package com.ssafy.review.model.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.github.pagehelper.PageInfo;
import com.ssafy.review.dto.Hit;
import com.ssafy.review.dto.Review;
import com.ssafy.review.dto.ReviewComments;

public interface ReviewService {
	public PageInfo<?> selectAllReviews(int size, int page);
	public PageInfo<?> selectMyReviews(String userId, int page, int size);
	public Review detail(int reviewId);
	public int add(Review review);
	public int delete(int reviewId);
	public int update(Review review, boolean isImageDeleted, MultipartFile newImage);
	public PageInfo<?> searchReviewsByKeyword(String keyword, int page, int size);
	
	// 리뷰 좋아요
	public List<Hit> findAllHits(int reviewId);
	public Hit checkLike(int reviewId, String userId);
	public int addHitAndUpdateReviewHit(Hit hit);
	public int deleteHitAndUpdateReivewHit(Hit hit);
	
//	리뷰 댓글
	public List<?> selectComments(int reviewId);
	public int addComments(ReviewComments reviewCommentsRequest);
	public int updateComments(ReviewComments reviewCommentsRequest);
	public int deleteComments(int commentId);
}
