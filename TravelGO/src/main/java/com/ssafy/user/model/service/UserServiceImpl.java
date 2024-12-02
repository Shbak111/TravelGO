package com.ssafy.user.model.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ssafy.user.dto.LoginRequest;
import com.ssafy.user.dto.LoginResponse;
import com.ssafy.user.dto.SignUpResponse;
import com.ssafy.user.dto.User;
import com.ssafy.user.dto.UserRefreshToken;
import com.ssafy.user.model.mapper.UserMapper;
import com.ssafy.util.JWTUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserMapper userMapper;
	private final JWTUtil jwtUtil;
	private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

//	회원 가입
	@Transactional
	@Override
	public Map<String, Object> signup(User user) {
//		비밀번호 암호화
		String password = passwordEncoder.encode(user.getPassword());
		user.setPassword(password);

//		access 토큰과 refresh 토큰 발급
		String accessToken = jwtUtil.accessToken(user);
		String refreshToken = jwtUtil.refreshToken(user);
		user.setRefreshToken(refreshToken);

//		회원 등록
		int cnt = userMapper.signup(user);
		if (cnt == 0) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request");
		}

		SignUpResponse signUpResponse = new SignUpResponse(user.getUserId(), user.getUserName(), user.getProfileImg(), user.getMileage());

		Map<String, Object> response = new HashMap<>();
		response.put("response", signUpResponse);
		response.put("accessToken", accessToken);
		response.put("refreshToken", refreshToken);

		return response;
	}

	@Override
	public User selectUser(String userId) {
		System.out.println("유저 검증: " + userId);
		User user = userMapper.selectUser(userId);

		if (user == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "not valid user");
		}

		return user;
	}

	@Override
	public int updateUserMileAge(User user) {
		int cnt = userMapper.updateUserMileAge(user);

		if (cnt == 0) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "update failed");
		}

		return cnt;
	}

	// 유저 로그인 서비스
	@Override
	public Map<String, Object> loginUser(LoginRequest request) {
		// 일단 그럼 user_id로 비밀번호 가져와야함.
		Map<String, Object> response = new HashMap<>();
		User userdata = userMapper.selectUser(request.getUserId());
		
		// 유저가 존재하는 경우에
		if (userdata != null) {
			// 만약에, 암호화 된 비밀번호가 같지 않다면 그냥 넘김
			if (!passwordEncoder.matches(request.getPassword(), userdata.getPassword()))
				throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
			// 두 가지 토큰 발급
			String accessToken = jwtUtil.accessToken(userdata);
			String refreshToken = jwtUtil.refreshToken(userdata);

			// 받아온 리프레쉬 토큰을 db에 저장하기
			UserRefreshToken update = new UserRefreshToken(userdata.getUserId(), refreshToken);
			userMapper.setRefreshToken(update);

			// 로그인 응답으로 줄 데이터 생성
			LoginResponse loginResponse = new LoginResponse(userdata.getUserId() , userdata.getUserName(), userdata.getProfileImg(),
					userdata.getBackgroundImg(), userdata.getMileage());

			// 응답에 담아줌
			response.put("accessToken", accessToken);
			response.put("refreshToken", refreshToken);
			response.put("response", loginResponse);

		} else {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
		}

		return response;
	}

	// 유저 로그아웃 서비스
	@Override
	public int userLogout(String userId) {
		int cnt = userMapper.deleteRefreshToken(userId);

		if (cnt == 0) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "update failed");
		}

		return cnt;
	}
	
	@Override
	public int addWriteMileageAndRank(String userId) {
		int cnt = userMapper.addWriteMileageAndRank(userId);

		if (cnt == 0) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "update failed");
		}

		return cnt;
	}
	
	@Override
	public int addLikeMileageAndRank(String userId) {
		int cnt = userMapper.addLikeMileageAndRank(userId);

		if (cnt == 0) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "update failed");
		}

		return cnt;
	}
	
	@Override
	public int subLikeMileageAndRank(String userId) {
		int cnt = userMapper.subLikeMileageAndRank(userId);
		
		if (cnt == 0) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "update failed");
		}

		return cnt;
	}
	

}
