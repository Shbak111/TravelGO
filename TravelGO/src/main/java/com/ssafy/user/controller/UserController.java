package com.ssafy.user.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.user.dto.LoginRequest;
import com.ssafy.user.dto.LoginResponse;
import com.ssafy.user.dto.SignUpResponse;
import com.ssafy.user.dto.User;
import com.ssafy.user.model.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
@Tag(name = "User Controller", description = "회원 관련 요청을 처리하는 클래스")
public class UserController {
	private final UserService userService;
	private final int COOKIE_EXPIRATION_SECONDS = 200 * 60;	//쿠키 유효기간 200분
	
	@PostMapping("/login")
	@Operation(summary = "로그인", description = "로그인을 하기위한 api 입니다.")
	public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
		// 유저 서비스에서 토큰 정보 및 유저 로그인 정보를 가져옴
		Map<String, Object> loginData = userService.loginUser(loginRequest);
		String refreshToken = (String) loginData.get("refreshToken");
		String accessToken = (String) loginData.get("accessToken");
		
		LoginResponse loginResponse = (LoginResponse)loginData.get("response");
		
		// 헤더에 액세스 토큰 추가
		response.setHeader("Authorization","Bearer " + accessToken);
		response.setHeader("UserId", loginResponse.getUserId());
		response.setHeader("UserName", loginResponse.getUserName());
	
		// 쿠키에 리프레시 토큰 추가
		Cookie cookie = new Cookie("refresh_token", refreshToken);
		cookie.setHttpOnly(true);
		cookie.setMaxAge(COOKIE_EXPIRATION_SECONDS);
		cookie.setPath("/");
		response.addCookie(cookie);
		
		return ResponseEntity.ok(loginData.get("response"));
	}
	
	@PostMapping("/logout")
	@Operation(summary = "로그아웃", description = "로그아웃 하기 위한 api 입니다.")
	public ResponseEntity<?> logout(HttpServletRequest request){
		String userId = (String) request.getAttribute("userId");
		int cnt = userService.userLogout(userId);
		
		return ResponseEntity.ok("로그아웃 성공!");
	}
	
	@Operation(summary = "회원 가입", description = "user 정보로 회원 가입하기")
	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody User user, HttpServletResponse response){
		Map<String, Object> signUpData = userService.signup(user);

		SignUpResponse signUpResponse =  (SignUpResponse) signUpData.get("response");
		
//		access token을 Authorization에 저장
		String accessToken = (String)signUpData.get("accessToken");
		response.setHeader("Authorization", "Bearer " + accessToken);
		response.setHeader("UserId", signUpResponse.getUserId());
		response.setHeader("UserName", signUpResponse.getUserName());
		
//		refresh token을 쿠키에 저장
		String refreshToken = (String) signUpData.get("refreshToken");
		Cookie cookie = new Cookie("refresh_token", refreshToken);
		cookie.setHttpOnly(true); // JavaScript 접근 방지
        cookie.setPath("/"); // 전체 경로에서 사용 가능
        cookie.setMaxAge(COOKIE_EXPIRATION_SECONDS); // 쿠키 만료 기간
        response.addCookie(cookie);
		
		return ResponseEntity.status(201).body(signUpData.get("response"));
	}
	
//	단순 로그인 체크용 (인터셉터에서 알아서 처리)
	@GetMapping("/check")
    public ResponseEntity<?> checkAuth() {
        return ResponseEntity.noContent().build();
    }
	// 마이페이지용 유저 1명 조회
	@GetMapping("/mypage")
	public ResponseEntity<?> selectUser(HttpServletRequest request) {
		String userId = (String) request.getAttribute("userId");
		System.out.println("controller userid: " + userId);
		
		User user = userService.selectUser(userId);
		
		return ResponseEntity.ok(user);
	}
	// 글을 작성한 경우 유저에게 마일리지 및 경험치 부여 
	@PatchMapping("/write")
	public ResponseEntity<?> addWriteMileageAndRank(HttpServletRequest request) {
		String userId = (String) request.getAttribute("userId");
		int cnt = userService.addWriteMileageAndRank(userId);
		
		return ResponseEntity.ok(cnt);
	}
	// 유저에게 마일리지 및 경험치 부여 
	@PatchMapping("/add/like/{user-id}")
	public ResponseEntity<?> addLikeMileageAndRank(@PathVariable("user-id") String userId) {
		int cnt = userService.addLikeMileageAndRank(userId);
		
		return ResponseEntity.ok(cnt);
	}
	// 유저에게 마일리지 및 경험치 부여 
	@PatchMapping("/sub/like/{user-id}")
	public ResponseEntity<?> subLikeMileageAndRank(@PathVariable("user-id") String userId) {
		int cnt = userService.subLikeMileageAndRank(userId);
		
		return ResponseEntity.ok(cnt);
	}
}
