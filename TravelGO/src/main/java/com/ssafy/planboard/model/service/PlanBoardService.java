package com.ssafy.planboard.model.service;

import java.util.List;

import com.github.pagehelper.PageInfo;
import com.ssafy.planboard.dto.AddPlanBoard;
import com.ssafy.planboard.dto.DetailPlanBoardResponse;
import com.ssafy.planboard.dto.PlanComments;

public interface PlanBoardService {

	/**
	 * 모든 플랜 게시판 글 조회
	 * @param size 
	 * @param page 
	 * @param keyword 
	 * @return PageInfo
	 */
	PageInfo<?> getPlanBoard(String keyword, int page, int size);

	/**
	 * 플랜 게시판 특정 글 상세 조회
	 * @param planId
	 * @return DetailPlanBoardResponse
	 */
	DetailPlanBoardResponse getPlanBoardDetail(int planId);

	/**
	 * 플랜 게시판 글 작성
	 * @param request
	 * @return int
	 */
	int addPlanBoard(AddPlanBoard request);

	/**
	 * 플랜 게시판 글 수정
	 * @param request
	 * @return int
	 */
	int updatePlanBoard(AddPlanBoard request);

	/**
	 * 플랜 게시판 글 삭제
	 * @param planId
	 * @return int
	 */
	int deletePlanBoard(int planId);

	/**
	 * 특정 글에 좋아요 여부
	 * @param userId
	 * @param planId
	 */
	void getHit(String userId, int planId);

	/**
	 * 특정 글에 좋아요 등록
	 * @param userId
	 * @param planId
	 */
	void addHit(String userId, int planId);

	/**
	 * 특정 글에 좋아요 취소
	 * @param userId
	 * @param planId
	 */
	void deleteHit(String userId, int planId);

	/**
	 * 특정 글의 모든 댓글 조회
	 * @param planId
	 * @return response List
	 */
	List<?> selectComments(int planId);

	/**
	 * 특정 글에 댓글 작성
	 * @param planCommentsRequest
	 * @return int
	 */
	int addComments(PlanComments planCommentsRequest);

	/**
	 * 특정 댓글 수정
	 * @param planCommentsRequest
	 * @return int
	 */
	int updateComments(PlanComments planCommentsRequest);

	/**
	 * 특정 댓글 삭제
	 * @param commentId
	 * @return int
	 */
	int deleteComments(int commentId);

}
