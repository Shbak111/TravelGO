package com.ssafy.planboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlanComments {
	private int commentId;
	private int planId;
	private String userId;
	private String userName;
	private String content;
	private String createdAt;
}
