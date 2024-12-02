package com.ssafy.planboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddPlanBoard {
	private int planId;
	private String userId;
	private String planTitle;
	private String planDetail;
	private int myplanId;
}
