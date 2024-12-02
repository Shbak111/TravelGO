package com.ssafy.review.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewComments {
	private int commentId;
	private int reviewId;
	private String userId;
	private String userName;
	private String content;
	private String createdAt;
}
