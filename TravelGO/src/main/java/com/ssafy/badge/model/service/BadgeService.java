package com.ssafy.badge.model.service;

import com.github.pagehelper.PageInfo;
import com.ssafy.badge.dto.UserAndBadgeName;

public interface BadgeService {
	public PageInfo<?> selectAllBadges(int page, int size);
	public int addBadgeForUser(UserAndBadgeName ids);
	public PageInfo<?> selectAllMyBadges(String userId,int page, int size);
	public int checkNewBadges(String userId);
}
