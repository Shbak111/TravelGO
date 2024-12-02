package com.ssafy.user.model.service;

import java.util.Map;

import com.ssafy.user.dto.LoginRequest;
import com.ssafy.user.dto.User;

public interface UserService {
	public User selectUser(String userId);
	public int updateUserMileAge(User user);
	
	// 글 작성 시 유저 마일리지 부여,유저 경험치 부여
	public int addWriteMileageAndRank(String userId);
	// 좋아요 시 유저 마일리지 부여,유저 경험치 부여
	public int addLikeMileageAndRank(String userId);
	public int subLikeMileageAndRank(String userId);
	
	/**
	 * user 정보로 회원가입
	 * @param user
	 * @return Map
	 */
	Map<String, Object> signup(User user);

	// 유저 로그인
	public Map<String, Object> loginUser(LoginRequest request);

	// 유저 로그아웃
	public int userLogout(String userId);
	
}
