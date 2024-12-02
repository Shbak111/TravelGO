package com.ssafy.planboard.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.planboard.dto.AddPlanBoard;
import com.ssafy.planboard.dto.DetailPlanBoardResponse;
import com.ssafy.planboard.dto.PlanComments;

@Mapper
public interface PlanBoardMapper {

//	plan_boards 게시판 모든 글 조회
	List<?> getPlanBoard(String keyword);

//	특정 게시판 글 상세 조회
	DetailPlanBoardResponse getPlanBoardDetail(int planId);

//	특정 게시판 글 관광지 조회
	List<?> getAttractions(int planId);

//	게시판 글 쓰기
	int addPlanBoard(AddPlanBoard request);

//	게시판 글 수정
	int updatePlanBoard(AddPlanBoard request);

//	게시판 글 삭제
	int deletePlanBoard(int planId);

//	특정 글 좋아요 여부
	int getHit(String userId, int planId);

//	특정 글 좋아요 등록
	int addHit(String userId, int planId);

//	특정 글 hit 컬럼 갱신
	void updateHit(int planId, int value);

//	특정 글 좋아요 취소
	int deleteHit(String userId, int planId);

//	특정 글의 모든 댓글 조회
	List<?> selectComments(int planId);

//	특정 글에 댓글 작성
	int addComments(PlanComments planCommentsRequest);

//	특정 댓글 수정
	int updateComments(PlanComments planCommentsRequest);

//	특정 댓글 삭제
	int deleteComments(int commentId);

}
