package com.ssafy.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignUpResponse {
	private String userId;
	private String userName;
	private String profileImg;
	private int mileage;	
}

