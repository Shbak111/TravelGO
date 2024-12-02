package com.ssafy.planboard.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetailPlanBoardResponse {
	private int planId;
	private int myplanId;
	private String userId;
	private String userName;
	private String planTitle;
	private String planDetail;
	private String createdAt;
	private double distance;
	private int hit;
	private List<?> attractions;
}
