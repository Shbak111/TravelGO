package com.ssafy.review.model.mapper;

import java.util.*;
import org.apache.ibatis.annotations.Mapper;

import com.ssafy.review.dto.Hit;
import com.ssafy.review.dto.Review;
import com.ssafy.review.dto.ReviewComments;

@Mapper
public interface ReviewMapper {
	public List<Review> selectAllReviews();
	public List<Review> selectMyReviews(String userId);
	public Review detail(int reviewId);
	public int add(Review review);
	public int delete(int reviewId);
	public int update(Review review);
	public List<Review> searchReviewsByKeyword(String keyword);
	
	// 리뷰 좋아요
	public List<Hit> findAllHits(int reviewId);
	public Hit checkLike(Hit hit);
	public int addHit(Hit hit);
	public int increaseReviewHit(Hit hit);
	public int deleteHit(Hit hit);
	public int decreaseReviewHit(Hit hit);
	
//	리뷰 댓글
	public List<?> selectComments(int reviewId);
	public int addComments(ReviewComments reviewCommentsRequest);
	public int updateComments(ReviewComments reviewCommentsRequest);
	public int deleteComments(int commentId);
}
