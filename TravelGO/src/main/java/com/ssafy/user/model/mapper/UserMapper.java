package com.ssafy.user.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.user.dto.User;
import com.ssafy.user.dto.UserRefreshToken;

@Mapper
public interface UserMapper {
//	회원가입 처리
	int signup(User user);

	// 아이템 구매 관련 dao
	public User selectUser(String userId);
	public int updateUserMileAge(User user);
	
	// 글 작성 시 유저 마일리지 부여,유저 경험치 부여
	public int addWriteMileageAndRank(String userId);
	// 좋아요 시 유저 마일리지 부여,유저 경험치 부여
	public int addLikeMileageAndRank(String userId);
	public int subLikeMileageAndRank(String userId);
	
	// 유저 refreshtoken 관리
	public int setRefreshToken(UserRefreshToken userRefreshToken);
	public int deleteRefreshToken(String userId);

//	db에 토큰 확인
	int findByToken(String refreshToken);
}
