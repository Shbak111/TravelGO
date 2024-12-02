package com.ssafy.util;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.ssafy.user.dto.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JWTUtil {
	@Value("${jwt.access-token.secret-key}")
	private String accessSecretKeyPlain;
	
	@Value("${jwt.refresh-token.secret-key}")
	private String refreshSecretKeyPlain;
	
	@Value("${jwt.access-token.expiration-seconds}")
	private long ACCESS_EXPIRATION_SECONDS;
    
    @Value("${jwt.refresh-token.expiration-seconds}")
    private long REFRESH_EXPIRATION_SECONDS;
	
    // Access Token용 키
    private SecretKey getAccessSecretKey() {
        return Keys.hmacShaKeyFor(accessSecretKeyPlain.getBytes());
    }

    // Refresh Token용 키
    private SecretKey getRefreshSecretKey() {
        return Keys.hmacShaKeyFor(refreshSecretKeyPlain.getBytes());
    }
    
    // access 토큰 생성
    public String accessToken(User user) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + ACCESS_EXPIRATION_SECONDS * 1000);

        return Jwts.builder()
        	    .claim("id", user.getUserId())
        	    .issuedAt(now)
                .expiration(expiration)				//만료 시간
                .signWith(getAccessSecretKey())
                .compact();
    }
    
    // refresh 토큰 생성
    public String refreshToken(User user) {
    	Date now = new Date();
    	Date expiration = new Date(now.getTime() + REFRESH_EXPIRATION_SECONDS * 1000);
    	
    	return Jwts.builder()
    			.claim("id", user.getUserId())
    			.claim("tokenType", "refresh")        // 토큰 타입 구분
    			.claim("name", user.getUserName())
    	        .issuedAt(now)
    			.expiration(expiration)				//만료 시간
    			.signWith(getRefreshSecretKey())
    			.compact();
    }

    // Access 토큰 유효성 검사
    public boolean isValidAccessToken(String token) {
        try {
            Jwts.parser().verifyWith(getAccessSecretKey()).build().parseSignedClaims(token);
            return true;
        } catch (Exception e) {
        	log.debug("Access 토큰 유효성 검증 오류 : {}", e.getMessage());
            return false;
        }
    }
    
    // Refresh 토큰 유효성 검사
    public boolean isValidRefreshToken(String token) {
    	try {
    		Jwts.parser().verifyWith(getRefreshSecretKey()).build().parseSignedClaims(token);
    		return true;
    	} catch (Exception e) {
    		log.debug("Refresh 토큰 유효성 검증 오류 : {}", e.getMessage());
    		return false;
    	}
    }
    
    //access token으로 부터 ID 조회
    public String getIdFromAccessToken(String token) {
    	Claims claims = Jwts.parser()
    			.verifyWith(getAccessSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    	
    	String id = (String) claims.get("id");
    	log.debug("claim id:{}",id);
    	return id;
    }
    
    //refresh token으로 부터 ID 조회
    public String getIdFromRefreshToken(String token) {
    	Claims claims = Jwts.parser()
    			.verifyWith(getRefreshSecretKey())
    			.build()
    			.parseSignedClaims(token)
    			.getPayload();
    	
    	String id = (String) claims.get("id");
    	log.debug("claim id:{}",id);
    	return id;
    }

//  refresh token으로 부터 Name 조회
	public String getNameFromRefreshToken(String token) {
		Claims claims = Jwts.parser()
    			.verifyWith(getRefreshSecretKey())
    			.build()
    			.parseSignedClaims(token)
    			.getPayload();
    	
    	String name = (String) claims.get("name");
    	log.debug("claim name:{}", name);
    	return name;
	}
}
