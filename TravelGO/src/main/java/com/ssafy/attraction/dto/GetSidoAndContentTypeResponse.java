package com.ssafy.attraction.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetSidoAndContentTypeResponse {
	private List<?> sido;
	private List<?> contentType;
}
