package com.ssafy.ai.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.ai.model.service.AiService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/ai")
@RequiredArgsConstructor
public class AiController {
	private final AiService aiService;
	
	@PostMapping("/ask")
	public ResponseEntity<?> getAIresponse(@RequestBody Map<String, Object> req) {
		String santance = aiService.getAIRequest((String)req.get("content"));
		
		Map<String, Object> response = new HashMap<>();
		response.put("response", santance);
		
		return ResponseEntity.ok(response);
	}
}
