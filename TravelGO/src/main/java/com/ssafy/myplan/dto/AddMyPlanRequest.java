package com.ssafy.myplan.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddMyPlanRequest {
	private String userId;
	private int myplanId;
	private String myplanTitle;
	private String myplanDetail;
	private double distance;
	private List<Integer> attractions;
}
