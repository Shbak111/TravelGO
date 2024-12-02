package com.ssafy.review.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Review {
	private int reviewId;
	private String userId;
	private String userName;
	private String reviewTitle;
	private String reviewContent;
	private String createdAt;
	private int hit;
	private String imagePath; // 이미지 경로 필드 추가
}
