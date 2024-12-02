package com.ssafy.planboard.model.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.server.ResponseStatusException;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.ssafy.planboard.dto.AddPlanBoard;
import com.ssafy.planboard.dto.DetailPlanBoardResponse;
import com.ssafy.planboard.dto.PlanComments;
import com.ssafy.planboard.model.mapper.PlanBoardMapper;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Validated
public class PlanBoardServiceImpl implements PlanBoardService {
	
	private final PlanBoardMapper planBoardMapper;

//	플랜 게시판 모든 글 조회
	@Override
	public PageInfo<?> getPlanBoard(String keyword, int page, int size) {
		PageHelper.startPage(page, size);  // 페이지 설정
		List<?> list = planBoardMapper.getPlanBoard(keyword);
		
//		게시판 글이 없을 때
		if(list.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.NO_CONTENT, "No Content");
		}
		return new PageInfo<>(list);
	}

//	플랜 게시판 특정 글 상세 조회
	@Override
	public DetailPlanBoardResponse getPlanBoardDetail(int planId) {
		DetailPlanBoardResponse response = planBoardMapper.getPlanBoardDetail(planId);
		
//		해당 글이 없을 때
		if(response==null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Plan_board Not Found");
		}
		
		response.setAttractions(planBoardMapper.getAttractions(planId));
		return response;
	}

//	글 작성
	@Transactional
	@Override
	public int addPlanBoard(@Valid AddPlanBoard request) {
		int cnt = planBoardMapper.addPlanBoard(request);
		return cnt;
	}

//	글 수정
	@Transactional
	@Override
	public int updatePlanBoard(AddPlanBoard request) {
		int cnt = planBoardMapper.updatePlanBoard(request);
//		수정한 글이 없을 때
		if(cnt == 0) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Plan_board Not Found");
		}
		return cnt;
	}

//	글 삭제
	@Transactional
	@Override
	public int deletePlanBoard(int planId) {
		int cnt = planBoardMapper.deletePlanBoard(planId);
//		삭제한 글이 없을 때
		if(cnt == 0) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Plan_board Not Found");
		}
		return cnt;
	}

//	특정 글 좋아요 여부
	@Override
	public void getHit(String userId, int planId) {
		int cnt = planBoardMapper.getHit(userId, planId);
//		좋아요 하지 않았다면 
		if(cnt == 0) {
			throw new ResponseStatusException(HttpStatus.NO_CONTENT, "You don't like");
		}
	}

//	특정 글 좋아요 등록
	@Transactional
	@Override
	public void addHit(String userId, int planId) {
		int cnt = planBoardMapper.addHit(userId, planId);
//		좋아요 실패 시 
		if(cnt == 0) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request");
		}
		planBoardMapper.updateHit(planId, cnt);
	}

//	특정 글 좋아요 취소
	@Transactional
	@Override
	public void deleteHit(String userId, int planId) {
		int cnt = planBoardMapper.deleteHit(userId, planId);
//		좋아요 취소 실패 시 
		if(cnt == 0) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request");
		}
		planBoardMapper.updateHit(planId, -cnt);
	}

//	특정 글의 모든 댓글 조회
	@Override
	public List<?> selectComments(int planId) {
		List<?> list = planBoardMapper.selectComments(planId);
		return list;
	}

//	특정 글에 댓글 작성
	@Transactional
	@Override
	public int addComments(PlanComments planCommentsRequest) {
		int cnt = planBoardMapper.addComments(planCommentsRequest);
//		등록한 댓글이 없다면
		if(cnt == 0) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request");
		}
		return cnt;
	}
	
//	특정 댓글 수정
	@Transactional
	@Override
	public int updateComments(PlanComments planCommentsRequest) {
		int cnt = planBoardMapper.updateComments(planCommentsRequest);
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
		int cnt = planBoardMapper.deleteComments(commentId);
//		삭제한 댓글이 없다면
		if(cnt == 0) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request");
		}
		return cnt;
	}
	
}
