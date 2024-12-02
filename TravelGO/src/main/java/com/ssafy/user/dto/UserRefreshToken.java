package com.ssafy.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRefreshToken {
	private String userId;
	private String refreshToken = null;
}
