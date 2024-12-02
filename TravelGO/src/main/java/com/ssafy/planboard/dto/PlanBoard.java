package com.ssafy.planboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlanBoard {
	private int planId;
	private String userName;
	private String planTitle;
	private String createdAt;
	private int hit;
}
