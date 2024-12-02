package com.ssafy.item.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.pagehelper.PageInfo;
import com.ssafy.item.dto.PurchaseItem;
import com.ssafy.item.dto.UsingBackgroundItem;
import com.ssafy.item.dto.UsingProfileItem;
import com.ssafy.item.model.service.ItemService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/items")
@Tag(name = "ItemController", description = "상점의 아이템을 컨트롤하는 커트롤러 입니다.")
public class ItemController {
	private final ItemService service;
	
	@GetMapping("/list")
	@Operation(summary = "전체조회", description = "전체 아이템을 조회하는 메서드")
	public ResponseEntity<?> selectAll(
			@RequestParam(value = "page", required = false, defaultValue = "1") int page,
	        @RequestParam(value = "size", required = false, defaultValue = "20") int size
			) {
		PageInfo<?> response = service.selectAllItems(page, size);
		
		return ResponseEntity.ok(response);	
	}
	
	@PostMapping("/purchase/{item-id}")
	@Operation(summary = "아이템 구매", description = "아이템을 구매하는 메서드 입니다.")
	public ResponseEntity<?> purchaseItem(
			@PathVariable("item-id") int itemId,
			HttpServletRequest request
			){
		String userId = (String) request.getAttribute("userId");
		PurchaseItem purchase = new PurchaseItem(userId, itemId);
		
		int cnt = service.purchaseItems(purchase);
		
		System.out.println("구매로 변경된 row: " + cnt);
		
		return ResponseEntity.status(201).body("아이템 구매 성공!");
	}
	
	@GetMapping("/list/user")
	@Operation(summary = "내 아이템 조회", description = "내가 보유한 아이템을 조회하는 컨트롤러 입니다")
	public ResponseEntity<?> selectMyItems(
			HttpServletRequest request,
			@RequestParam(value = "page", required = false, defaultValue = "1") int page,
	        @RequestParam(value = "size", required = false, defaultValue = "20") int size
			){
		String userId = (String) request.getAttribute("userId");
		
		PageInfo<?> response = service.selectMyItems(userId,page,size);
		
		return ResponseEntity.ok(response);
	}
	
	@PatchMapping("/patch/profile")
	@Operation(summary = "아이템 사용", description = "프로필 아이템을 유저에게 적용시키는 컨트롤러")
	public ResponseEntity<?> updateProfile(
			HttpServletRequest request, 
			@RequestBody Map<String, Object> body) {
		String userId = (String) request.getAttribute("userId");
		String profileImg = (String) body.get("profile_img");
		
		UsingProfileItem profile = new UsingProfileItem(userId, profileImg);
		
		int cnt = service.useProfileItem(profile);
		
		return ResponseEntity.ok(cnt);
	}
	
	@PatchMapping("/patch/background")
	@Operation(summary = "아이템 사용", description = "배경 아이템을 유저에게 적용시키는 컨트롤러")
	public ResponseEntity<?> updateBackground(
			HttpServletRequest request, 
			@RequestBody Map<String, Object> body) {
		String userId = (String) request.getAttribute("userId");
		String backgroundImg = (String) body.get("background_img");
		UsingBackgroundItem background = new UsingBackgroundItem(userId, backgroundImg);
		
		int cnt = service.useBackgroundItem(background);
		
		return ResponseEntity.ok(cnt);
	}
	
}
