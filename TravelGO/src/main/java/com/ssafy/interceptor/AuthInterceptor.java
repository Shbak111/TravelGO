package com.ssafy.interceptor;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.ssafy.user.dto.User;
import com.ssafy.user.model.mapper.UserMapper;
import com.ssafy.util.JWTUtil;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class AuthInterceptor implements HandlerInterceptor{
	private final JWTUtil jwtUtil;
	private final UserMapper userMapper;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		//preflight 요청인 경우, true 로 넘김
		String method = request.getMethod();
		log.debug("AuthInterceptor()의 preHandle실행 method:{}", method);
		if(method.equals("OPTIONS")) return true;
		// GET 요청인 경우
		if("GET".equals(method)) {
			// 플랜 게시판 목록보기 허용
			String requestURI = request.getRequestURI();
			if (requestURI.startsWith("/plan-boards")
					&& !requestURI.contains("detail")
					&& !requestURI.contains("hit")) {
				return true; 
			}
			
			// 전체 뱃지 정보 불러오기 허용
			if (requestURI.equals("/badges/list")) {
				return true; 
			}
			
			// 전체 리뷰 목록보기 허용
			if (requestURI.equals("/reviews/list")) {
				return true; 
			}
			// 리뷰 상세보기 허용
			if (requestURI.startsWith("/reviews/detail")) {
				return true; 
			}
			// 리뷰 검색하기 허용
			if (requestURI.startsWith("/reviews/search")) {
				return true; 
			}
			
			// 전체 아이템 불러오기 허용
			if (requestURI.equals("/items/list")) {
				return true; 
			}
			
			// 통계 불러오기
			if (requestURI.equals("/stats/planboard")) {
				return true; 
			}
			
			// 통계 불러오기
			if (requestURI.equals("/stats/users")) {
				return true; 
			}
			
			// 통계 불러오기
			if (requestURI.equals("/stats/attractions")) {
				return true; 
			}
		}
	    
        // Access Token 추출
        String accessToken = request.getHeader("Authorization");
        if (accessToken != null && accessToken.startsWith("Bearer ")) {
            String token = accessToken.substring(7);
            System.out.println("access 토큰 처리");
            // Access Token 유효성 검사
            if (jwtUtil.isValidAccessToken(token)) {
                String userId = jwtUtil.getIdFromAccessToken(token);
                request.setAttribute("userId", userId);
                return true; // Access Token이 유효하면 요청 통과
            }
        }
        
     // Access Token이 없거나 만료된 경우 Refresh Token 검증
        String refreshToken = extractRefreshTokenFromCookies(request.getCookies());
        int cnt = userMapper.findByToken(refreshToken);
        
        if (refreshToken == null) {
            response.setStatus(401);
            response.getWriter().write("Unauthorized");
        	return false;
        }
        
        if(!jwtUtil.isValidRefreshToken(refreshToken) || cnt == 0) {
            response.setStatus(401);
            response.getWriter().write("Invalid refreshToken");
        	return false;
        }
        
        // Refresh Token이 유효하면 새로운 Access Token 발급
        String userId = jwtUtil.getIdFromRefreshToken(refreshToken);
        String userName = jwtUtil.getNameFromRefreshToken(refreshToken);
        System.out.println("refresh 토큰 처리");
        
        User user = userMapper.selectUser(userId);
        user.setUserId(userId);
        String newAccessToken = jwtUtil.accessToken(user);

        // 응답 헤더에 새로운 Access Token 추가
        response.setHeader("Authorization", "Bearer " + newAccessToken);
        response.setHeader("UserId", userId);
        response.setHeader("UserName", userName);

        // 요청에 userId, userName, refreshToken 추가
        request.setAttribute("userId", userId);
        request.setAttribute("refreshToken", refreshToken);

        return true; // Refresh Token으로 재발급 후 요청 통과
	}
	
//	쿠키의 refresh_token 가져오기
	private String extractRefreshTokenFromCookies(Cookie[] cookies) {
        if (cookies == null) return null;
        for (Cookie cookie : cookies) {
            if ("refresh_token".equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }
}
