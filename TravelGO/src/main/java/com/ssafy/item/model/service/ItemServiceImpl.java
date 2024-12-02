package com.ssafy.item.model.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.ssafy.item.dto.Item;
import com.ssafy.item.dto.PurchaseItem;
import com.ssafy.item.dto.UsingBackgroundItem;
import com.ssafy.item.dto.UsingProfileItem;
import com.ssafy.item.model.mapper.ItemMapper;
import com.ssafy.user.dto.User;
import com.ssafy.user.model.mapper.UserMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

	private final ItemMapper itemMapper;
	private final UserMapper userMapper;
	
	@Override
	public PageInfo<?> selectAllItems(int page, int size) {
		// TODO Auto-generated method stub
		PageHelper.startPage(page, size);
		List<Item> list = itemMapper.selectAllItems();
		
		if(list == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "no items");
		}
		
		return new PageInfo<>(list);
	}

	@Transactional
	@Override
	public int purchaseItems(PurchaseItem purchase) {
		// TODO Auto-generated method stub
		int cnt = 0;
		
		Item item = itemMapper.selectItem(purchase.getItemId());
		User user = userMapper.selectUser(purchase.getUserId());
		
		if(item.getPrice() > user.getMileage()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "you don't have enough mileage");
		}
		else {
			user.setMileage(user.getMileage() - item.getPrice());
			cnt += userMapper.updateUserMileAge(user);
			cnt += itemMapper.addUserItem(purchase);
		}
		
		return cnt;
	}

	@Override
	public PageInfo<?> selectMyItems(String userId, int page, int size) {
		// TODO Auto-generated method stub
		PageHelper.startPage(page, size);
		List<Item> list = itemMapper.selectMyItems(userId);
		
		if(list == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "user doesn't have item");
		}
		
		return new PageInfo<>(list);
	}

	@Override
	public int addItems(Item item) {
		// TODO Auto-generated method stub
		int cnt = itemMapper.addItems(item);
		
		return cnt;
	}
	
	// 배경 아이템 사용
	@Override
	public int useBackgroundItem(UsingBackgroundItem background) {
		// TODO Auto-generated method stub
		int cnt = itemMapper.useBackgroundItem(background);	
		
		return cnt;
	}
	
	// 프로필 아이템 사용
	@Override
	public int useProfileItem(UsingProfileItem profile) {
		// TODO Auto-generated method stub
		int cnt = itemMapper.useProfileItem(profile);
		
		return cnt;
	}

}
