package com.ssafy.attraction.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DetailAttractionResponse {
	private int no;
	private int contentId;
	private String title;
	private int contentTypeId;
	private String contentTypeName;
	private int areaCode;
	private int siGunGuCode;
	private String firstImage1;
	private String firstImage2;
	private double latitude;
	private double longitude;
	private String tel;
	private String addr1;
	private String addr2;
}
