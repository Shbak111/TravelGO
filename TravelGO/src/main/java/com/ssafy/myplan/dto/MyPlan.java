package com.ssafy.myplan.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MyPlan {
	private int myplanId;
	private String userId;
	private String myplanTitle;
	private String myplanDetail;
	private String createdAt;
}
