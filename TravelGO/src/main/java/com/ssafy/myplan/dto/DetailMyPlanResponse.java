package com.ssafy.myplan.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetailMyPlanResponse {
	private int myplanId;
	private String myplanTitle;
	private String myplanDetail;
	private String createdAt;
	private double distance;
	private List<?> attractions;
	
}
