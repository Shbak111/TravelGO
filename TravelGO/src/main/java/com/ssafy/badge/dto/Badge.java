package com.ssafy.badge.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Badge {
	private int badgeId;
	private String badgeName;
	private String badgeImg;
	private String badgeDetail;
}
