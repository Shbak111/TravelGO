package com.ssafy.review.model.service;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.ssafy.review.dto.Hit;
import com.ssafy.review.dto.Review;
import com.ssafy.review.dto.ReviewComments;
import com.ssafy.review.model.mapper.ReviewMapper;
import com.ssafy.util.FileStorageUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

	private final ReviewMapper mapper;
	private final FileStorageUtil fileStorageUtil;
	
	@Override
	public PageInfo<?> selectAllReviews(int page, int size) {
		PageHelper.startPage(page,size);
		List<?> list = mapper.selectAllReviews();
		
		if(list.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.NO_CONTENT, "No Content");
		}
		
		return new PageInfo<>(list);
	}

	@Override
	public PageInfo<?> selectMyReviews(String userId, int page, int size) {
		PageHelper.startPage(page, size);
		List<?> list = mapper.selectMyReviews(userId);
		
		if(list.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.NO_CONTENT, "No Content");
		}
		
		return new PageInfo<>(list);
	}
	
	@Override
	public Review detail(int reviewId) {
		Review review = mapper.detail(reviewId);
		
		if(review == null) {
			throw new ResponseStatusException(HttpStatus.NO_CONTENT, "No Content");
		}
		
		return review;
	}
	@Override
	@Transactional
	public int add(Review review) {
		int cnt = mapper.add(review);
		
		if(cnt == 0) {
			throw new ResponseStatusException(HttpStatus.NO_CONTENT, "No Content");
		}
		
		return cnt;
	}

	@Override
	@Transactional
	public int delete(int reviewId) {
		
//		이미지 삭제
		String imagePath = mapper.detail(reviewId).getImagePath();
        fileStorageUtil.deleteFile(imagePath);
        
		int cnt = mapper.delete(reviewId);
		
		if(cnt == 0) {
			throw new ResponseStatusException(HttpStatus.NO_CONTENT, "No Content");
		}
		
		return cnt;
	}

	@Override
	@Transactional
	public int update(Review review, boolean isImageDeleted, MultipartFile newImage) {
		
		// 이미지 처리
	    if (isImageDeleted) {
	        String oldImagePath = mapper.detail(review.getReviewId()).getImagePath();
	        fileStorageUtil.deleteFile(oldImagePath);
	        review.setImagePath(null);
	    }
	    if (newImage != null && !newImage.isEmpty()) {
	        String newImagePath;
			try {
				newImagePath = fileStorageUtil.saveFile(newImage);
				review.setImagePath(newImagePath);
			} catch (IOException e) {
				e.printStackTrace();
			}
	    }
		
		int cnt = mapper.update(review);
		
		if(cnt == 0) {
			throw new ResponseStatusException(HttpStatus.NO_CONTENT, "No Content");
		}
		
		return cnt;
	}

	// 키워드로 리뷰 검색
	@Override
	public PageInfo<?> searchReviewsByKeyword(String keyword, int page, int size) {
		PageHelper.startPage(page,size);
		List<Review> list = mapper.searchReviewsByKeyword(keyword);
		
		if(list.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.NO_CONTENT, "No Content");
		}
		
		return new PageInfo<>(list);
	}

	
	@Override
	public List<Hit> findAllHits(int reviewId) {
		return mapper.findAllHits(reviewId);
	}

	@Override
	public Hit checkLike(int reviewId, String userId) {
		// TODO Auto-generated method stub
		Hit valid = new Hit(userId, reviewId);
		
		Hit hit = mapper.checkLike(valid);
		
		if(hit == null) {
			throw new ResponseStatusException(HttpStatus.NO_CONTENT);
		}
		
		return hit;	
	}
	
	@Override
	@Transactional
	public int addHitAndUpdateReviewHit(Hit hit) {
		mapper.addHit(hit);
		mapper.increaseReviewHit(hit);
		
		return 0;
	}
	
	@Override
	@Transactional
	public int deleteHitAndUpdateReivewHit(Hit hit) {
		mapper.deleteHit(hit);
		mapper.decreaseReviewHit(hit);
		
		return 0;
	}

//	특정 글의 모든 댓글 조회
	@Override
	public List<?> selectComments(int reviewId) {
		List<?> list = mapper.selectComments(reviewId);
		return list;
	}

//	특정 글에 댓글 작성
	@Transactional
	@Override
	public int addComments(ReviewComments reviewCommentsRequest) {
		int cnt = mapper.addComments(reviewCommentsRequest);
//		등록한 댓글이 없다면
		if(cnt == 0) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request");
		}
		return cnt;
	}

//	특정 댓글 수정
	@Transactional
	@Override
	public int updateComments(ReviewComments reviewCommentsRequest) {
		int cnt = mapper.updateComments(reviewCommentsRequest);
//		수정한 댓글이 없다면
		if(cnt == 0) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request");
		}
		return cnt;
	}

//	특정 댓글 삭제
	@Transactional
	@Override
	public int deleteComments(int commentId) {
		int cnt = mapper.deleteComments(commentId);
//		삭제한 댓글이 없다면
		if(cnt == 0) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request");
		}
		return cnt;
	}

}
