package com.ssafy.badge.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.ssafy.badge.dto.Badge;
import com.ssafy.badge.dto.UserAndBadgeName;

@Mapper
public interface BadgeMapper {
	public List<Badge> selectAllBadges();
	public int addBadgeForUser(UserAndBadgeName ids);
	public List<Badge> selectAllMyBadges(String userId);
	public int checkNewBadges(String userId);
	public int checkFirstLike(String userId);
	public int checkFirstPost(String userId);
	public int isMyBadge(@Param("userId") String userId, @Param("badgeName") String badgeName);
}
