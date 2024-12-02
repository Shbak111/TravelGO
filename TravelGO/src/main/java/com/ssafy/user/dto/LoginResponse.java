package com.ssafy.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
	private String userId;
	private String userName;
	private String profileImg;
	private String backgroundImg;
	private int mileage;
}
