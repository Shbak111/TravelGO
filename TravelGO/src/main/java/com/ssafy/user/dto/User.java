package com.ssafy.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
	private String userId;
	private String userName;
	private String password;
	private String profileImg;
	private String backgroundImg;
	private String createdAt;
	private int mileage;	
	private String refreshToken;
	private int rankPoint;
}
