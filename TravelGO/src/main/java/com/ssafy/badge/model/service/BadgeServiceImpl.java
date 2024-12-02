package com.ssafy.badge.model.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.ssafy.badge.dto.Badge;
import com.ssafy.badge.dto.UserAndBadgeName;
import com.ssafy.badge.model.mapper.BadgeMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BadgeServiceImpl implements BadgeService {

	private final BadgeMapper mapper;
	
	@Override
	public PageInfo<?> selectAllBadges(int page, int size) {
		// TODO Auto-generated method stub
		PageHelper.startPage(page, size);
		List<Badge> list = mapper.selectAllBadges();
		
		if(list == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "no badges");
		}
		
		return new PageInfo<>(list);
	}

	@Transactional
	@Override
	public int addBadgeForUser(UserAndBadgeName ids) {
		// TODO Auto-generated method stub
		int cnt = mapper.addBadgeForUser(ids);
		
		if(cnt == 0) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "user can't find");
		}
		
		return cnt;
	}

	@Override
	public PageInfo<?> selectAllMyBadges(String userId, int page, int size) {
		// TODO Auto-generated method stub
		PageHelper.startPage(page, size);
		List<Badge> list = mapper.selectAllMyBadges(userId);
		
		if(list == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "you don't have badges");
		}
		
		return new PageInfo<>(list);
	}

	@Transactional
	@Override
	public int checkNewBadges(String userId) {
//		첫 좋아요를 1개이상 받은 플랜 게시판 글이 있고 내 뱃지에 첫 좋아요 배지가 없을 때 
		if(mapper.checkFirstLike(userId) > 0 && mapper.isMyBadge(userId, "like!") == 0) {
			mapper.addBadgeForUser(new UserAndBadgeName(userId, "like!"));
		}
		
//		작성한 글이 1개 이상 있고 내 뱃지에 첫 글 작성 배지가 없을 때
		if(mapper.checkFirstPost(userId) > 0 && mapper.isMyBadge(userId, "post!") == 0) {
			mapper.addBadgeForUser(new UserAndBadgeName(userId, "post!"));
		}
		
//		새로 얻은 배지리스트 획득 처리하기.
		int cnt = mapper.checkNewBadges(userId);
		return cnt;
	}

}
